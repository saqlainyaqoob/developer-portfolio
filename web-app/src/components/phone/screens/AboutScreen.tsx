import {
  ArrowRight,
  GraduationCap,
  Heart,
  Target,
} from "lucide-react";
import { usePhone } from "../PhoneContext";
import { PCard, PHeader, PPage, PSection, PTag } from "../ui";
import { profile } from "@/data/profile";

export function AboutScreen() {
  const { push } = usePhone();

  return (
    <PPage>
      <PHeader title="About Me" subtitle="Background, education & approach" />
      <div className="space-y-6 px-5 py-5">
        {/* Bio */}
        <PSection label="Biography">
          <div className="space-y-2.5">
            {profile.bio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[12.5px] leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </PSection>

        {/* Education */}
        <PSection label="Education">
          <PCard>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                <GraduationCap size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[13.5px] font-semibold">
                  {profile.education.degree}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
                  {profile.education.summary}
                </p>
              </div>
            </div>
          </PCard>
        </PSection>

        {/* Interests */}
        <PSection label="Development Interests">
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((interest) => (
              <PTag key={interest}>
                <Heart size={10} className="mr-1 text-primary" />
                {interest}
              </PTag>
            ))}
          </div>
        </PSection>

        {/* Approach */}
        <PSection label="My Engineering Approach">
          <div className="space-y-2.5">
            {profile.approach.map((item, index) => (
              <PCard key={item.title}>
                <div className="flex gap-3">
                  <span className="font-mono text-[11px] font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold">{item.title}</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </PCard>
            ))}
          </div>
        </PSection>

        {/* Objectives */}
        <PSection label="Career Objectives">
          <PCard>
            <div className="space-y-3">
              {profile.objectives.map((objective) => (
                <div key={objective} className="flex gap-2.5">
                  <Target
                    size={14}
                    className="mt-0.5 shrink-0 text-secondary"
                  />
                  <p className="text-[12px] leading-relaxed text-muted">
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </PCard>
        </PSection>

        {/* CTA */}
        <button
          onClick={() => push({ name: "experience" })}
          className="flex w-full items-center justify-between rounded-2xl border border-primary/30 bg-soft px-4 py-3.5 text-left transition-colors hover:border-primary/60"
        >
          <span className="text-[13px] font-semibold text-primary">
            View my experience timeline
          </span>
          <ArrowRight size={16} className="text-primary" />
        </button>
      </div>
    </PPage>
  );
}
