export interface ApiHealthResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
  database: string;
  timestamp: string;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  submission_id: number | null;
  delivery_status: string;
  message: string;
  timestamp: string;
}

export interface ApiProfileResponse {
  name: string;
  specialization: string;
  institution: string;
  currentYear: string;
  location: string;
  email: string;
  phone: string;
  githubUrl: string;
  githubUsername: string;
  linkedinUrl: string;
  linkedinHandle: string;
  aboutParagraphs: string[];
  careerObjective: string;
  languagesKnown: string[];
}

export interface ApiSkillsResponse {
  programmingSkills: Array<{
    name: string;
    status: string;
    category: string;
    description: string;
  }>;
  toolsAndPlatforms: Array<{
    name: string;
    usage: string;
    description: string;
  }>;
  areasOfInterest: Array<{
    title: string;
    description: string;
  }>;
  languagesKnown: string[];
}

export interface ApiProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  problemStatement: string;
  purpose: string;
  keyFeatures: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface ApiEducationItem {
  id: string;
  degree: string;
  specialization?: string;
  institution: string;
  location?: string;
  status: string;
  scoreLabel?: string;
  scoreValue?: string;
  semesterResults?: Array<{
    semester: string;
    sgpa: string;
  }>;
  highlights: string[];
}

export interface ApiAchievementItem {
  id: string;
  title: string;
  category: string;
  organization: string;
  description: string;
  keyTakeaways: string[];
}

export interface ApiResumeMetadata {
  candidate_name: string;
  filename: string;
  format: string;
  download_url: string;
  sections: string[];
  includes_photograph: boolean;
  includes_location_in_header: boolean;
  includes_professional_summary: boolean;
  includes_designation_subtitle: boolean;
  last_updated: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (data && typeof data === 'object') {
      if ('message' in data && typeof data.message === 'string') {
        throw new Error(data.message);
      }
      if ('detail' in data) {
        const detail = (data as { detail: unknown }).detail;
        if (typeof detail === 'string') {
          throw new Error(detail);
        }
        if (Array.isArray(detail) && detail.length > 0) {
          const firstMsg = detail[0]?.msg;
          if (typeof firstMsg === 'string') {
            throw new Error(firstMsg.replace(/^Value error,\s*/i, ''));
          }
        }
      }
    }
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data as T;
}

export async function checkApiHealth(): Promise<ApiHealthResponse> {
  return requestJson<ApiHealthResponse>('/api/health');
}

export async function fetchProfile(): Promise<ApiProfileResponse> {
  return requestJson<ApiProfileResponse>('/api/profile');
}

export async function fetchSkills(): Promise<ApiSkillsResponse> {
  return requestJson<ApiSkillsResponse>('/api/skills');
}

export async function fetchProjects(): Promise<ApiProjectItem[]> {
  return requestJson<ApiProjectItem[]>('/api/projects');
}

export async function fetchEducation(): Promise<ApiEducationItem[]> {
  return requestJson<ApiEducationItem[]>('/api/education');
}

export async function fetchAchievements(): Promise<ApiAchievementItem[]> {
  return requestJson<ApiAchievementItem[]>('/api/achievements');
}

export async function fetchResumeMetadata(): Promise<ApiResumeMetadata> {
  return requestJson<ApiResumeMetadata>('/api/resume');
}

export function getBackendResumeDownloadUrl(): string {
  return buildApiUrl('/api/resume/download');
}

export async function submitContactForm(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResponse> {
  return requestJson<ContactSubmissionResponse>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
