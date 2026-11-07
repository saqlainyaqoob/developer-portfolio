import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "@/data/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates that a URL is safe to open externally.
 * Only https: and mailto: schemes are allowed.
 */
export function isSafeExternalUrl(url?: string | null): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "mailto:";
  } catch {
    return false;
  }
}

/** Builds a mailto: compose URL — the honest fallback when no backend exists. */
export function buildMailto(name: string, email: string, message: string) {
  const subject = encodeURIComponent(
    `Portfolio contact from ${name}`,
  );
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  return `mailto:${config.email}?subject=${subject}&body=${body}`;
}
