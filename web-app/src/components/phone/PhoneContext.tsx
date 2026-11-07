import { createContext, useContext } from "react";

export type TabKey = "home" | "about" | "projects" | "skills" | "contact";
export type ThemePref = "light" | "dark" | "system";

export type StackRoute =
  | { name: "project"; id: string }
  | { name: "experience" }
  | { name: "settings" };

export interface PhoneNav {
  tab: TabKey;
  stack: StackRoute | null;
  theme: "light" | "dark";
  pref: ThemePref;
  setPref: (pref: ThemePref) => void;
  navigate: (tab: TabKey) => void;
  push: (route: StackRoute) => void;
  pop: () => void;
}

export const PhoneContext = createContext<PhoneNav | null>(null);

export function usePhone(): PhoneNav {
  const ctx = useContext(PhoneContext);
  if (!ctx) throw new Error("usePhone must be used within PhoneApp");
  return ctx;
}

const TAB_LABELS: Record<TabKey, string> = {
  home: "Home",
  about: "About",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
};

export const tabLabel = (tab: TabKey) => TAB_LABELS[tab];
