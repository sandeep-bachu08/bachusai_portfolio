"""
SQLite + SQLAlchemy database module for the FastAPI backend.

Note: On Vercel serverless execution, the SQLite database file is created in `/tmp`.
Data written to `/tmp` on Vercel is temporary and not guaranteed to persist across
serverless function restarts or cold starts.
"""

from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from config import settings

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False},
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(120), nullable=False)
    email = Column(String(180), nullable=False, index=True)
    subject = Column(String(200), nullable=False, default="Portfolio Inquiry")
    message = Column(Text, nullable=False)
    client_fingerprint = Column(String(64), nullable=True, index=True)
    delivery_status = Column(String(40), nullable=False, default="stored")
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )


def init_db() -> None:
    """Create SQLite tables if they do not exist."""
    Base.metadata.create_all(bind=engine)


def get_db():
    """FastAPI dependency yielding a SQLAlchemy database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
