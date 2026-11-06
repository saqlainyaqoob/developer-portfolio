# Developer Portfolio — React Native App

A production-ready personal developer portfolio as a **cross-platform mobile application**, built with **React Native, Expo, Expo Router, NativeWind (Tailwind CSS), and TypeScript**.

The same design system, content, and identity also power the web showcase at the repository root — both read from centralized data files, so updating your bio, projects, skills, or links happens in one place per platform.

---

## Contents

- [Screens](#screens)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Run on Android / iOS](#run-on-android--ios)
- [Update your content](#update-your-content)
- [Production builds with EAS](#production-builds-with-eas)
- [Production checklist](#production-checklist)
- [Testing & validation performed](#testing--validation-performed)

---

## Screens

| Route                  | Screen            | Description                                                              |
| ---------------------- | ----------------- | ------------------------------------------------------------------------ |
| `/(tabs)/index`        | Home              | Identity, intro, CTAs, featured projects, skills preview, socials        |
| `/(tabs)/about`        | About             | Bio, education, interests, engineering approach, career objectives       |
| `/(tabs)/projects`     | Projects          | Filterable project cards (FlatList) with category chips + empty state    |
| `/(tabs)/skills`       | Skills            | Six categorized skill cards with technology tags                         |
| `/(tabs)/contact`      | Contact           | Email copy action, social links, validated contact form with mailto fallback |
| `/project/[id]`        | Project details   | Dynamic route: overview, problem, features, stack, highlights, links     |
| `/experience`          | Experience        | Timeline separating professional (internship) from project experience    |
| `/settings`            | Settings          | Light / Dark / System theme (persisted), app version, about              |

Navigation model: **bottom tabs + stack screens**, with Android hardware back support and iOS-style slide transitions.

## Tech stack

- **React Native 0.81 + Expo SDK 54** (New Architecture enabled)
- **Expo Router v6** — typed routes, tabs + dynamic stack routes
- **NativeWind v4 (Tailwind CSS 3)** — utility-first styling, class-based dark mode, CSS-variable design tokens
- **React Native Reanimated 4** — enter animations (60fps, UI-thread driven)
- **React Hook Form + Zod** — typed, validated contact form
- **AsyncStorage** — persisted theme preference
- **expo-linking** — externally validated `https:` / `mailto:` links only
- **expo-haptics, expo-clipboard, expo-splash-screen, expo-status-bar, expo-image, expo-linear-gradient**
- **lucide-react-native + react-native-svg** — icon system
- **TypeScript strict mode** — no `any` in the codebase

## Project structure

```
portfolio-mobile/
├── app/                        # Expo Router routes
│   ├── _layout.tsx             # Providers, fonts, splash, root stack
│   ├── (tabs)/                 # Bottom tab navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx           # Home
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   ├── skills.tsx
│   │   └── contact.tsx
│   ├── project/[id].tsx        # Project details (dynamic)
│   ├── experience.tsx
│   └── settings.tsx
├── src/
│   ├── components/             # Reusable UI (Screen, Card, Button, Tag…)
│   ├── data/                   # ✏️ Centralized portfolio content — edit here
│   ├── lib/                    # Link validation, class utils
│   ├── theme/                  # Tokens + ThemeProvider (AsyncStorage)
│   └── types/                  # Shared TypeScript types
├── assets/                     # App icon, adaptive icon, splash, favicon
├── app.json                    # Expo config (Android + iOS)
├── eas.json                    # EAS Build profiles
├── tailwind.config.js          # NativeWind + design tokens
├── global.css                  # CSS variables for light/dark themes
└── .env.example                # Optional public env overrides
```

## Getting started

> **Prerequisite:** Node.js 18+ and npm (or yarn/pnpm). An Expo account is only needed for EAS builds and Expo Go scanning.

```bash
cd portfolio-mobile
npm install
# Align native dependency versions with the installed Expo SDK:
npx expo install --fix
```

## Run on Android / iOS

**Android emulator (priority test target):**

```bash
npm run android
```

**iOS simulator (macOS only):**

```bash
npm run ios
```

**Physical Android device:**

1. Install **Expo Go** from the Play Store.
2. On the same Wi-Fi network, run:

```bash
npx expo start
```

3. Scan the QR code shown in the terminal (or press `a` to open the Android emulator).

**Web preview (Metro):**

```bash
npm run web
```

> After changing `tailwind.config.js`, `global.css`, or babel/metro config, restart with a clean cache:
> `npx expo start --clear`

## Update your content

All content lives in `src/data/` — no screen editing required:

| File                    | What it controls                                        |
| ----------------------- | ------------------------------------------------------- |
| `src/data/config.ts`    | Name, email, location, social URLs, availability, version |
| `src/data/profile.ts`   | Intro, bio, education, interests, approach, objectives  |
| `src/data/projects.ts`  | Projects (features, stack, highlights, links)           |
| `src/data/skills.ts`    | Skill categories and items                              |
| `src/data/experience.ts`| Experience timeline entries                             |

Optional overrides via environment: copy `.env.example` to `.env` and set `EXPO_PUBLIC_CONTACT_EMAIL`, `EXPO_PUBLIC_GITHUB_URL`, `EXPO_PUBLIC_LINKEDIN_URL`.

> **Honesty by design:** project `links` are intentionally unset. Undefined links render as *"not set"* — they are never replaced with invented URLs. Add real URLs when you have them.

## Production builds with EAS

1. Install the CLI and log in:

```bash
npm install -g eas-cli
eas login
```

2. Configure the project (creates the EAS project + fills `extra.eas.projectId`):

```bash
eas init
```

3. Set your unique application identifiers in `app.json`:
   - `expo.android.package` (e.g. `com.yourname.portfolio`)
   - `expo.ios.bundleIdentifier`

4. Build:

```bash
# Android production AAB (Play Store)
eas build --platform android --profile production

# Android APK for direct sharing/testing
eas build --platform android --profile preview

# iOS production IPA (requires Apple Developer account)
eas build --platform ios --profile production
```

5. Submit (optional):

```bash
eas submit --platform android   # Play Console
eas submit --platform ios       # App Store Connect
```

## Production checklist

- ✅ No secrets in the bundle — only `EXPO_PUBLIC_*` public values; see `.env.example`
- ✅ External links validated (https:/mailto: only) before `Linking.openURL`
- ✅ No fake backend — the contact form composes a real email locally
- ✅ Theme preference persisted; splash screen held until fonts + theme load
- ✅ Safe areas, keyboard handling, and Android hardware back respected
- ✅ FlatList-based long lists, Reanimated UI-thread animations
- ✅ Accessibility labels/roles on interactive elements

## Testing & validation performed

- TypeScript strict type-checking of the full source (`npm run typecheck`)
- ESLint via `eslint-config-expo` (`npm run lint`)
- Prettier formatting (`npm run format`)
- Manual navigation testing checklist: tabs, stack push/pop, Android back, theme persistence, filters, form validation states, deep link route `/project/consultflow`
- Android tested via emulator + Expo Go; **iOS verified via simulator only — no physical iOS device testing has been performed**, and no App Store submission has been made. Please validate on real iOS hardware before release.
