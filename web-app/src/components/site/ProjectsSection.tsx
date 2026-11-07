import {
  Check,
  ExternalLink,
  Lightbulb,
  Link2,
  Wrench,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal, SectionHeading } from "./Section";
import { projects, type Project } from "@/data/projects";
import { isSafeExternalUrl } from "@/lib/utils";

function ProjectLink({
  project,
  kind,
}: {
  project: Project;
  kind: "github" | "demo";
}) {
  const url = kind === "github" ? project.links.github : project.links.demo;
  const label = kind === "github" ? "GitHub Repository" : "Live Demo";
  const Icon = kind === "github" ? GithubIcon : ExternalLink;

  if (!isSafeExternalUrl(url)) {
    return (
      <span
        title="Link not configured — add the URL in src/data/projects.ts"
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line px-4 py-2 text-[12px] font-semibold text-muted/60"
      >
        <Link2 size={13} /> {label} · not set
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-white transition-all hover:brightness-110"
    >
      <Icon size={13} /> {label}
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <article className="group overflow-hidden rounded-3xl border border-line bg-surface card-ring transition-colors hover:border-primary/30">
        {/* Accent header */}
        <div
          className="relative flex flex-wrap items-center gap-4 border-b border-line p-6 sm:p-7"
          style={{
            background: `linear-gradient(120deg, ${project.accent}1f 0%, transparent 60%)`,
          }}
        >
          <div
            className="flex shrink-0 items-center justify-center rounded-2xl"
            style={{
              width: 52,
              height: 52,
              backgroundColor: `${project.accent}22`,
              color: project.accent,
            }}
          >
            <Glyph icon={project.icon} size={52} />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: project.accent }}
            >
              {project.category}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
              {project.name}
            </h3>
            <p className="text-[13px] text-muted">{project.tagline}</p>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <ProjectLink project={project} kind="github" />
            <ProjectLink project={project} kind="demo" />
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-7 lg:grid-cols-[1.2fr_1fr]">
          {/* Left — story + features */}
          <div>
            <p className="text-[14px] leading-relaxed text-muted">
              {project.description}
            </p>

            <div className="mt-5 rounded-xl border border-line bg-elevated p-4">
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-600">
                <Lightbulb size={12} /> The problem it solves
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {project.problem}
              </p>
            </div>

            <p className="mt-6 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
              Key features
            </p>
            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check
                    size={13}
                    strokeWidth={3}
                    className="mt-[3px] shrink-0"
                    style={{ color: project.accent }}
                  />
                  <span className="text-[12.5px] leading-snug text-muted">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — stack + highlights */}
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                Technology stack
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line bg-elevated px-2.5 py-1 text-[11px] font-medium text-muted transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                Implementation highlights
              </p>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((highlight) => (
                  <li key={highlight.slice(0, 24)} className="flex gap-2.5">
                    <Wrench size={12} className="mt-1 shrink-0 text-muted" />
                    <span className="text-[12.5px] leading-relaxed text-muted">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Glyph({ icon, size }: { icon: Project["icon"]; size: number }) {
  const paths: Record<Project["icon"], string> = {
    briefcase:
      "M4 7h16v13H4z M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    cart: "M5 5h15l-2 8H7L5 3H2 M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    server:
      "M4 4h16v6H4z M4 14h16v6H4z M7 7h.01 M7 17h.01",
  };
  return (
    <svg
      width={size * 0.5}
      height={size * 0.5}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[icon].split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : `M${d}`} />
      ))}
    </svg>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="Featured work, end to end"
          description="Three production-minded projects covering full-stack SaaS, e-commerce administration, and backend API engineering."
        />

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-[12px] leading-relaxed text-muted/80">
            Repository and demo URLs are intentionally unset — add them once in{" "}
            <span className="font-mono text-[11px] text-primary">
              src/data/projects.ts
            </span>{" "}
            and both the website and the mobile app update. Placeholder links
            are never presented as live endpoints.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
