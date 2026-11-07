import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BatteryMedium, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneContext, type StackRoute, type TabKey, type ThemePref } from "./PhoneContext";
import { PhoneTabBar } from "./PhoneTabBar";
import { HomeScreen } from "./screens/HomeScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { ProjectsScreen } from "./screens/ProjectsScreen";
import { ProjectDetailScreen } from "./screens/ProjectDetailScreen";
import { SkillsScreen } from "./screens/SkillsScreen";
import { ContactScreen } from "./screens/ContactScreen";
import { ExperienceScreen } from "./screens/ExperienceScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

const THEME_STORAGE_KEY = "pf-theme";

function TabScreen({ tab }: { tab: TabKey }) {
  switch (tab) {
    case "home":
      return <HomeScreen />;
    case "about":
      return <AboutScreen />;
    case "projects":
      return <ProjectsScreen />;
    case "skills":
      return <SkillsScreen />;
    case "contact":
      return <ContactScreen />;
  }
}

function StackScreen({ route }: { route: StackRoute }) {
  switch (route.name) {
    case "project":
      return <ProjectDetailScreen id={route.id} />;
    case "experience":
      return <ExperienceScreen />;
    case "settings":
      return <SettingsScreen />;
  }
}

/**
 * The interactive simulation of the React Native app:
 * tab navigation + stack navigation + persisted theme,
 * mirroring the Expo Router implementation one-to-one.
 */
export function PhoneApp() {
  const [tab, setTab] = useState<TabKey>("home");
  const [stack, setStack] = useState<StackRoute | null>(null);
  const [pref, setPref] = useState<ThemePref>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "dark";
    } catch {
      return "dark";
    }
  });
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, pref);
    } catch {
      /* storage unavailable — theme stays for this session */
    }
  }, [pref]);

  const theme: "light" | "dark" =
    pref === "system" ? (systemDark ? "dark" : "light") : pref;

  const direction = useRef(1);
  const navigate = useCallback((next: TabKey) => {
    direction.current = 1;
    setStack(null);
    setTab(next);
  }, []);
  const push = useCallback((route: StackRoute) => {
    direction.current = 1;
    setStack(route);
  }, []);
  const pop = useCallback(() => {
    direction.current = -1;
    setStack(null);
  }, []);

  const routeKey = stack
    ? `s:${stack.name}:${stack.name === "project" ? stack.id : ""}`
    : `t:${tab}`;

  return (
    <PhoneContext.Provider
      value={{ tab, stack, theme, pref, setPref, navigate, push, pop }}
    >
      <div
        className={cn(
          "flex h-full flex-col bg-background text-foreground",
          theme === "dark" && "dark",
        )}
      >
        {/* Status bar */}
        <div className="relative z-20 flex h-11 shrink-0 items-center justify-between px-7">
          <span className="text-[12px] font-semibold tracking-wide">9:41</span>
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2 h-[21px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center gap-1.5">
            <Signal size={12} strokeWidth={2.4} />
            <Wifi size={12} strokeWidth={2.4} />
            <BatteryMedium size={15} strokeWidth={2} />
          </div>
        </div>

        {/* Screen stack */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={routeKey}
              initial={{ opacity: 0, x: 26 * direction.current }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -26 * direction.current }}
              transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              {stack ? <StackScreen route={stack} /> : <TabScreen tab={tab} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab bar (hidden on stack screens, like a native stack push) */}
        {!stack && <PhoneTabBar />}

        {/* Home indicator */}
        <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full bg-foreground/25" />
      </div>
    </PhoneContext.Provider>
  );
}
