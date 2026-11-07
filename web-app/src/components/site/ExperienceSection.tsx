import { Briefcase, Layers } from "lucide-react";
import { Reveal, SectionHeading } from "./Section";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-line bg-surface/30 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where I've worked & what I've shipped"
          description="Professional experience and project work, kept clearly separated — the way an honest timeline should be."
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-4 left-[15px] top-2 w-px sm:left-[19px]"
            style={{
              background:
                "linear-gradient(to bottom, var(--primary), var(--secondary))",
              opacity: 0.5,
            }}
            aria-hidden
          />

          <div className="space-y-8">
            {experience.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08}>
                <article className="relative pl-12 sm:pl-16">
                  {/* Node */}
                  <div
                    className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border sm:h-10 sm:w-10 ${
                      item.type === "internship"
                        ? "border-primary/40 bg-soft text-primary"
                        : "border-secondary/40 bg-secondary/10 text-secondary"
                    }`}
                  >
                    {item.type === "internship" ? (
                      <Briefcase size={15} />
                    ) : (
                      <Layers size={15} />
                    )}
                  </div>

                  <div className="rounded-2xl border border-line bg-background p-5 transition-colors sm:p-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                          item.type === "internship"
                            ? "bg-soft text-primary"
                            : "bg-secondary/15 text-secondary"
                        }`}
                      >
                        {item.type === "internship" ? "Internship" : "Project Experience"}
                      </span>
                      <span className="font-mono text-[11.5px] text-muted">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-[13.5px] font-semibold text-primary">
                      {item.company}
                      {item.location && (
                        <span className="font-normal text-muted">
                          {" "}
                          · {item.location}
                        </span>
                      )}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.points.map((point) => (
                        <li key={point.slice(0, 24)} className="flex gap-2.5">
                          <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                          <span className="text-[13.5px] leading-relaxed text-muted">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
