export type ThemePreference = "light" | "dark" | "system";
export type Scheme = "light" | "dark";

export interface ProjectLinks {
  /** e.g. "https://github.com/yourusername/consultflow" — leave unset until real */
  github?: string;
  /** e.g. "https://consultflow.yourdomain.dev" — leave unset until real */
  demo?: string;
}

export type ProjectIcon = "briefcase" | "cart" | "server";

export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  features: string[];
  tech: string[];
  highlights: string[];
  icon: ProjectIcon;
  /** Accent hex used for tinted surfaces across the app */
  accent: string;
  links: ProjectLinks;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  /** "internship" = professional experience, "project" = project experience */
  type: "internship" | "project";
  location?: string;
  period: string;
  summary: string;
  points: string[];
  tech: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  items: string[];
}

export interface ProfileData {
  name: string;
  firstName: string;
  initials: string;
  roles: readonly string[];
  headline: string;
  intro: string;
  bio: readonly string[];
  education: {
    degree: string;
    field: string;
    summary: string;
  };
  interests: readonly string[];
  objectives: readonly string[];
  approach: readonly {
    title: string;
    description: string;
  }[];
}
