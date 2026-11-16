from contextlib import asynccontextmanager
from datetime import datetime, timezone
import io
from pathlib import Path
import sys
from fastapi import APIRouter, Depends, FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from sqlalchemy import text
from sqlalchemy.orm import Session

# Ensure backend/ directory is on sys.path whether invoked from backend/ or repository root
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from config import settings  # noqa: E402
from database import get_db, init_db  # noqa: E402
from schemas import (  # noqa: E402
    AchievementItemSchema,
    ContactRequest,
    ContactResponse,
    EducationItemSchema,
    HealthResponse,
    ProfileResponse,
    ProjectItemSchema,
    ResumeMetadataResponse,
    SkillsResponse,
)
from services.contact_service import process_contact_submission  # noqa: E402
from services.portfolio_service import (  # noqa: E402
    get_achievements_data,
    get_education_data,
    get_profile_data,
    get_projects_data,
    get_skills_data,
)
from services.resume_service import (  # noqa: E402
    RESUME_FILENAME,
    generate_resume_pdf_bytes,
    get_resume_metadata,
)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Python FastAPI backend for Bachu Venkata Sai Sandeep's portfolio website. "
        "Directly deployable on Vercel's native Python runtime (Root Directory: backend/). "
        "Note: SQLite storage on Vercel uses /tmp and is temporary across serverless cold starts."
    ),
    lifespan=lifespan,
)

# Ensure SQLite tables exist in serverless environments where lifespan may not run on every invocation
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

router = APIRouter()


@app.get("/", tags=["System"])
def root_status() -> dict[str, str]:
    """Root status endpoint for Vercel FastAPI deployment verification."""
    return {
        "status": "online",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": "/api/health",
    }


@router.get("/health", response_model=HealthResponse, tags=["System"])
def health_check(db: Session = Depends(get_db)) -> HealthResponse:
    """Return structured JSON indicating backend availability and SQLite connectivity."""
    db_status = "connected"
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        db_status = "degraded"

    return HealthResponse(
        status="healthy",
        service=settings.APP_NAME,
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT,
        database=db_status,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )


@router.get("/profile", response_model=ProfileResponse, tags=["Portfolio Data"])
def read_profile() -> ProfileResponse:
    """Return verified candidate profile and contact details."""
    return ProfileResponse(**get_profile_data())


@router.get("/skills", response_model=SkillsResponse, tags=["Portfolio Data"])
def read_skills() -> SkillsResponse:
    """Return verified programming skills, tools, areas of interest, and spoken languages."""
    return SkillsResponse(**get_skills_data())


@router.get("/projects", response_model=list[ProjectItemSchema], tags=["Portfolio Data"])
def read_projects() -> list[ProjectItemSchema]:
    """Return verified academic projects."""
    return [ProjectItemSchema(**item) for item in get_projects_data()]


@router.get("/education", response_model=list[EducationItemSchema], tags=["Portfolio Data"])
def read_education() -> list[EducationItemSchema]:
    """Return verified education timeline and semester SGPA records."""
    return [EducationItemSchema(**item) for item in get_education_data()]


@router.get("/achievements", response_model=list[AchievementItemSchema], tags=["Portfolio Data"])
def read_achievements() -> list[AchievementItemSchema]:
    """Return verified achievements and hackathon participation."""
    return [AchievementItemSchema(**item) for item in get_achievements_data()]


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=201,
    tags=["Contact"],
)
def create_contact_submission(
    payload: ContactRequest,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
) -> ContactResponse:
    """
    Validate and store contact form submissions in SQLite via SQLAlchemy,
    with rate-limiting, spam honeypot validation, and optional SMTP notification.
    """
    client_ip = request.client.host if request.client else "127.0.0.1"
    user_agent = request.headers.get("user-agent", "")
    status_code, result = process_contact_submission(
        db=db,
        payload=payload,
        client_ip=client_ip,
        user_agent=user_agent,
    )
    response.status_code = status_code
    return result


@router.get("/resume", response_model=ResumeMetadataResponse, tags=["Resume"])
def read_resume_info(request: Request):
    """
    Return resume metadata JSON by default, or stream the generated PDF directly
    if `?download=true` or `format=pdf` is passed.
    """
    download_param = request.query_params.get("download", "").lower()
    format_param = request.query_params.get("format", "").lower()
    if download_param in ("1", "true", "yes") or format_param == "pdf":
        pdf_bytes = generate_resume_pdf_bytes()
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{RESUME_FILENAME}"',
                "Cache-Control": "no-store",
            },
        )
    return get_resume_metadata()


@router.get("/resume/download", tags=["Resume"])
def download_resume_pdf() -> StreamingResponse:
    """Generate and stream the verified single-page PDF resume from the Python backend."""
    pdf_bytes = generate_resume_pdf_bytes()
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{RESUME_FILENAME}"',
            "Cache-Control": "no-store",
        },
    )


# Mount all routes under /api (primary) and also at root / for direct Vercel backend calls
app.include_router(router, prefix="/api")
app.include_router(router, include_in_schema=False)


@app.exception_handler(Exception)
async def global_exception_handler(_request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error occurred while processing request.",
            "detail": str(exc),
        },
    )
