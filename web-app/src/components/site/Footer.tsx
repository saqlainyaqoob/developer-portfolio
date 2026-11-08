import { config } from "@/data/config";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#app", label: "The App" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-display text-[13px] font-bold text-white">
              {config.initials}
            </span>
            <div>
              <p className="font-display text-[14px] font-bold">
                {config.name}
              </p>
              <p className="text-[11px] text-muted">
                Full-Stack · Software Engineer · React Native
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12.5px] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-1">
            <a
              href={`mailto:${config.email}`}
              aria-label="Send email"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-foreground"
            >
              <Mail size={16} />
            </a>
            <span className="px-1 text-muted" title="Placeholder — configure in src/data/config.ts">
              <GithubIcon size={16} className="opacity-60" />
            </span>
            <span className="px-1 text-muted" title="Placeholder — configure in src/data/config.ts">
              <LinkedinIcon size={16} className="opacity-60" />
            </span>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center">
          <p className="text-[11.5px] leading-relaxed text-muted/80">
            © {new Date().getFullYear()} {config.name} · Portfolio presented as
            an interactive web preview of a React Native + Expo application.
          </p>
        </div>
      </div>
    </footer>
  );
}
