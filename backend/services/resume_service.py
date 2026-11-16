import io
from schemas import ResumeMetadataResponse


RESUME_FILENAME = "Bachu_Venkata_Sai_Sandeep_Resume.pdf"


def get_resume_metadata() -> ResumeMetadataResponse:
    """Return structured metadata describing the verified resume configuration."""
    return ResumeMetadataResponse(
        candidate_name="Bachu Venkata Sai Sandeep",
        filename=RESUME_FILENAME,
        format="application/pdf",
        download_url="/api/resume/download",
        sections=[
            "Header (Name, Email, Phone, LinkedIn, GitHub)",
            "Education (B.Tech AI & ML SGPA 8.45 & 8.95, Intermediate 92.6%, 10th Standard 87.33%)",
            "Technical Skills (Python, Java, C Programming, Git & GitHub)",
            "Academic Projects (JAIN Smart Campus Navigation)",
            "Achievements & Participation (Smart India Hackathon)",
            "Additional Information (Areas of Interest, Languages Known)",
        ],
        includes_photograph=False,
        includes_location_in_header=False,
        includes_professional_summary=False,
        includes_designation_subtitle=False,
        last_updated="2025-05-01",
    )


def generate_resume_pdf_bytes() -> bytes:
    """
    Generate the clean, single-page academic resume PDF on the Python backend
    matching the exact reference template (Burgundy & Cream palette, no photo,
    no location in header, no professional summary, no designation subtitle).
    """
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.colors import HexColor
    from reportlab.pdfgen import canvas

    buffer = io.BytesIO()
    page_width, page_height = A4
    c = canvas.Canvas(buffer, pagesize=A4)
    c.setTitle("Bachu Venkata Sai Sandeep - Resume")
    c.setAuthor("Bachu Venkata Sai Sandeep")
    c.setSubject("Academic & Technical Resume - B.Tech AI & ML")

    # Palette matching frontend Burgundy & Cream design
    burgundy = HexColor("#642E3B")
    rose_accent = HexColor("#A65D70")
    charcoal = HexColor("#2D2528")
    muted_text = HexColor("#5C5055")

    margin_x = 42.5
    content_width = page_width - (margin_x * 2)
    y = page_height - 44.0

    # Top burgundy accent rule
    c.setStrokeColor(burgundy)
    c.setLineWidth(2.2)
    c.line(margin_x, y, page_width - margin_x, y)
    y -= 24.0

    # Candidate Name (No subtitle/designation, no location)
    c.setFillColor(burgundy)
    c.setFont("Times-Bold", 22)
    c.drawString(margin_x, y, "Bachu Venkata Sai Sandeep")
    y -= 16.0

    # Contact line 1: Email & Phone
    c.setFillColor(charcoal)
    c.setFont("Helvetica", 9.5)
    c.drawString(margin_x, y, "Email: bachusaisandeep@gmail.com   |   Phone: +91 9989906261")
    y -= 13.0

    # Contact line 2: LinkedIn
    c.setFillColor(muted_text)
    c.setFont("Helvetica", 9.0)
    c.drawString(
        margin_x,
        y,
        "LinkedIn: https://www.linkedin.com/in/bachu-venkata-sai-sandeep-26761238a/",
    )
    y -= 12.5

    # Contact line 3: GitHub
    c.drawString(margin_x, y, "GitHub: https://github.com/sandeep-bachu08")
    y -= 10.0

    # Header divider
    c.setStrokeColor(rose_accent)
    c.setLineWidth(0.75)
    c.line(margin_x, y, page_width - margin_x, y)
    y -= 20.0

    def draw_section_header(title: str, current_y: float) -> float:
        c.setFillColor(burgundy)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(margin_x, current_y, title.upper())
        current_y -= 4.5
        c.setStrokeColor(burgundy)
        c.setLineWidth(0.7)
        c.line(margin_x, current_y, page_width - margin_x, current_y)
        return current_y - 14.0

    # 1. EDUCATION
    y = draw_section_header("Education", y)

    # Entry 1: B.Tech
    c.setFillColor(charcoal)
    c.setFont("Helvetica-Bold", 10.0)
    c.drawString(
        margin_x,
        y,
        "B.Tech in Artificial Intelligence and Machine Learning",
    )
    c.setFillColor(burgundy)
    c.setFont("Helvetica-Bold", 9.2)
    c.drawRightString(
        page_width - margin_x,
        y,
        "Second Year – Semester 3 (Pursuing)",
    )
    y -= 13.0

    c.setFillColor(muted_text)
    c.setFont("Helvetica", 9.3)
    c.drawString(margin_x, y, "Jain University, Bangalore")
    y -= 12.5

    c.setFillColor(charcoal)
    c.setFont("Helvetica-Bold", 9.0)
    c.drawString(
        margin_x,
        y,
        "Academic Performance:   Semester 1 SGPA: 8.45   |   Semester 2 SGPA: 8.95",
    )
    y -= 17.0

    # Entry 2: Intermediate
    c.setFillColor(charcoal)
    c.setFont("Helvetica-Bold", 10.0)
    c.drawString(margin_x, y, "Intermediate (Class XII)")
    c.setFillColor(burgundy)
    c.setFont("Helvetica-Bold", 9.2)
    c.drawRightString(page_width - margin_x, y, "Percentage: 92.6%")
    y -= 13.0

    c.setFillColor(muted_text)
    c.setFont("Helvetica", 9.3)
    c.drawString(margin_x, y, "Sri Chaitanya Junior College")
    y -= 17.0

    # Entry 3: 10th Standard
    c.setFillColor(charcoal)
    c.setFont("Helvetica-Bold", 10.0)
    c.drawString(margin_x, y, "10th Standard (Secondary School Certificate)")
    c.setFillColor(burgundy)
    c.setFont("Helvetica-Bold", 9.2)
    c.drawRightString(page_width - margin_x, y, "Percentage: 87.33%")
    y -= 13.0

    c.setFillColor(muted_text)
    c.setFont("Helvetica", 9.3)
    c.drawString(margin_x, y, "Sri Sai Vidyanikethan High School")
    y -= 20.0

    # 2. TECHNICAL SKILLS
    y = draw_section_header("Technical Skills", y)

    skills_rows = [
        ("Primary Language:", "Python (Currently Learning)"),
        ("Other Languages:", "Java (Basic), C Programming (Basic)"),
        ("Tools & Platforms:", "Git & GitHub (Used in Academic Projects)"),
    ]
    for label, val in skills_rows:
        c.setFillColor(charcoal)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(margin_x, y, label)
        c.setFont("Helvetica", 9.5)
        c.drawString(margin_x + 115, y, val)
        y -= 14.0

    y -= 6.0

    # 3. ACADEMIC PROJECTS
    y = draw_section_header("Academic Projects", y)

    c.setFillColor(charcoal)
    c.setFont("Helvetica-Bold", 10.2)
    c.drawString(margin_x, y, "JAIN Smart Campus Navigation")
    c.setFillColor(burgundy)
    c.setFont("Helvetica-Bold", 8.8)
    c.drawRightString(page_width - margin_x, y, "Academic Project")
    y -= 13.5

    project_bullets = [
        "Developed a smart campus navigation project to help students and visitors locate campus blocks, facilities, and routes easily.",
        "Designed an accessible destination lookup directory and interactive route guidance interface for university campus wayfinding.",
        "Managed source code and project documentation using Git and GitHub version control.",
    ]
    c.setFillColor(charcoal)
    c.setFont("Helvetica", 9.2)
    for bullet in project_bullets:
        c.drawString(margin_x + 6, y, f"•  {bullet}")
        y -= 13.0

    c.setFillColor(burgundy)
    c.setFont("Helvetica-Bold", 8.8)
    c.drawString(margin_x + 6, y, "GitHub Repository:")
    c.setFillColor(charcoal)
    c.setFont("Helvetica", 8.8)
    c.drawString(
        margin_x + 96,
        y,
        "https://github.com/sandeep-bachu08/jain-smart-navigation-system",
    )
    y -= 20.0

    # 4. ACHIEVEMENTS & PARTICIPATION
    y = draw_section_header("Achievements & Participation", y)

    c.setFillColor(charcoal)
    c.setFont("Helvetica-Bold", 10.0)
    c.drawString(margin_x, y, "Smart India Hackathon (SIH)")
    y -= 13.5

    sih_bullets = [
        "Participated in Smart India Hackathon, collaborating on structured problem analysis and technical solution design.",
        "Gained practical team experience in requirement breakdown, rapid ideation, and collaborative engineering workflows.",
    ]
    c.setFont("Helvetica", 9.2)
    for bullet in sih_bullets:
        c.drawString(margin_x + 6, y, f"•  {bullet}")
        y -= 13.0

    y -= 7.0

    # 5. ADDITIONAL INFORMATION
    y = draw_section_header("Additional Information", y)

    additional_rows = [
        ("Areas of Interest:", "Python Development, Artificial Intelligence, Machine Learning"),
        ("Languages Known:", "English, Telugu"),
    ]
    for label, val in additional_rows:
        c.setFillColor(charcoal)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(margin_x + 6, y, f"•  {label}")
        c.setFont("Helvetica", 9.5)
        c.drawString(margin_x + 115, y, val)
        y -= 14.0

    # Subtle bottom rule
    c.setStrokeColor(HexColor("#D8C6C0"))
    c.setLineWidth(0.5)
    c.line(margin_x, 36, page_width - margin_x, 36)

    c.showPage()
    c.save()
    buffer.seek(0)
    return buffer.read()
