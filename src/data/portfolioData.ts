export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  problemStatement?: string;
  objectives?: string[];
  verifiedHighlights: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  academicContext: string;
  confirmedContribution?: string;
}

export interface SkillItem {
  name: string;
  level: string;
  note?: string;
}

export interface SemesterResult {
  semester: string;
  sgpa: string;
}

export interface EducationItem {
  id: string;
  qualification: string;
  specialization?: string;
  institution: string;
  location: string;
  statusOrScoreLabel: string;
  statusOrScoreValue: string;
  semesterResults?: SemesterResult[];
}

export const ORIGINAL_PROFILE_PHOTO = '/assets/aistudio/file_00000000c1e4821194168a07dd49ac2d_551cc027.png';

export const PERSONAL_INFO = {
  fullName: 'Bachu Venkata Sai Sandeep',
  initials: 'SS',
  professionalTitle: 'Aspiring Python Developer',
  email: 'bachusaisandeep@gmail.com',
  phone: '+91 9989906261',
  location: 'Badvel, Kadapa District, Andhra Pradesh, India – 516227',
  linkedIn: 'https://www.linkedin.com/in/bachu-venkata-sai-sandeep-26761238a/',
  linkedInLabel: 'linkedin.com/in/bachu-venkata-sai-sandeep-26761238a',
  github: 'https://github.com/sandeep-bachu08',
  githubLabel: 'github.com/sandeep-bachu08',
  heroGreeting: "HELLO, I'M",
  heroIntroduction:
    "I'm a B.Tech student specializing in Artificial Intelligence and Machine Learning at Jain University, Bangalore. I enjoy learning programming, exploring technology and building practical projects that solve real-world problems.",
  aboutParagraphs: [
    'I am currently pursuing my Bachelor of Technology in Artificial Intelligence and Machine Learning at Jain University, Bangalore.',
    'I am interested in Python development, artificial intelligence and machine learning. I am continuously improving my programming fundamentals and exploring practical software development through academic projects.',
    'My goal is to strengthen my technical knowledge, build meaningful projects and grow into a skilled software developer.',
  ],
  profileDetails: [
    { label: 'Name', value: 'Bachu Venkata Sai Sandeep' },
    { label: 'Degree', value: 'B.Tech – AIML' },
    { label: 'Institution', value: 'Jain University, Bangalore' },
    { label: 'Current Academic Status', value: 'Second Year, Semester 3' },
    { label: 'Career Interest', value: 'Python Development' },
  ],
  experienceStatement:
    'Fresher – Currently building programming fundamentals and developing practical skills through academic and personal projects.',
};

export const PROGRAMMING_LANGUAGES: SkillItem[] = [
  {
    name: 'Python',
    level: 'Currently Learning',
    note: 'Primary focus for programming fundamentals, scripting, data structures, and algorithmic problem-solving.',
  },
  {
    name: 'Java',
    level: 'Basic',
    note: 'Foundational object-oriented programming concepts, classes, inheritance, and core syntax.',
  },
  {
    name: 'C Programming',
    level: 'Basic',
    note: 'Structured programming fundamentals, procedural logic, control structures, and memory basics.',
  },
];

export const CONFIRMED_TOOLS: SkillItem[] = [
  {
    name: 'Git & GitHub',
    level: 'Used in Academic Projects',
    note: 'Version control, repository management, and code hosting under GitHub profile sandeep-bachu08.',
  },
];

export const AREAS_OF_INTEREST: string[] = [
  'Python Development',
  'Artificial Intelligence',
  'Machine Learning',
];

export const LANGUAGES: string[] = ['English', 'Telugu'];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'jain-smart-navigation',
    title: 'JAIN Smart Campus Navigation',
    subtitle: 'Campus Navigator & Digital Twin for Jain University School of Engineering and Technology',
    description:
      'JAIN Smart Campus Navigation is an academic project focused on helping users navigate the university campus through a digital navigation system.',
    problemStatement:
      'Navigating a large university engineering campus, identifying available classrooms, locating laboratories, and checking vacant class periods can be difficult and time-consuming for students, visitors, and faculty.',
    objectives: [
      'Provide an interactive digital navigation system for the Jain University School of Engineering and Technology (SET) campus.',
      'Deliver real-time classroom and laboratory status exploration across campus buildings and floor levels.',
      'Enable intuitive, multilingual natural-language queries (supporting English, Telugu, and Hindi) for free classes and room availability.',
      'Implement structured architectural data mapping for campus emergency exits, buildings, and facilities.',
    ],
    verifiedHighlights: [
      'Interactive digital campus map visualization and location lookup built for Jain University SET.',
      'Multilingual natural language assistant supporting English, Telugu, and Hindi queries for free classes, available labs, and room schedules.',
      'Digital Twin campus endpoints delivering structured building layouts, floor maps, and emergency guidance.',
      'Live deployment verified on Vercel and repository hosted publicly on GitHub.',
    ],
    technologies: [
      'TypeScript',
      'React',
      'Node.js & Express',
      'Leaflet Maps',
      'Three.js',
      'Tailwind CSS',
      'Lucide React',
      'Motion',
    ],
    githubUrl: 'https://github.com/sandeep-bachu08/jain-smart-navigation-system',
    liveUrl: 'https://jain-university-smart-campus-digita.vercel.app/',
    imageUrl: '/src/assets/images/jain_campus_navigation_showcase_1794405978900.jpg',
    academicContext: 'Academic Project · Jain University',
    confirmedContribution:
      'Project developer and repository owner (sandeep-bachu08), responsible for application architecture, campus data structures, and natural language query routing.',
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    id: 'btech-aiml',
    qualification: 'Bachelor of Technology (B.Tech)',
    specialization: 'Artificial Intelligence and Machine Learning',
    institution: 'Jain University, Bangalore',
    location: 'Bangalore, Karnataka, India',
    statusOrScoreLabel: 'Academic Status',
    statusOrScoreValue: 'Second Year – Semester 3',
    semesterResults: [
      { semester: 'Semester 1', sgpa: '8.45' },
      { semester: 'Semester 2', sgpa: '8.95' },
    ],
  },
  {
    id: 'intermediate',
    qualification: 'Intermediate',
    institution: 'Sri Chaitanya Junior College',
    location: 'Vijayawada, Andhra Pradesh, India',
    statusOrScoreLabel: 'Percentage',
    statusOrScoreValue: '92.6%',
  },
  {
    id: 'tenth-standard',
    qualification: '10th Standard',
    institution: 'Sri Sai Vidyanikethan High School',
    location: 'Badvel, Kadapa District, Andhra Pradesh, India – 516227',
    statusOrScoreLabel: 'Percentage',
    statusOrScoreValue: '87.33%',
  },
];

export const ACHIEVEMENTS_LIST = [
  {
    id: 'sih-participation',
    title: 'Smart India Hackathon (SIH)',
    description: 'Participated in Smart India Hackathon.',
    category: 'Hackathon Participation',
    note: 'Team collaboration on competitive problem solving and practical technical challenges.',
  },
];
