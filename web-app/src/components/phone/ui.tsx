import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Server, ShoppingCart } from "lucide-react";
import type { ProjectIcon } from "@/data/projects";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";

/** Scrollable page container for a phone screen */
export function PPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("h-full overflow-y-auto no-scrollbar", className)}>
      {children}
    </div>
  );
}

/** Sticky page header with optional back button */
export function PHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-surface/90 px-5 py-3 backdrop-blur-md">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-elevated text-muted transition-colors hover:text-foreground"
        >
          <Chevron />
        </button>
      )}
      <div className="min-w-0">
        <p className="truncate font-display text-[15px] font-semibold leading-tight">
          {title}
        </p>
        {subtitle && (
          <p className="truncate text-[11px] text-muted">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

/** Section label with optional trailing action */
export function PSection({
  label,
  action,
  children,
  className,
}: {
  label: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-5", className)}>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PCard({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border border-line bg-surface p-4 text-left transition-colors",
        onClick && "cursor-pointer hover:border-primary/40",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export function PTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-elevated px-2.5 py-1 text-[11px] font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PButton({
  children,
  onClick,
  variant = "primary",
  icon,
  className,
  ariaLabel,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}) {
  const styles = {
    primary:
      "bg-primary text-white shadow-[0_8px_24px_-8px_var(--primary)] hover:brightness-110",
    secondary:
      "border border-line bg-elevated text-foreground hover:border-primary/50",
    ghost: "text-muted hover:text-foreground",
  } as const;
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all active:scale-[0.97]",
        styles[variant],
        className,
      )}
    >
      {icon}
      {children}
    </button>
  );
}

/** Gradient monogram avatar */
export function Monogram({ size = 44 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary font-display font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      aria-label={`${config.name} avatar`}
    >
      {config.initials}
    </div>
  );
}

const GLYPHS = {
  briefcase: Briefcase,
  cart: ShoppingCart,
  server: Server,
} as const;

export function ProjectGlyph({
  icon,
  accent,
  size = 40,
}: {
  icon: ProjectIcon;
  accent: string;
  size?: number;
}) {
  const Icon = GLYPHS[icon];
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl"
      style={{
        width: size,
        height: size,
        backgroundColor: `${accent}22`,
        color: accent,
      }}
    >
      <Icon size={size * 0.5} strokeWidth={1.8} />
    </div>
  );
}

/** Transient toast note, sticky near the bottom of a screen */
export function PToast({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="pointer-events-none sticky bottom-4 z-30 mx-auto w-[88%] rounded-xl border border-line bg-elevated px-4 py-2.5 text-center text-[11px] font-medium text-muted shadow-xl"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
