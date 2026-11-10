/**
 * ──────────────────────────────────────────────────────────────────────
 *  FEATURED PROJECTS — centralized content.
 * ──────────────────────────────────────────────────────────────────────
 *  ✏️  UPDATE ME: add your real repository / demo URLs in `links`.
 *      Links left undefined are rendered honestly as "not configured"
 *      — no fake URLs are ever shipped.
 */
export interface ProjectLinks {
  /** e.g. "https://github.com/yourusername/consultflow" */
  github?: string;
  /** e.g. "https://consultflow.yourdomain.dev" */
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
  /** Accent hex used for gradients across web + app */
  accent: string;
  links: ProjectLinks;
}

export const projectCategories = [
  "All",
  "Full-Stack SaaS",
  "E-commerce",
  "Backend / API",
] as const;

export const projects: Project[] = [
  {
    id: "commerce-dashboard",
    name: "Commerce Dashboard",
    category: "E-commerce",
    tagline: "E-commerce administration system",
    description:
      "A comprehensive e-commerce administration dashboard designed to manage products, customers, orders, inventory, and business operations through a centralized interface.",
    problem:
      "Small online stores often manage products, stock, and orders across scattered tools. The dashboard centralizes daily operations with live updates and inventory alerts before stock runs out.",
    features: [
      "Admin dashboard and analytics",
      "Product management",
      "Customer management",
      "Order management",
      "Inventory tracking",
      "Inventory alerts",
      "Authentication and authorization",
      "REST API integration",
      "Responsive dashboard interface",
      "Database-driven application architecture",
    ],
    tech: [
      "React 19",
      "Vite",
      "Redux",
      "Tailwind CSS 4",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Socket.IO",
      "JWT Authentication",
      "Docker",
      "Vercel",
    ],
    highlights: [
      "JWT-based authentication with protected routes and role-aware UI.",
      "Redux state architecture separating server data from UI state.",
      "Socket.IO pushes order and inventory events to the dashboard in real time.",
      "Inventory alerting built on threshold checks over the PostgreSQL schema.",
      "Dockerized development environment with deployment to Vercel.",
    ],
    icon: "cart",
    accent: "#6366F1",
    links: {
      github: "https://github.com/saqlainyaqoob/commerce-dashboard-web-app",
      demo: "https://commerce-dashboard-web-app-frontend.vercel.app",
    },
  },
  {
    id: "consultflow",
    name: "ConsultFlow",
    category: "Full-Stack SaaS",
    tagline: "Consultancy management platform",
    description:
      "A comprehensive consultancy management platform designed to help IT consultants and small consulting businesses manage their complete business workflow. It connects client management, leads, proposals, projects, tasks, time tracking, invoicing, payments, and client communication in one centralized workspace.",
    problem:
      "Independent consultants juggle disconnected tools for clients, proposals, time tracking, and invoices — losing hours to administration instead of billable work. ConsultFlow unifies the entire workflow in one secure workspace.",
    features: [
      "Client and lead management",
      "Proposal creation, versioning, and PDF generation",
      "Project and task management",
      "Time tracking and approvals",
      "Invoice generation and partial payments",
      "Client portal",
      "Role-based access control",
      "Secure authentication",
      "Notifications and real-time communication",
      "Reports and CSV exports",
      "Audit logging",
      "Docker-based development environment",
    ],
    tech: [
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Node.js",
      "Express 5",
      "Apollo GraphQL",
      "PostgreSQL",
      "Docker",
      "Socket.IO",
      "Zod",
      "Argon2id",
      "PDFKit",
      "Nodemailer",
      "Vitest",
      "Playwright",
    ],
    highlights: [
      "Apollo GraphQL server with a typed schema and resolvers shared between web and API.",
      "Password hashing with Argon2id and role-based access control enforced at the API boundary.",
      "Zod validation at every input boundary — forms, REST handlers, and GraphQL resolvers.",
      "PDFKit-driven proposal and invoice rendering with versioned proposal history.",
      "Socket.IO powers real-time notifications and client communication.",
      "Vitest and Playwright cover unit and end-to-end flows; Docker Compose mirrors production locally.",
    ],
    icon: "briefcase",
    accent: "#6366F1",
    links: {},
  },
  {
    id: "task-manager-api",
    name: "Task Manager",
    category: "Backend / API",
    tagline: "RESTful task management service",
    description:
      "A task management application built to demonstrate backend engineering fundamentals, RESTful API development, and PostgreSQL database integration.",
    problem:
      "A focused backend project that demonstrates clean REST design, relational data modeling, request validation, and documented API testing — the fundamentals every service is built on.",
    features: [
      "Task creation",
      "Task retrieval",
      "Task updates",
      "Task deletion",
      "RESTful API architecture",
      "PostgreSQL integration",
      "Request validation",
      "API testing using Postman",
    ],
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "REST APIs",
      "JavaScript",
      "Tailwind CSS",
      "Postman",
    ],
    highlights: [
      "Resource-oriented REST design with consistent status codes and error shapes.",
      "PostgreSQL schema with parameterized queries and migration scripts.",
      "Centralized request validation middleware before any handler runs.",
      "Postman collection documenting every endpoint for reproducible testing.",
    ],
    icon: "server",
    accent: "#6366F1",
    links: {},
  },
];

export const getProject = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);
