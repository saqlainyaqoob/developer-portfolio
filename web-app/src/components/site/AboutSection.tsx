import {
  GraduationCap,
  Heart,
  MapPin,
  Target,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Section";
import { profile } from "@/data/profile";
import { config } from "@/data/config";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Engineering background, human focus"
          description="A Computer Science graduate who cares as much about maintainable architecture and security as about how software feels for the people using it."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — bio, education, interests */}
          <div className="space-y-8">
            <Reveal>
              <div className="space-y-4">
                {profile.bio.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-[14.5px] leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-line bg-surface p-5 card-ring">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                    <GraduationCap size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted">
                      Education
                    </p>
                    <p className="mt-1.5 font-display text-[16px] font-semibold">
                      {profile.education.degree}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {profile.education.summary}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted">
                Development interests
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-medium text-muted"
                  >
                    <Heart size={11} className="text-primary" />
                    {interest}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex items-center gap-2 text-[12.5px] text-muted">
                <MapPin size={13} className="text-primary" />
                Based in {config.location} — working with teams worldwide.
              </div>
            </Reveal>
          </div>

          {/* Right — approach + objectives */}
          <div className="space-y-8">
            <Reveal delay={0.06}>
              <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted">
                My engineering approach
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {profile.approach.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-line bg-surface p-4 card-ring transition-colors hover:border-primary/35"
                  >
                    <span className="font-mono text-[11px] font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-[14px] font-semibold">{item.title}</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted">
                Career objectives
              </p>
              <div className="mt-3 rounded-2xl border border-line bg-surface p-5 card-ring">
                <ul className="space-y-3.5">
                  {profile.objectives.map((objective) => (
                    <li key={objective} className="flex gap-3">
                      <Target size={15} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="text-[13.5px] leading-relaxed text-muted">
                        {objective}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
