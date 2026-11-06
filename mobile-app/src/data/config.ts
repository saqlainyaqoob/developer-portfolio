/**
 * ──────────────────────────────────────────────────────────────────────
 *  CENTRAL CONFIGURATION — edit this file to personalize the app.
 * ──────────────────────────────────────────────────────────────────────
 *  ✏️  UPDATE ME: Replace the placeholder name, email and social URLs
 *      with your real identity. Values can also be overridden with
 *      EXPO_PUBLIC_* environment variables (see .env.example).
 *
 *  SECURITY: Only non-secret, public values belong here or in
 *  EXPO_PUBLIC_* variables — they are embedded in the app bundle.
 *  Never place API keys, tokens, or passwords in this file.
 */
export const config = {
  /** Your full name */
  name: "Saqlain Yaqoob",
  /** Used in compact headers */
  firstName: "Saqlain",
  /** Monogram initials for the avatar */
  initials: "SY",
  /** Public contact email (used for the mailto: compose fallback) */
  email: process.env.EXPO_PUBLIC_CONTACT_EMAIL ?? "your.email@example.com",
  /** Public portfolio backend API URL */
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "",
  /** Display location */
  location: "Islamabad, Pakistan",
  /** Availability badge on the home screen */
  availableForWork: true,
  /** Professional social profiles — replace with real URLs */
  socials: {
    github:
      process.env.EXPO_PUBLIC_GITHUB_URL ?? "https://github.com/yourusername",
    linkedin:
      process.env.EXPO_PUBLIC_LINKEDIN_URL ??
      "https://www.linkedin.com/in/yourusername",
  },
  /** App version shown on the Settings screen */
  appVersion: "1.0.0",
} as const;
