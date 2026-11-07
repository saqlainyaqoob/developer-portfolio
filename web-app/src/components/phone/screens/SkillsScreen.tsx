import {
  Code2,
  Container,
  Database,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PHeader, PPage, PTag } from "../ui";
import { skillCategories, type SkillCategoryId } from "@/data/skills";

const CATEGORY_ICONS: Record<SkillCategoryId, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Container,
  tools: Wrench,
  mobile: Smartphone,
};

export function SkillsScreen() {
  return (
    <PPage>
      <PHeader title="Technical Skills" subtitle="Tools I use to build software" />
      <div className="space-y-4 px-5 py-4">
        {skillCategories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id];
          return (
            <section
              key={category.id}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-soft text-primary">
                  <Icon size={17} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold">{category.title}</p>
                  <p className="text-[10.5px] text-muted">{category.blurb}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <PTag key={item}>{item}</PTag>
                ))}
              </div>
            </section>
          );
        })}
        <p className="pb-2 text-center text-[10.5px] leading-relaxed text-muted/80">
          Skills are grouped by category — no inflated percentages, just the
          tools used in real projects.
        </p>
      </div>
    </PPage>
  );
}
