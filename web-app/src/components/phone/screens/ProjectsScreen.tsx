import { useMemo, useState } from "react";
import { ChevronRight, FolderOpen } from "lucide-react";
import { usePhone } from "../PhoneContext";
import { PHeader, PPage, PTag, ProjectGlyph } from "../ui";
import {
  projectCategories,
  projects,
} from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectsScreen() {
  const { push } = usePhone();
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <PPage>
      <PHeader title="Projects" subtitle="Featured work & case studies" />

      {/* Filter chips */}
      <div className="sticky top-[49px] z-10 flex gap-2 overflow-x-auto border-b border-line bg-surface/90 px-5 py-3 backdrop-blur-md no-scrollbar">
        {projectCategories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold transition-all",
              filter === category
                ? "bg-primary text-white"
                : "border border-line bg-elevated text-muted hover:text-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-3 px-5 py-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line py-14 text-center">
            <FolderOpen size={26} className="text-muted" />
            <p className="text-[13px] font-semibold">No projects here yet</p>
            <p className="max-w-[220px] text-[11.5px] text-muted">
              New case studies will appear in this category as they are
              published.
            </p>
          </div>
        ) : (
          filtered.map((project) => (
            <button
              key={project.id}
              onClick={() => push({ name: "project", id: project.id })}
              className="group w-full rounded-2xl border border-line bg-surface p-4 text-left transition-colors hover:border-primary/40"
            >
              <div className="flex items-start gap-3">
                <ProjectGlyph icon={project.icon} accent={project.accent} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[14px] font-semibold">
                      {project.name}
                    </p>
                    <ChevronRight
                      size={15}
                      className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-primary">
                    {project.category}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-snug text-muted">
                    {project.tagline}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <PTag key={tech}>{tech}</PTag>
                    ))}
                    {project.tech.length > 3 && (
                      <PTag>+{project.tech.length - 3}</PTag>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </PPage>
  );
}
