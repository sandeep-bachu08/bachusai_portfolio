from typing import Any


PROFILE_DATA: dict[str, Any] = {
    "name": "Bachu Venkata Sai Sandeep",
    "specialization": "B.Tech in Artificial Intelligence & Machine Learning",
    "institution": "Jain University, Bangalore",
    "currentYear": "Second Year – Semester 3",
    "location": "Badvel, Kadapa District, Andhra Pradesh, India – 516227",
    "email": "bachusaisandeep@gmail.com",
    "phone": "+91 9989906261",
    "githubUrl": "https://github.com/sandeep-bachu08",
    "githubUsername": "sandeep-bachu08",
    "linkedinUrl": "https://www.linkedin.com/in/bachu-venkata-sai-sandeep-26761238a/",
    "linkedinHandle": "bachu-venkata-sai-sandeep-26761238a",
    "aboutParagraphs": [
        "I am Bachu Venkata Sai Sandeep, an undergraduate B.Tech student specializing in Artificial Intelligence and Machine Learning at Jain University, Bangalore. Currently in my second year (Semester 3), I am dedicated to building a rigorous foundation in software engineering and computational problem-solving.",
        "My primary technical focus is developing strong proficiency in Python programming while reinforcing core programming concepts through Java and C. I enjoy translating theoretical concepts into structured, practical applications that address real-world usability challenges.",
        "Through academic project work such as the JAIN Smart Campus Navigation system and participation in national initiatives like the Smart India Hackathon, I actively cultivate collaborative engineering practices, version control workflows with Git and GitHub, and clean software design.",
    ],
    "careerObjective": "Seeking software engineering and AI/ML internship opportunities where I can contribute structured Python development skills, disciplined problem-solving, and a strong commitment to continuous technical growth.",
    "languagesKnown": ["English", "Telugu"],
}

SKILLS_DATA: dict[str, Any] = {
    "programmingSkills": [
        {
            "name": "Python",
            "status": "Currently Learning",
            "category": "Primary Programming Language",
            "description": "Focusing on core language fundamentals, data structures, modular scripting, FastAPI backend services, and algorithmic problem solving for AI & ML applications.",
        },
        {
            "name": "Java",
            "status": "Basic",
            "category": "Programming Language",
            "description": "Foundational understanding of object-oriented programming principles, class design, and standard syntax.",
        },
        {
            "name": "C Programming",
            "status": "Basic",
            "category": "Programming Language",
            "description": "Understanding of procedural programming, control structures, memory fundamentals, and structured logic.",
        },
    ],
    "toolsAndPlatforms": [
        {
            "name": "Git & GitHub",
            "usage": "Used in Academic Projects",
            "description": "Repository management, source code version control, project documentation, and collaborative code hosting.",
        }
    ],
    "areasOfInterest": [
        {
            "title": "Python Development",
            "description": "Writing clean, maintainable Python code, backend APIs, and automation scripts while expanding into software development workflows.",
        },
        {
            "title": "Artificial Intelligence",
            "description": "Exploring intelligent search, decision systems, and foundational AI concepts through academic coursework.",
        },
        {
            "title": "Machine Learning",
            "description": "Studying data-driven modeling, foundational algorithms, and mathematical principles underlying modern ML systems.",
        },
    ],
    "languagesKnown": ["English", "Telugu"],
}

