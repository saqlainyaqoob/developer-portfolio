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

export const experience: ExperienceItem[] = [
  {
    id: "zigron",
    role: "Full-Stack Developer Intern",
    company: "Zigron",
    type: "internship",
    location: "Islamabad, Pakistan",
    period: "March 2025 – May 2025",
    summary:
      "Full-stack development internship working on modern application technologies across the stack.",
    points: [
      "Worked on full-stack development tasks and modern application technologies.",
      "Gained practical experience with React, GraphQL, Node.js, and PostgreSQL.",
      "Collaborated using development workflows and project management tools.",
      "Developed an understanding of professional software engineering practices.",
    ],
    tech: ["React", "GraphQL", "Node.js", "Websockets", "PostgreSQL"],
  },
  {
    id: "terrasmart",
    role: "Terrasmart Project Contributor",
    company: "Zigron",
    type: "project",
    location: "Islamabad, Pakistan",
    period: "Project Experience",
    summary:
      "Contributed to an IoT-based Terrasmart project involving a weather station network controller, working with modern frontend and backend technologies to support data-driven application functionality and system integration.",
    points: [
      "Developed front-end interfaces with React.js and integrated GraphQL APIs for real-time data visualization.",
      "Built and consumed GraphQL APIs using Node.js, enabling efficient data queries for IoT devices.",
      "Designed and optimized PostgreSQL database to store sensor readings, site metadata, and device configurations.",
      "Deployed and maintained backend services on AWS Cloud to ensure scalability and reliability.",
      "Collaborated through Jira and Slack development workflows in an Agile development environment.",
    ],
    tech: [
      "React",
      "GraphQL",
      "Node.js",
      "Websockets",
      "PostgreSQL",
      "AWS",
      "Jira",
      "Slack",
    ],
  },
];
