const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface Technology {
  category: string;
  items: string[];
}

export interface Feature {
  name: string;
  description: string;
  details?: string;
  category?: string;
}

export interface CodeSnippet {
  title: string;
  description: string;
  language: string;
  file_path: string;
  code: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  project_type: 'web' | 'mobile' | 'desktop' | 'fullstack' | 'backend' | 'frontend';
  app_icon: string | null;
  start_date: string;
  end_date: string | null;
  is_ongoing: boolean;
  technologies: Technology[];
  tags: string[];
  github_url: string | null;
  demo_url: string | null;
  status: 'planning' | 'development' | 'completed' | 'maintenance';
  priority: number;
}

export interface ProjectDetail extends Project {
  features: Feature[];
  code_snippets: CodeSnippet[];
  detailed_description: string | null;
  challenges: string | null;
  achievements: string | null;
  lines_of_code: number | null;
  commit_count: number | null;
  contributor_count: number;
  screenshots: string[];
  documentation_url: string | null;
  client: string | null;
  created_at: string;
  updated_at: string | null;
}

export async function fetchProjects(projectType?: string): Promise<Project[]> {
  const url = new URL(`${API_BASE_URL}/api/projects`);
  if (projectType && projectType !== '전체') {
    url.searchParams.append('project_type', projectType);
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchProjectById(id: string): Promise<ProjectDetail> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Project not found');
    }
    throw new Error(`Failed to fetch project: ${response.statusText}`);
  }

  return response.json();
}

