export type SkillCategoryId =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools"
  | "mobile";

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  blurb: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    blurb: "Modern, responsive interfaces",
    items: [
      "React.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux",
      "Vite",
      "Responsive UI Development",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    blurb: "APIs & server architecture",
    items: [
      "Node.js",
      "Express.js",
      "GraphQL",
      "Apollo GraphQL",
      "REST API Development",
      "Socket.IO",
      "Authentication & Authorization",
      "Role-Based Access Control",
      "API Integration",
    ],
  },
  {
    id: "database",
    title: "Database Technologies",
    blurb: "Relational data modeling",
    items: [
      "PostgreSQL",
      "SQL",
      "Database Design",
      "Database Migrations",
      "Relational Database Management",
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    blurb: "Deploy & operate",
    items: [
      "Docker",
      "Docker Compose",
      "AWS",
      "Vercel",
      "Environment Configuration",
      "CI/CD Fundamentals",
      "Application Deployment",
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    blurb: "Daily workflow",
    items: [
      "Git",
      "GitHub",
      "Bitbucket",
      "VS Code",
      "Postman",
      "DBeaver",
      "Jira",
      "Slack",
      "Linux / Ubuntu",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    blurb: "Cross-platform apps",
    items: [
      "React Native",
      "Expo",
      "TypeScript",
      "React Navigation / Expo Router",
      "Native Device APIs",
      "Cross-Platform Development",
    ],
  },
];

export const techMarquee = [
  "React",
  "React Native",
  "TypeScript",
  "Node.js",
  "Express",
  "GraphQL",
  "Apollo",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Redux",
  "Tailwind CSS",
  "Socket.IO",
  "Vite",
  "Expo",
  "REST APIs",
];
