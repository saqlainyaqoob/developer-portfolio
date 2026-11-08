import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-line py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-secondary font-display text-[12px] font-bold text-white transition-transform group-hover:scale-105">
            {config.initials}
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight">
            {config.firstName}
            <span className="text-primary">.yaqoob</span>
          </span>
        </a>

        {/* Links */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_var(--primary)] transition-all hover:brightness-110 sm:inline-flex"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
