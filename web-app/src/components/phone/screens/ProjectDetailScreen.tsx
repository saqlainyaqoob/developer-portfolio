import {
  Check,
  ExternalLink,
  FolderGit2,
  Lightbulb,
  Link2,
  Wrench,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { usePhone } from "../PhoneContext";
import { PCard, PHeader, PPage, PSection, PTag, ProjectGlyph } from "../ui";
import { getProject } from "@/data/projects";
import { isSafeExternalUrl } from "@/lib/utils";

export function ProjectDetailScreen({ id }: { id: string }) {
  const { pop } = usePhone();
  const project = getProject(id);

  if (!project) {
    return (
      <PPage>
        <PHeader title="Project" onBack={pop} />
        <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
          <FolderGit2 size={30} className="text-muted" />
          <p className="text-[14px] font-semibold">Project not found</p>
          <p className="text-[12px] text-muted">
            The project you are looking for does not exist or was removed.
          </p>
        </div>
      </PPage>
    );
  }

  const linkButton = (kind: "github" | "demo") => {
    const url = kind === "github" ? project.links.github : project.links.demo;
    const label = kind === "github" ? "GitHub Repo" : "Live Demo";
    const Icon = kind === "github" ? GithubIcon : ExternalLink;
    if (!isSafeExternalUrl(url)) {
      return (
        <span
          key={kind}
          title="Link not configured"
          className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-dashed border-line px-4 py-2.5 text-[12px] font-semibold text-muted/70"
        >
          <Link2 size={14} /> {label}: not set
        </span>
      );
    }
    return (
      <a
        key={kind}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
      >
        <Icon size={14} /> {label}
      </a>
    );
  };

  return (
    <PPage>
      <PHeader title={project.name} subtitle={project.category} onBack={pop} />

      <div className="space-y-6 px-5 py-5">
        {/* Hero */}
        <div
          className="rounded-2xl border p-5"
          style={{
            borderColor: `${project.accent}44`,
            background: `linear-gradient(135deg, ${project.accent}26 0%, transparent 65%)`,
          }}
        >
          <ProjectGlyph icon={project.icon} accent={project.accent} size={46} />
          <h2 className="mt-3 font-display text-[19px] font-bold">
            {project.name}
          </h2>
          <p
            className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: project.accent }}
          >
            {project.category}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted">
            {project.description}
          </p>
        </div>

        {/* Problem */}
        <PSection label="The Problem It Solves">
          <PCard className="relative overflow-hidden border-l-2">
            <div
              className="absolute inset-y-0 left-0 w-[2.5px]"
              style={{ backgroundColor: project.accent }}
            />
            <div className="flex gap-2.5">
              <Lightbulb size={15} className="mt-0.5 shrink-0 text-amber-400" />
              <p className="text-[12px] leading-relaxed text-muted">
                {project.problem}
              </p>
            </div>
          </PCard>
        </PSection>

        {/* Features */}
        <PSection label="Key Features">
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-start gap-1.5">
                <Check
                  size={12}
                  strokeWidth={3}
                  className="mt-[3px] shrink-0"
                  style={{ color: project.accent }}
                />
                <span className="text-[11px] leading-snug text-muted">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </PSection>

        {/* Tech stack */}
        <PSection label="Technology Stack">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <PTag key={tech}>{tech}</PTag>
            ))}
          </div>
        </PSection>

        {/* Highlights */}
        <PSection label="Implementation Highlights">
          <div className="space-y-2.5">
            {project.highlights.map((highlight) => (
              <div key={highlight.slice(0, 24)} className="flex gap-2.5">
                <Wrench size={12} className="mt-[3px] shrink-0 text-muted" />
                <p className="text-[11.5px] leading-relaxed text-muted">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </PSection>

        {/* Links */}
        <PSection label="Links">
          <div className="flex gap-2.5">
            {[linkButton("github"), linkButton("demo")]}
          </div>
          <p className="mt-2.5 text-center text-[10.5px] leading-relaxed text-muted/80">
            Repository and demo URLs are intentionally unset — add them in{" "}
            <span className="font-mono text-[10px]">src/data/projects.ts</span>.
          </p>
        </PSection>
      </div>
    </PPage>
  );
}
