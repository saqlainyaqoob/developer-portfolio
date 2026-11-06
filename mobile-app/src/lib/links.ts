import * as Linking from "expo-linking";

/**
 * Note: Hermes does not ship a full WHATWG `URL` implementation, so URL
 * safety is validated with a strict pattern instead of `new URL()`.
 */
const SAFE_URL_PATTERN =
  /^(https:\/\/[^\s"'<>]+|mailto:[^\s@]+@[^\s@]+\.[^\s@]+)$/i;

/** True when the string is an https: or mailto: URL that is safe to open. */
export function isSafeExternalUrl(url?: string | null): url is string {
  if (!url) return false;
  return SAFE_URL_PATTERN.test(url.trim());
}

/**
 * Opens a validated external URL. Returns false when the URL is missing,
 * unsafe, or cannot be opened — callers can surface honest error states.
 */
export async function openExternalUrl(url: string): Promise<boolean> {
  if (!isSafeExternalUrl(url)) return false;
  try {
    await Linking.openURL(url.trim());
    return true;
  } catch {
    return false;
  }
}

/** Builds a mailto: compose URL — the honest fallback when no backend exists. */
export function buildMailtoUrl(
  to: string,
  subject: string,
  body: string,
): string {
  return `mailto:${to}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
