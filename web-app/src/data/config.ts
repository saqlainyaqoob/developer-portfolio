/**
 * ──────────────────────────────────────────────────────────────────────
 *  CENTRAL CONFIGURATION — edit this file to personalize the portfolio.
 *  All screens (web showcase + React Native app) read from this source.
 * ──────────────────────────────────────────────────────────────────────
 *  ✏️  UPDATE ME: Replace the placeholder name, email and social URLs
 *      with your real identity. Links are intentionally left as
 *      placeholders — they are never presented as real endpoints.
 */
export const config = {
  /** Your full name */
  name: "Saqlain Yaqoob",
  /** Used in compact headers */
  firstName: "Saqlain",
  /** Monogram initials for the avatar */
  initials: "SY",
  /** Public contact email (used for the mailto: compose fallback) */
  email: "saqlainyakub@gmail.com",
  /** Display location */
  location: "Islamabad, Pakistan",
  /** Availability badge on home / hero */
  availableForWork: true,
  /** Professional social profiles — replace with real URLs */
  socials: {
    github: "https://github.com/saqlainyaqoob",
    linkedin: "https://www.linkedin.com/in/saqlain-yaqoob-2022621a4/",
  },
  /** App version shown on the Settings screen */
  appVersion: "1.0.0",
} as const;

export type Config = typeof config;
