export interface DbProject {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  highlights: string[];
  date: string;
  is_featured: boolean;
  github: string;
  demo: string;
  badge: string;
  image: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbSkill {
  id: string;
  name: string;
  level: number;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface DbAbout {
  id: string;
  bio: string;
  focus_items: string[];
  location: string;
  education_institution: string;
  degree: string;
  updated_at: string;
}

export interface DbExperience {
  id: string;
  period: string;
  role: string;
  institution: string;
  description: string;
  skills: string[];
  icon: string;
  is_highlight: boolean;
  sort_order: number;
  created_at: string;
}

export interface DbEducation {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  highlights: string[];
  sort_order: number;
  created_at: string;
}

export interface DbContent {
  id: string;
  title: string;
  platform: string;
  handle: string;
  description: string;
  stat: string;
  link: string;
  sort_order: number;
  created_at: string;
}

export interface DbMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface DbSettings {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}
