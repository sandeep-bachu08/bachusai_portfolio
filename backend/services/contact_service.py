from collections import defaultdict
from datetime import datetime, timezone
from email.message import EmailMessage
import hashlib
import smtplib
import time
from typing import Optional
from sqlalchemy.orm import Session

from config import settings
from database import ContactSubmission
from schemas import ContactRequest, ContactResponse


# In-memory sliding-window rate limiter keyed by client fingerprint
_rate_limit_buckets: dict[str, list[float]] = defaultdict(list)


def compute_client_fingerprint(ip_address: str, user_agent: str) -> str:
    raw = f"{ip_address or 'unknown'}::{user_agent or 'unknown'}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:32]


def check_rate_limit(fingerprint: str) -> bool:
    """Returns True if allowed, False if rate limit exceeded."""
    now = time.time()
    window_start = now - settings.RATE_LIMIT_WINDOW_SECONDS
    bucket = _rate_limit_buckets[fingerprint]
    # Prune expired timestamps
    _rate_limit_buckets[fingerprint] = [ts for ts in bucket if ts > window_start]
    if len(_rate_limit_buckets[fingerprint]) >= settings.RATE_LIMIT_MAX_REQUESTS:
        return False
    _rate_limit_buckets[fingerprint].append(now)
    return True


def _try_send_smtp_email(payload: ContactRequest, submission_id: int) -> bool:
    """Optionally send email via SMTP if SMTP credentials are configured."""
    if not (settings.SMTP_HOST and settings.SMTP_USER and settings.SMTP_PASSWORD):
        return False

    try:
        msg = EmailMessage()
        msg["Subject"] = f"[Portfolio Contact #{submission_id}] {payload.subject}"
        msg["From"] = settings.SMTP_USER
        msg["To"] = settings.CONTACT_RECIPIENT_EMAIL
        msg["Reply-To"] = payload.email
        msg.set_content(
            f"New Portfolio Inquiry Received\n"
            f"==============================\n"
            f"Submission ID: #{submission_id}\n"
            f"Name: {payload.name}\n"
            f"Email: {payload.email}\n"
            f"Subject: {payload.subject}\n\n"
            f"Message:\n{payload.message}\n"
        )

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=8) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
        return True
    except Exception:
        return False


def process_contact_submission(
    db: Session,
    payload: ContactRequest,
    client_ip: Optional[str] = None,
    user_agent: Optional[str] = None,
) -> tuple[int, ContactResponse]:
    """
    Validate, rate-limit, persist contact submission to SQLite/Postgres via SQLAlchemy,
    and optionally forward via SMTP when configured.
    Returns (http_status_code, ContactResponse).
    """
    now_iso = datetime.now(timezone.utc).isoformat()

    # 1. Honeypot spam protection check
    if payload.website and payload.website.strip():
        return (
            400,
            ContactResponse(
                success=False,
                submission_id=None,
                delivery_status="rejected_spam",
                message="Automated spam submission detected.",
                timestamp=now_iso,
            ),
        )

    # 2. Rate limit check
    fingerprint = compute_client_fingerprint(client_ip or "127.0.0.1", user_agent or "")
    if not check_rate_limit(fingerprint):
        return (
            429,
            ContactResponse(
                success=False,
                submission_id=None,
                delivery_status="rate_limited",
                message="Too many contact requests submitted recently. Please wait a minute and try again.",
                timestamp=now_iso,
            ),
        )

    # 3. Persist to database
    record = ContactSubmission(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        client_fingerprint=fingerprint,
        delivery_status="stored",
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    # 4. Attempt optional SMTP delivery if configured
    email_sent = _try_send_smtp_email(payload, record.id)
    if email_sent:
        record.delivery_status = "stored_and_emailed"
        db.commit()
        db.refresh(record)

    status_label = "stored_and_emailed" if email_sent else "stored"
    response_msg = (
        f"Thank you, {payload.name}. Your message has been securely recorded "
        f"(Reference #{record.id})."
    )

    return (
        201,
        ContactResponse(
            success=True,
            submission_id=record.id,
            delivery_status=status_label,
            message=response_msg,
            timestamp=record.created_at.isoformat() if record.created_at else now_iso,
        ),
    )
