import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator


EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")


class HealthResponse(BaseModel):
    status: str = "healthy"
    service: str
    version: str
    environment: str
    database: str
    timestamp: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120, description="Sender full name")
    email: str = Field(..., min_length=5, max_length=180, description="Sender email address")
    subject: str = Field(
        default="Portfolio Inquiry",
        min_length=2,
        max_length=200,
        description="Message subject line",
    )
    message: str = Field(
        ...,
        min_length=10,
        max_length=3000,
        description="Detailed inquiry message (10 to 3000 characters)",
    )
    website: Optional[str] = Field(
        default="",
        max_length=200,
        description="Honeypot field for spam protection (must remain empty)",
    )

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        cleaned = " ".join(value.strip().split())
        if len(cleaned) < 2:
            raise ValueError("Name must contain at least 2 non-whitespace characters.")
        return cleaned

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        cleaned = value.strip().lower()
        if not EMAIL_REGEX.match(cleaned):
            raise ValueError("Please provide a valid email address.")
        return cleaned

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, value: str) -> str:
        cleaned = " ".join(value.strip().split())
        return cleaned if cleaned else "Portfolio Inquiry"

    @field_validator("message")
    @classmethod
    def validate_message(cls, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < 10:
            raise ValueError("Message must be at least 10 characters long.")
        if len(cleaned) > 3000:
            raise ValueError("Message must not exceed 3000 characters.")
        return cleaned


class ContactResponse(BaseModel):
    success: bool
    submission_id: Optional[int] = None
    delivery_status: str
    message: str
    timestamp: str


class ProfileResponse(BaseModel):
    name: str
    specialization: str
    institution: str
    currentYear: str
    location: str
    email: str
    phone: str
    githubUrl: str
    githubUsername: str
    linkedinUrl: str
    linkedinHandle: str
    aboutParagraphs: list[str]
    careerObjective: str
    languagesKnown: list[str]


class SkillItemSchema(BaseModel):
    name: str
    status: str
    category: str
    description: str


class ToolItemSchema(BaseModel):
    name: str
    usage: str
    description: str


class InterestItemSchema(BaseModel):
    title: str
    description: str


class SkillsResponse(BaseModel):
    programmingSkills: list[SkillItemSchema]
    toolsAndPlatforms: list[ToolItemSchema]
    areasOfInterest: list[InterestItemSchema]
    languagesKnown: list[str]


class SemesterResultSchema(BaseModel):
    semester: str
    sgpa: str


class EducationItemSchema(BaseModel):
    id: str
    degree: str
    specialization: Optional[str] = None
    institution: str
    location: Optional[str] = None
    status: str
    scoreLabel: Optional[str] = None
    scoreValue: Optional[str] = None
    semesterResults: Optional[list[SemesterResultSchema]] = None
    highlights: list[str]


class ProjectItemSchema(BaseModel):
    id: str
    slug: str
    title: str
    category: str
    shortDescription: str
    overview: str
    problemStatement: str
    purpose: str
    keyFeatures: list[str]
    technologies: list[str]
    githubUrl: str
    liveUrl: str
    featured: bool


class AchievementItemSchema(BaseModel):
    id: str
    title: str
    category: str
    organization: str
    description: str
    keyTakeaways: list[str]


class ResumeMetadataResponse(BaseModel):
    candidate_name: str
    filename: str
    format: str
    download_url: str
    sections: list[str]
    includes_photograph: bool
    includes_location_in_header: bool
    includes_professional_summary: bool
    includes_designation_subtitle: bool
    last_updated: str
