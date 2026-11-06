/**
 * Minimal class-name joiner for NativeWind.
 * (clsx-style — keeps all classes static-friendly for the compiler.)
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
