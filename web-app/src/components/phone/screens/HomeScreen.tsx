import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  FolderGit2,
  Mail,
  MapPin,
  Settings,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { usePhone } from "../PhoneContext";
import {
  Monogram,
  PButton,
  PCard,
  PPage,
  PSection,
  PTag,
  PToast,
  ProjectGlyph,
} from "../ui";
import { config, } from "@/data/config";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experience } from "@/data/experience";
import { isSafeExternalUrl } from "@/lib/utils";

function openSocial(url: string, note: (message: string) => void) {
  const real =
    isSafeExternalUrl(url) &&
    !url.includes("yourusername") &&
    !url.includes("example.com");
  if (real) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    note("Placeholder link — set your real profile URL in src/data/config.ts");
  }
}

export function HomeScreen() {
  const { navigate, push } = usePhone();
  const [note, setNote] = useState<string | null>(null);
  const internship = experience[0];
  const previewSkills = skillCategories.flatMap((c) => c.items).slice(0, 10);

  const showToast = (message: string) => {
    setNote(message);
    window.setTimeout(() => setNote(null), 2600);
  };

  return (
    <PPage>
      <div className="space-y-6 px-5 pb-10 pt-4">
        {/* Identity */}
        <header className="flex items-center gap-3.5">
          <Monogram size={48} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-[17px] font-bold leading-tight">
              {profile.name}
            </h1>
            <p className="truncate text-[11.5px] text-muted">
              {profile.roles.join(" · ")}
            </p>
          </div>
          <button
            onClick={() => push({ name: "settings" })}
            aria-label="Open settings"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-foreground"
          >
            <Settings size={17} strokeWidth={1.8} />
          </button>
        </header>

        {/* Status chips */}
        <div className="flex flex-wrap gap-2">
          {config.availableForWork && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
              Open to opportunities
            </span>
          )}
          <PTag>
            <MapPin size={11} className="mr-1" /> {config.location}
          </PTag>
        </div>

        {/* Intro */}
        <p className="text-[13px] leading-relaxed text-muted">{profile.intro}</p>

        {/* CTAs */}
        <div className="flex gap-2.5">
          <PButton
            className="flex-1"
            icon={<FolderGit2 size={15} />}
            onClick={() => navigate("projects")}
          >
            View My Projects
          </PButton>
          <PButton
            className="flex-1"
            variant="secondary"
            icon={<Mail size={15} />}
            onClick={() => navigate("contact")}
          >
            Contact Me
          </PButton>
        </div>

        {/* Experience shortcut */}
        <PCard onClick={() => push({ name: "experience" })} className="group">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
              <Sparkles size={18} strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold">Experience & Journey</p>
              <p className="truncate text-[11px] text-muted">
                {internship.company} · {internship.period}
              </p>
            </div>
            <ChevronRight
              size={16}
              className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </PCard>
      </div>

      {/* Featured projects */}
      <PSection
        label="Featured Projects"
        className="mb-6"
        action={
          <button
            onClick={() => navigate("projects")}
            className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-primary"
          >
            See all <ArrowRight size={12} />
          </button>
        }
      >
        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 no-scrollbar">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => push({ name: "project", id: project.id })}
              className="w-[216px] shrink-0 snap-start rounded-2xl border border-line bg-surface p-4 text-left transition-colors hover:border-primary/40"
            >
              <ProjectGlyph icon={project.icon} accent={project.accent} />
              <p className="mt-3 text-[13.5px] font-semibold">{project.name}</p>
              <p className="mt-0.5 text-[10.5px] font-medium uppercase tracking-wide text-muted">
                {project.category}
              </p>
              <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-snug text-muted">
                {project.tagline}
              </p>
            </button>
          ))}
        </div>
      </PSection>

      {/* Skills preview */}
      <PSection
        label="Technical Skills"
        className="mb-6"
        action={
          <button
            onClick={() => navigate("skills")}
            className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-primary"
          >
            View all <ArrowUpRight size={12} />
          </button>
        }
      >
        <div className="flex flex-wrap gap-1.5">
          {previewSkills.map((skill) => (
            <PTag key={skill}>{skill}</PTag>
          ))}
        </div>
      </PSection>

      {/* Socials + footer */}
      <PSection label="Find me online">
        <div className="flex gap-2.5">
          {[
            { icon: GithubIcon, url: config.socials.github, label: "GitHub" },
            { icon: LinkedinIcon, url: config.socials.linkedin, label: "LinkedIn" },
          ].map(({ icon: Icon, url, label }) => (
            <button
              key={label}
              aria-label={label}
              onClick={() => openSocial(url, showToast)}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-[12px] font-semibold text-muted transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
        <p className="mt-5 text-center font-mono text-[10px] tracking-wide text-muted/70">
          Built with React Native · Expo · NativeWind
        </p>
      </PSection>

      <PToast show={!!note}>{note}</PToast>
    </PPage>
  );
}
