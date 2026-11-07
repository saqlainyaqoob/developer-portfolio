import { Sparkle } from "lucide-react";
import { techMarquee } from "@/data/skills";

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-surface/40 py-4">
      <div className="flex w-max animate-marquee items-center gap-10">
        {[...techMarquee, ...techMarquee].map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            aria-hidden={index >= techMarquee.length}
            className="flex items-center gap-10 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.2em] text-muted"
          >
            {tech}
            <Sparkle size={12} className="text-primary/70" />
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
