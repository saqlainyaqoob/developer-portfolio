import { Code2, FolderGit2, Home, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePhone, type TabKey } from "./PhoneContext";

const TABS: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "about", label: "About", icon: User },
  { key: "projects", label: "Projects", icon: FolderGit2 },
  { key: "skills", label: "Skills", icon: Code2 },
  { key: "contact", label: "Contact", icon: Mail },
];

export function PhoneTabBar() {
  const { tab, navigate } = usePhone();

  return (
    <nav
      aria-label="App tabs"
      className="relative z-20 flex h-[62px] shrink-0 items-stretch border-t border-line bg-surface/95 backdrop-blur-md"
    >
      {TABS.map(({ key, label, icon: Icon }) => {
        const active = tab === key;
        return (
          <button
            key={key}
            onClick={() => navigate(key)}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex flex-1 flex-col items-center justify-center gap-[3px] transition-colors",
              active ? "text-primary" : "text-muted hover:text-foreground",
            )}
          >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            <span className="text-[10px] font-medium leading-none">{label}</span>
            {active && (
              <span className="absolute bottom-[7px] h-1 w-1 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
