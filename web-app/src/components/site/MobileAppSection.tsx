import {
  Bell,
  Fingerprint,
  Link2,
  MoonStar,
  Navigation,
  Palette,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Section";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Navigation,
    title: "Expo Router navigation",
    text: "Bottom tabs + typed stack routes (project details, experience, settings) with Android back-button support.",
  },
  {
    icon: Palette,
    title: "NativeWind styling",
    text: "Tailwind utility classes across every component, with class-based dark mode driven by shared design tokens.",
  },
  {
    icon: MoonStar,
    title: "Persistent theming",
    text: "Light, dark, and system-default themes persisted with AsyncStorage — restored on every launch.",
  },
  {
    icon: Zap,
    title: "Reanimated transitions",
    text: "Native 60fps screen transitions and micro-interactions — no blocked JavaScript thread.",
  },
  {
    icon: ShieldCheck,
    title: "Typed forms & validation",
    text: "React Hook Form + Zod schemas with strict TypeScript everywhere — no `any` in the codebase.",
  },
  {
    icon: Link2,
    title: "Validated external links",
    text: "Every URL is scheme-checked before opening via expo-linking. Unset links are shown honestly as 'not configured'.",
  },
  {
    icon: Bell,
    title: "Honest contact flow",
    text: "No fake backend — the form validates locally and hands a pre-filled message to your email app.",
  },
  {
    icon: Fingerprint,
    title: "Offline-friendly content",
    text: "All portfolio content lives in centralized TypeScript data files — the app works fully offline.",
  },
];

const TREE_LINES = [
  { text: "portfolio-mobile/", color: "text-foreground font-semibold" },
  { text: "├── app/", color: "text-primary" },
  { text: "│   ├── (tabs)/            → Home · About · Projects · Skills · Contact", color: "text-muted" },
  { text: "│   ├── project/[id].tsx   → Project details (dynamic route)", color: "text-muted" },
  { text: "│   ├── experience.tsx", color: "text-muted" },
  { text: "│   └── settings.tsx", color: "text-muted" },
  { text: "├── src/", color: "text-primary" },
  { text: "│   ├── components/        → Reusable UI primitives", color: "text-muted" },
  { text: "│   ├── data/              → Centralized portfolio content", color: "text-muted" },
  { text: "│   ├── theme/             → Tokens + ThemeProvider (AsyncStorage)", color: "text-muted" },
  { text: "│   └── lib/               → Link validation & utilities", color: "text-muted" },
  { text: "├── eas.json               → EAS Build profiles", color: "text-muted" },
  { text: "└── README.md              → Setup & build instructions", color: "text-muted" },
];

export function MobileAppSection() {
  return (
    <section id="app" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="The App"
          title="This portfolio is a real mobile app"
          description="Everything you just tried in the phone preview is the web mirror of a production React Native application — same screens, same design tokens, same data files."
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Feature grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.title} delay={(index % 2) * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-surface p-4 card-ring transition-colors hover:border-primary/35">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-soft text-primary">
                    <feature.icon size={16} strokeWidth={1.8} />
                  </div>
                  <p className="mt-3 text-[13.5px] font-semibold">
                    {feature.title}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                    {feature.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Terminal card */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line bg-[#0A0E17] shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 font-mono text-[11px] text-zinc-500">
                  project-structure — zsh
                </span>
              </div>
              <div className="p-5 font-mono text-[11.5px] leading-[1.9]">
                {TREE_LINES.map((line) => (
                  <p key={line.text} className={cn("whitespace-pre", line.color)}>
                    {line.text}
                  </p>
                ))}
                <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4">
                  <span className="text-emerald-400">➜</span>
                  <span className="text-zinc-400">~/portfolio-mobile</span>
                  <span className="text-zinc-600">$</span>
                  <span className="text-zinc-200">npx expo start</span>
                  <span className="inline-block h-4 w-2 animate-blink bg-primary/80" />
                </div>
                <p className="mt-3 text-[10.5px] leading-relaxed text-zinc-500">
                  # Then press a (Android) or i (iOS), or scan the QR code
                  <br />
                  # with the Expo Go app on your physical device.
                </p>
              </div>
            </div>

            {/* Platform chips */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[12px] font-semibold text-muted">
                <Smartphone size={13} className="text-primary" /> Android — priority tested target
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[12px] font-semibold text-muted">
                <Smartphone size={13} className="text-secondary" /> iOS — same codebase
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
