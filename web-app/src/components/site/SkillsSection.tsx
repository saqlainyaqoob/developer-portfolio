import {
  Code2,
  Container,
  Database,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Section";
import {
  skillCategories,
  type SkillCategoryId,
} from "@/data/skills";

const CATEGORY_ICONS: Record<SkillCategoryId, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Container,
  tools: Wrench,
  mobile: Smartphone,
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-line bg-surface/30 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title="Tools of the trade"
          description="Organized by category, grounded in real project usage — no inflated proficiency percentages."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.id];
            return (
              <Reveal key={category.id} delay={(index % 3) * 0.07}>
                <div className="h-full rounded-2xl border border-line bg-background p-5 card-ring transition-colors hover:border-primary/35">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft text-primary">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[14.5px] font-semibold">
                        {category.title}
                      </p>
                      <p className="text-[11px] text-muted">{category.blurb}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