EDUCATION_DATA: list[dict[str, Any]] = [
    {
        "id": "btech-aiml",
        "degree": "Bachelor of Technology (B.Tech)",
        "specialization": "Artificial Intelligence and Machine Learning",
        "institution": "Jain University",
        "location": "Bangalore, Karnataka",
        "status": "Second Year – Semester 3 (Currently Pursuing)",
        "semesterResults": [
            {"semester": "Semester 1 SGPA", "sgpa": "8.45"},
            {"semester": "Semester 2 SGPA", "sgpa": "8.95"},
        ],
        "highlights": [
            "Specializing in Artificial Intelligence and Machine Learning curriculum",
            "Consistent academic performance across Semester 1 (8.45 SGPA) and Semester 2 (8.95 SGPA)",
            "Active involvement in technical projects and national-level hackathon problem solving",
        ],
    },
    {
        "id": "intermediate",
        "degree": "Intermediate Education (Class XII)",
        "institution": "Sri Chaitanya Junior College",
        "status": "Completed",
        "scoreLabel": "Percentage",
        "scoreValue": "92.6%",
        "highlights": [
            "Achieved 92.6% aggregate score with strong foundation in Mathematics and Analytical Sciences"
        ],
    },
    {
        "id": "high-school",
        "degree": "10th Standard (Secondary School Certificate)",
        "institution": "Sri Sai Vidyanikethan High School",
        "status": "Completed",
        "scoreLabel": "Percentage",
        "scoreValue": "87.33%",
        "highlights": [
            "Completed secondary education with 87.33% aggregate score"
        ],
    },
]

PROJECTS_DATA: list[dict[str, Any]] = [
    {
        "id": "jain-smart-navigation",
        "slug": "jain-smart-navigation",
        "title": "JAIN Smart Campus Navigation",
        "category": "Academic Software Project",
        "shortDescription": "A smart campus navigation project designed to help students and visitors locate campus blocks, academic facilities, and walking routes easily.",
        "overview": "JAIN Smart Campus Navigation is a digital campus wayfinding application developed to simplify navigation across Jain University. New students, visiting faculty, and guests often face difficulty locating specific academic blocks, laboratories, administrative offices, and campus amenities. This project provides a structured, interactive interface to search destinations and visualize clear campus routes.",
        "problemStatement": "Large university campuses contain multiple interconnected academic blocks, specialized labs, seminar halls, and administrative zones. First-year students, parents, and event visitors frequently lose time navigating unfamiliar pathways without a centralized digital directory.",
        "purpose": "To design and implement an intuitive, responsive campus navigation system that centralizes building information, streamlines destination discovery, and improves the everyday movement experience across the university campus.",
        "keyFeatures": [
            "Interactive destination directory covering academic blocks, labs, and key campus landmarks",
            "Clear route guidance and spatial orientation for students and first-time visitors",
            "Searchable campus location lookup with structured facility categorization",
            "Clean, responsive user interface accessible across mobile devices and desktop browsers",
        ],
        "technologies": [
            "Web Application Architecture",
            "Interactive UI Design",
            "Campus Wayfinding Logic",
            "Git & GitHub Version Control",
        ],
        "githubUrl": "https://github.com/sandeep-bachu08/jain-smart-navigation-system",
        "liveUrl": "https://jain-university-smart-campus-digita.vercel.app/",
        "featured": True,
    }
]

ACHIEVEMENTS_DATA: list[dict[str, Any]] = [
    {
        "id": "smart-india-hackathon",
        "title": "Smart India Hackathon (SIH)",
        "category": "National Level Hackathon Participation",
        "organization": "Smart India Hackathon",
        "description": "Participated in Smart India Hackathon, engaging in structured problem analysis, solution ideation, and collaborative technical development under real-world constraints.",
        "keyTakeaways": [
            "Collaborated in a team environment to analyze practical problem statements and design structured technical solutions",
            "Practiced rapid prototyping, requirement breakdown, and presentation of engineering concepts",
            "Strengthened practical teamwork, technical communication, and deadline-driven execution skills",
        ],
    }
]


def get_profile_data() -> dict[str, Any]:
    return PROFILE_DATA


def get_skills_data() -> dict[str, Any]:
    return SKILLS_DATA


def get_education_data() -> list[dict[str, Any]]:
    return EDUCATION_DATA


def get_projects_data() -> list[dict[str, Any]]:
    return PROJECTS_DATA


def get_achievements_data() -> list[dict[str, Any]]:
    return ACHIEVEMENTS_DATA
