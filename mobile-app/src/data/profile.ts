import { config } from "./config";
import type { ProfileData } from "@/src/types";

export const profile: ProfileData = {
  name: config.name,
  firstName: config.firstName,
  initials: config.initials,
  roles: [
    "Full-Stack Developer",
    "Software Engineer",
    "React Native Developer",
  ],
  headline: "Full-Stack Developer · Software Engineer · React Native Developer",
  intro:
    "I am a Computer Science graduate and Full-Stack Mobile and Web App Developer passionate about building scalable, secure, and user-friendly software applications.",
  bio: [
    "I am a Computer Science graduate and Full-Stack Mobile and Web App Developer passionate about building scalable, secure, and user-friendly software applications.",
    "My development experience focuses on modern frontend technologies, backend architecture, RESTful and GraphQL APIs, relational databases, authentication, application security, and containerized deployments.",
    "I enjoy transforming ideas into practical software products, developing maintainable application architectures, solving complex technical problems, and continuously exploring modern technologies.",
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    field: "Computer Science",
    summary:
      "Graduate with a strong foundation in data structures, algorithms, databases, operating systems, and software engineering — the groundwork for building reliable, production-grade applications.",
  },
  interests: [
    "Full-stack web development",
    "Backend engineering",
    "Database design",
    "Cloud technologies",
    "DevOps practices",
    "Cross-platform mobile development",
  ],
  objectives: [
    "Engineer software products that are scalable, secure, and genuinely useful to people.",
    "Grow into roles with greater architectural ownership across frontend, backend, and mobile.",
    "Contribute to teams that value clean code, honest communication, and continuous learning.",
    "Keep deepening my expertise in cloud technologies and cross-platform mobile development.",
  ],
  approach: [
    {
      title: "Architecture first",
      description:
        "Maintainable structure beats quick wins clear separation of concerns, typed contracts, and centralized data make every feature easier to build.",
    },
    {
      title: "Security by default",
      description:
        "Authentication, authorization, and input validation are designed in from the start — never bolted on afterwards.",
    },
    {
      title: "Small and honest",
      description:
        "Ship focused increments, validate with real feedback, and keep the codebase truthful, no fake states or untested claims.",
    },
    {
      title: "Never stop learning",
      description:
        "Modern tooling moves fast. I explore continuously from containerized deployments to cross-platform mobile, and apply what I learn in real projects.",
    },
  ],
};
