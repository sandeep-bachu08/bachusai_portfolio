"""
Configuration module for the FastAPI backend (Vercel Project Root: backend/).

DATABASE NOTE FOR VERCEL DEPLOYMENT:
This backend uses a self-contained SQLite database with zero external database dependencies
(no Supabase, Neon, PostgreSQL, or third-party database hosting).
When deployed on Vercel's serverless Python runtime, SQLite writes to the writable `/tmp`
directory (`/tmp/sandeep_portfolio.db`). Because Vercel serverless functions use ephemeral
storage, SQLite data stored in `/tmp` is temporary and is not guaranteed to persist across
cold starts or separate function instances.
"""

import os
import tempfile
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    def load_dotenv(dotenv_path=None):  # type: ignore
        if dotenv_path and Path(dotenv_path).exists():
            for line in Path(dotenv_path).read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip('"').strip("'")
                if k and k not in os.environ:
                    os.environ[k] = v

BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent

# Load .env from backend/ or repository root if present in local development
load_dotenv(BACKEND_DIR / ".env")
load_dotenv(PROJECT_ROOT / ".env")


def _resolve_sqlite_url() -> str:
    """
    Resolve a writable SQLite database URL.
    - On Vercel or any read-only filesystem, uses `/tmp/sandeep_portfolio.db`
      (temporary/ephemeral serverless storage).
    - In local development, uses `backend/portfolio.db`.
    """
    if os.getenv("VERCEL") or not os.access(BACKEND_DIR, os.W_OK):
        tmp_db = Path(tempfile.gettempdir()) / "sandeep_portfolio.db"
        return f"sqlite:///{tmp_db}"

    local_db = BACKEND_DIR / "portfolio.db"
    return f"sqlite:///{local_db}"


class Settings:
    APP_NAME: str = "Bachu Venkata Sai Sandeep — Portfolio API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "production" if os.getenv("VERCEL") else os.getenv("ENVIRONMENT", "development")
    DATABASE_URL: str = _resolve_sqlite_url()
    SMTP_HOST: str = os.getenv("SMTP_HOST", "").strip()
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "").strip()
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "").strip()
    CONTACT_RECIPIENT_EMAIL: str = os.getenv(
        "CONTACT_RECIPIENT_EMAIL", "bachusaisandeep@gmail.com"
    ).strip()
    RATE_LIMIT_MAX_REQUESTS: int = int(os.getenv("RATE_LIMIT_MAX_REQUESTS", "10"))
    RATE_LIMIT_WINDOW_SECONDS: int = int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "60"))

    @property
    def allowed_origins(self) -> list[str]:
        raw = os.getenv("ALLOWED_ORIGINS", "*").strip()
        if raw == "*":
            return ["*"]
        return [origin.strip() for origin in raw.split(",") if origin.strip()]


settings = Settings()
