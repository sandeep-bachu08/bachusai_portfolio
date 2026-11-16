import { jsPDF } from 'jspdf';
import {
  PERSONAL_INFO,
  PROGRAMMING_LANGUAGES,
  CONFIRMED_TOOLS,
  AREAS_OF_INTEREST,
  ACHIEVEMENTS_LIST,
  LANGUAGES,
  INITIAL_PROJECTS,
  ProjectItem,
  SkillItem,
} from '../data/portfolioData';

export async function generateAndDownloadResumePDF(options?: {
  projects?: ProjectItem[];
  confirmedTools?: SkillItem[];
}): Promise<void> {
  const projects = options?.projects || INITIAL_PROJECTS;
  const tools = options?.confirmedTools || CONFIRMED_TOOLS;

  // A4 portrait: 210mm x 297mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Brand Palette RGB values (Burgundy & Cream)
  const creamBg: [number, number, number] = [250, 247, 242]; // #FAF7F2
  const burgundy: [number, number, number] = [100, 46, 59]; // #642E3B
  const mutedRose: [number, number, number] = [166, 93, 112]; // #A65D70
  const mainText: [number, number, number] = [64, 54, 58]; // #40363A
  const dividerColor: [number, number, number] = [214, 195, 189];

  const marginLeft = 18;
  const marginRight = 192;
  const contentWidth = marginRight - marginLeft; // 174mm

  const paintPageBackground = () => {
    doc.setFillColor(...creamBg);
    doc.rect(0, 0, 210, 297, 'F');
    // Subtle top burgundy bar
    doc.setFillColor(...burgundy);
    doc.rect(0, 0, 210, 3, 'F');
  };

  paintPageBackground();

  let y = 16;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > 280) {
      doc.addPage();
      paintPageBackground();
      y = 18;
    }
  };

  // ==================================================
  // HEADER (No location, no photograph, no designation, no summary)
  // ==================================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...burgundy);
  doc.text('Bachu Venkata Sai Sandeep', marginLeft, y);
  y += 6.5;

  // Contact: Email & Phone
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...mainText);
  const emailLabel = `Email: ${PERSONAL_INFO.email}`;
  const phoneLabel = `Phone: ${PERSONAL_INFO.phone}`;
  doc.text(`${emailLabel}   |   ${phoneLabel}`, marginLeft, y);
  doc.link(marginLeft + 11, y - 3.5, 48, 4.5, { url: `mailto:${PERSONAL_INFO.email}` });
  y += 5;

  // LinkedIn (Full URL, clickable)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...burgundy);
  doc.text('LinkedIn:', marginLeft, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mainText);
  doc.text(PERSONAL_INFO.linkedIn, marginLeft + 16.5, y);
  doc.link(marginLeft + 16.5, y - 3.5, 115, 4.5, { url: PERSONAL_INFO.linkedIn });
  y += 4.8;

  // GitHub (Full URL, clickable)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...burgundy);
  doc.text('GitHub:', marginLeft, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mainText);
  doc.text(PERSONAL_INFO.github, marginLeft + 16.5, y);
  doc.link(marginLeft + 16.5, y - 3.5, 75, 4.5, { url: PERSONAL_INFO.github });
  y += 4.5;

  // Header bottom divider
  doc.setDrawColor(...burgundy);
  doc.setLineWidth(0.45);
  doc.line(marginLeft, y, marginRight, y);
  y += 7.5;

  // Helper function for section headings
  const drawSectionHeader = (title: string) => {
    ensureSpace(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...burgundy);
    doc.text(title.toUpperCase(), marginLeft, y);
    y += 2;
    doc.setDrawColor(...mutedRose);
    doc.setLineWidth(0.35);
    doc.line(marginLeft, y, marginRight, y);
    y += 5.5;
  };

  // ==================================================
  // 1. EDUCATION SECTION (Multi-line, no addresses, zero overlap)
  // ==================================================
  drawSectionHeader('Education');

  // Qualification 1: Bachelor of Technology (B.Tech)
  ensureSpace(36);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...burgundy);
  doc.text('1. Bachelor of Technology (B.Tech)', marginLeft, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(...mainText);
  doc.text('Specialization:', marginLeft + 4, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Artificial Intelligence and Machine Learning', marginLeft + 31, y);
  y += 4.8;

  doc.setFont('helvetica', 'bold');
  doc.text('Institution:', marginLeft + 4, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Jain University', marginLeft + 31, y);
  y += 4.8;

  doc.setFont('helvetica', 'bold');
  doc.text('Academic Status:', marginLeft + 4, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Second Year – Semester 3', marginLeft + 34, y);
  y += 5.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(...burgundy);
  doc.text('Academic Performance (Semester-wise SGPA):', marginLeft + 4, y);
  y += 4.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...mainText);
  doc.text('•  Semester 1: 8.45', marginLeft + 8, y);
  y += 4.5;
  doc.text('•  Semester 2: 8.95', marginLeft + 8, y);
  y += 6.5;

  // Qualification 2: Intermediate
  ensureSpace(18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...burgundy);
  doc.text('2. Intermediate', marginLeft, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(...mainText);
  doc.text('Institution:', marginLeft + 4, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Sri Chaitanya Junior College', marginLeft + 26, y);
  y += 4.8;

  doc.setFont('helvetica', 'bold');
  doc.text('Percentage:', marginLeft + 4, y);
  doc.setFont('helvetica', 'normal');
  doc.text('92.6%', marginLeft + 26, y);
  y += 6.5;

  // Qualification 3: 10th Standard
  ensureSpace(18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...burgundy);
  doc.text('3. 10th Standard', marginLeft, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(...mainText);
  doc.text('Institution:', marginLeft + 4, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Sri Sai Vidyanikethan High School', marginLeft + 26, y);
  y += 4.8;

  doc.setFont('helvetica', 'bold');
  doc.text('Percentage:', marginLeft + 4, y);
  doc.setFont('helvetica', 'normal');
  doc.text('87.33%', marginLeft + 26, y);
  y += 7.5;

  // ==================================================
  // 2. TECHNICAL SKILLS & AREAS OF INTEREST
  // ==================================================
  drawSectionHeader('Technical Skills & Areas of Interest');

  // Programming Languages
  ensureSpace(34);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...burgundy);
  doc.text('Programming Languages:', marginLeft, y);
  y += 4.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...mainText);
  PROGRAMMING_LANGUAGES.forEach((lang) => {
    doc.text(`•  ${lang.name} (${lang.level})`, marginLeft + 4, y);
    y += 4.5;
  });
  y += 1.5;

  // Technologies & Tools
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...burgundy);
  doc.text('Technologies & Tools:', marginLeft, y);
  y += 4.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...mainText);
  tools.forEach((tool) => {
    doc.text(`•  ${tool.name} (${tool.level})`, marginLeft + 4, y);
    y += 4.5;
  });
  y += 1.5;

  // Areas of Interest
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...burgundy);
  doc.text('Areas of Interest:', marginLeft, y);
  y += 4.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...mainText);
  AREAS_OF_INTEREST.forEach((area) => {
    doc.text(`•  ${area}`, marginLeft + 4, y);
    y += 4.5;
  });
  y += 3;

  // ==================================================
  // 3. ACADEMIC PROJECTS
  // ==================================================
  drawSectionHeader('Academic Projects');

  projects.slice(0, 1).forEach((project) => {
    ensureSpace(32);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...burgundy);
    doc.text(project.title, marginLeft, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.2);
    doc.setTextColor(...mainText);
    const projectDesc =
      'An academic project focused on helping users navigate the university campus through a digital navigation system.';
    const descLines = doc.splitTextToSize(projectDesc, contentWidth - 4);
    doc.text(descLines, marginLeft + 4, y);
    y += descLines.length * 4.5 + 1;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...burgundy);
    doc.text('Verified Technologies:', marginLeft + 4, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mainText);
    doc.text(project.technologies.join(', '), marginLeft + 41, y);
    y += 4.8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...burgundy);
    doc.text('GitHub Repository:', marginLeft + 4, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mainText);
    doc.text(project.githubUrl, marginLeft + 36, y);
    doc.link(marginLeft + 36, y - 3.5, 115, 4.5, { url: project.githubUrl });
    y += 7;
  });

  // ==================================================
  // 4. ACHIEVEMENTS & EXTRACURRICULAR PARTICIPATION
  // ==================================================
  drawSectionHeader('Achievements & Extracurricular Participation');

  ACHIEVEMENTS_LIST.forEach((ach) => {
    ensureSpace(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...burgundy);
    doc.text(`${ach.title}:`, marginLeft, y);
    y += 4.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.2);
    doc.setTextColor(...mainText);
    doc.text(`•  ${ach.description}`, marginLeft + 4, y);
    y += 6.5;
  });

  // ==================================================
  // 5. LANGUAGES
  // ==================================================
  drawSectionHeader('Languages');

  ensureSpace(14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...mainText);
  LANGUAGES.forEach((lang) => {
    doc.text(`•  ${lang}`, marginLeft + 4, y);
    y += 4.5;
  });

  // Subtle bottom rule
  doc.setDrawColor(...dividerColor);
  doc.setLineWidth(0.3);
  doc.line(marginLeft, 286, marginRight, 286);

  doc.save('Bachu_Venkata_Sai_Sandeep_Resume.pdf');
}
