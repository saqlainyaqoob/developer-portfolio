import type { Scheme } from "@/src/types";

/**
 * JS mirror of the CSS variables in global.css.
 * Use `tokens` for inline styles where NativeWind classes cannot reach
 * (tab bar config, status bar, third-party component props, lucide colors).
 * Component styling itself should use Tailwind classes (bg-background, …).
 */
export const palette = {
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    elevated: "#F1F5F9",
    primary: "#4F46E5",
    secondary: "#7C3AED",
    foreground: "#0F172A",
    muted: "#64748B",
    border: "rgba(15, 23, 42, 0.1)",
    soft: "rgba(79, 70, 229, 0.1)",
  },
  dark: {
    background: "#0B0F19",
    surface: "#111827",
    elevated: "#161F31",
    primary: "#6366F1",
    secondary: "#8B5CF6",
    foreground: "#F9FAFB",
    muted: "#9CA3AF",
    border: "rgba(148, 163, 184, 0.14)",
    soft: "rgba(99, 102, 241, 0.14)",
  },
} as const;

// export type ThemeTokens = (typeof palette)["dark"];
export type ThemeTokens = (typeof palette)[keyof typeof palette];

export const tokensFor = (scheme: Scheme): ThemeTokens => palette[scheme];

export const schemeClass = (scheme: Scheme): string =>
  scheme === "dark" ? "dark" : "";
