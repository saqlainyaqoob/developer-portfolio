import { Briefcase, Layers } from "lucide-react";
import { PHeader, PPage, PTag } from "../ui";
import { experience } from "@/data/experience";

export function ExperienceScreen() {
  return (
    <PPage>
      <PHeader
        title="Experience"
        subtitle="Professional & project experience"
      />
      <div className="px-5 py-5">
        {/* Timeline */}
        <div className="relative space-y-5 pl-6">
          {/* vertical line */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />

          {experience.map((item) => (
            <article key={item.id} className="relative">
              {/* node */}
              <div
                className={`absolute -left-6 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 ${
                  item.type === "internship"
                    ? "border-primary bg-soft"
                    : "border-secondary bg-soft"
                }`}
              >
                <span
                  className={`h-[5px] w-[5px] rounded-full ${
                    item.type === "internship" ? "bg-primary" : "bg-secondary"
                  }`}
                />
              </div>

              <div className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${
                      item.type === "internship"
                        ? "bg-soft text-primary"
                        : "bg-secondary/15 text-secondary"
                    }`}
                  >
                    {item.type === "internship" ? (
                      <Briefcase size={9} />
                    ) : (
                      <Layers size={9} />
                    )}
                    {item.type === "internship" ? "Internship" : "Project"}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {item.period}
                  </span>
                </div>

                <p className="mt-2 text-[14.5px] font-semibold leading-tight">
                  {item.role}
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-primary">
                  {item.company}
                  {item.location && (
                    <span className="font-normal text-muted">
                      {" "}
                      · {item.location}
                    </span>
                  )}
                </p>

                <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
                  {item.summary}
                </p>

                <ul className="mt-2.5 space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point.slice(0, 24)} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      <span className="text-[11.5px] leading-snug text-muted">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tech.map((tech) => (
                    <PTag key={tech}>{tech}</PTag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PPage>
  );
}
