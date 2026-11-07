import {
  Check,
  Info,
  Layers,
  Monitor,
  Moon,
  Palette,
  Sun,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { usePhone, type ThemePref } from "../PhoneContext";
import { PCard, PHeader, PPage, PSection } from "../ui";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";

const THEME_OPTIONS: {
  value: ThemePref;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "light",
    label: "Light",
    description: "Bright surfaces for daylight",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Easy on the eyes at night",
    icon: Moon,
  },
  {
    value: "system",
    label: "System default",
    description: "Follow your device setting",
    icon: Monitor,
  },
];

export function SettingsScreen() {
  const { pref, setPref, theme } = usePhone();

  return (
    <PPage>
      <PHeader title="Settings" subtitle="Appearance & app information" />
      <div className="space-y-6 px-5 py-5">
        {/* Appearance */}
        <PSection label="Appearance">
          <PCard className="space-y-1 p-2">
            {THEME_OPTIONS.map(({ value, label, description, icon: Icon }) => {
              const active = pref === value;
              return (
                <button
                  key={value}
                  onClick={() => setPref(value)}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                    active ? "bg-soft" : "hover:bg-elevated",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                      active
                        ? "border-primary/40 text-primary"
                        : "border-line text-muted",
                    )}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold">{label}</p>
                    <p className="truncate text-[10.5px] text-muted">
                      {description}
                    </p>
                  </div>
                  {active && <Check size={16} className="shrink-0 text-primary" />}
                </button>
              );
            })}
          </PCard>
          <p className="mt-2 text-[10.5px] leading-relaxed text-muted/80">
            Currently rendering in <span className="font-semibold">{theme}</span>{" "}
            mode. Your preference is persisted on device — AsyncStorage in the
            native app, localStorage in this preview.
          </p>
        </PSection>

        {/* App info */}
        <PSection label="App Information">
          <PCard className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-soft text-primary">
                <Tag size={15} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-[12.5px] font-semibold">Version</p>
                <p className="text-[10.5px] text-muted">{config.appVersion} (production)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-soft text-primary">
                <Layers size={15} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-[12.5px] font-semibold">Built with</p>
                <p className="text-[10.5px] text-muted">
                  React Native · Expo · NativeWind · Expo Router
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-soft text-primary">
                <Palette size={15} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-[12.5px] font-semibold">Design system</p>
                <p className="text-[10.5px] text-muted">
                  Shared theme tokens across web & native
                </p>
              </div>
            </div>
          </PCard>
        </PSection>

        {/* About */}
        <PSection label="About">
          <PCard>
            <div className="flex gap-2.5">
              <Info size={14} className="mt-0.5 shrink-0 text-muted" />
              <p className="text-[11.5px] leading-relaxed text-muted">
                This portfolio is a real cross-platform mobile application built
                with React Native, Expo, and NativeWind. What you are viewing is
                its interactive web preview — the native app runs on Android and
                iOS from the same codebase.
              </p>
            </div>
          </PCard>
        </PSection>
      </div>
    </PPage>
  );
}
