# Developer Portfolio — Full-Stack Monorepo

A production-oriented, full-stack developer portfolio built as a three-application monorepo. It combines a responsive React web application, a native Android/iOS mobile application built with React Native and Expo, and a dedicated TypeScript backend API powered by PostgreSQL.

The project presents professional experience, technical skills, selected projects, and contact information through both web and mobile experiences, with a centralized backend responsible for contact submissions, persistent storage, and email notifications.

**Repository:** [saqlainyaqoob/developer-portfolio](https://github.com/saqlainyaqoob/developer-portfolio)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Applications](#applications)
  - [Web Application](#1-web-application--web-app)
  - [Mobile Application](#2-mobile-application--mobile-app)
  - [Backend API](#3-backend-api--app-backend)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Working Directories](#working-directories)
- [Environment Configuration](#environment-configuration)
- [Running the Applications](#running-the-applications)
- [Database and Migrations](#database-and-migrations)
- [Email Notification System](#email-notification-system)
- [Production Builds](#production-builds)
- [Deployment](#deployment)
- [Security and Best Practices](#security-and-best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Developer Portfolio is a full-stack software engineering project designed to demonstrate modern web development, cross-platform mobile development, backend engineering, database integration, and production deployment practices.

The repository contains three independently maintained applications:

| Application | Directory | Responsibility |
|---|---|---|
| Web Application | `web-app/` | Responsive developer portfolio website |
| Mobile Application | `mobile-app/` | Native mobile portfolio using React Native and Expo |
| Backend API | `app-backend/` | REST API, contact management, database operations, and email notifications |

All three applications share the same portfolio identity, professional information, project content, and contact workflow.

### Project Goals

- Deliver a professional and responsive portfolio website.
- Provide a dedicated native mobile experience.
- Maintain a centralized backend API.
- Store contact submissions persistently in PostgreSQL.
- Deliver email notifications through Resend.
- Implement reliable notification processing and retry handling.
- Maintain separate development and production configurations.
- Demonstrate practical full-stack and cross-platform engineering skills.

---

## Architecture

The project follows a separated frontend/backend architecture.

```text
                    DEVELOPER PORTFOLIO
                            |
               +------------+------------+
               |            |            |
               v            v            v
          WEB APP       MOBILE APP    BACKEND API
         React/Vite     React Native   Node.js/
                         + Expo        TypeScript
               |            |            |
               |            |            |
               +------------+------------+
                            |
                       HTTP / REST API
                            |
                            v
                    BACKEND SERVICES
                            |
                 +----------+----------+
                 |                     |
                 v                     v
            PostgreSQL              Resend
              (Neon)             Email Service
                 |                     |
                 v                     v
          Contact Messages       Email Notifications
                 |
                 v
          Notification Worker
                 |
                 v
          Retry Processing
```

### Architectural Responsibilities

**Frontend applications**
- Render portfolio content and user interfaces.
- Handle navigation and user interactions.
- Submit contact form data to the backend.
- Consume backend API responses.

**Backend application**
- Expose HTTP REST API endpoints.
- Validate incoming contact form requests.
- Handle application and database operations.
- Persist contact messages in PostgreSQL.
- Process email notification requests.
- Handle notification retries and failures.

**Database**
- Store submitted contact messages.
- Maintain notification delivery and retry information.
- Preserve application data independently of frontend deployments.

**Email provider**
- Resend handles transactional email delivery and contact notifications.

---

## Applications

### 1. Web Application — `web-app/`

A responsive developer portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

The website includes a professional portfolio presentation and an interactive smartphone-style interface that showcases the companion mobile experience.

#### Features

- Responsive portfolio landing page.
- Professional introduction and profile.
- About section.
- Technical skills and technology stack.
- Professional experience timeline.
- Projects portfolio and project details.
- Interactive smartphone portfolio preview.
- Dedicated mobile app showcase section.
- Contact form connected to the backend API.
- Social media and professional profile links.
- Animated UI interactions.
- Responsive navigation and layouts.

#### Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI |
| TypeScript | Static typing |
| Vite 7 | Development server and production bundler |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | UI animations |
| React Hook Form | Form management |
| Zod | Schema validation |
| Lucide React | Interface icons |

#### Working Directory

```bash
cd web-app
```

#### Development

```bash
npm install
npm run dev
```

#### Production Build

```bash
npm run build
```

#### Preview Production Build

```bash
npm run preview
```

The production build is generated in:

```text
web-app/dist/
```

---

### 2. Mobile Application — `mobile-app/`

A cross-platform mobile portfolio application developed using React Native and Expo.

The application provides a dedicated mobile experience with native navigation, reusable components, theme customization, and Android production builds.

#### Features

- Native mobile portfolio interface.
- File-based navigation using Expo Router.
- Tab-based navigation.
- Home and profile screens.
- About section.
- Skills and technologies.
- Professional experience timeline.
- Projects listing.
- Individual project details.
- Contact screen and contact form.
- Social media integration.
- Light and dark theme support.
- System theme preference support.
- Persistent theme preferences.
- Custom typography and reusable UI components.
- Native Android application packaging.

#### Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI |
| React Native 0.81 | Native mobile development |
| Expo SDK 58 | Mobile development platform |
| Expo Router 6 | File-based navigation |
| TypeScript | Static typing |
| NativeWind 4 | Tailwind-style React Native styling |
| Lucide React Native | Icons |
| AsyncStorage | Local persistent storage |
| Expo Clipboard | Clipboard functionality |
| React Native Reanimated | Native UI animations |
| Google Fonts via Expo | Application typography |

#### Android Application Details

| Property | Value |
|---|---|
| Application Name | Developer Portfolio |
| Android Package ID | `com.saqlainyaqoob.portfolio` |
| Platform | Android |
| Framework | React Native / Expo |
| Build System | Gradle |

#### Working Directory

```bash
cd mobile-app
```

#### Install Dependencies

```bash
npm install
```

#### Start Expo Development Server

```bash
npx expo start
```

#### Run on Android

```bash
npm run android
```

#### Run on iOS

```bash
npm run ios
```

An appropriate macOS/Xcode environment is required for local native iOS builds.

#### Run on Web

```bash
npm run web
```

#### Code Quality

```bash
npm run lint
```

```bash
npm run typecheck
```

#### Format Code

```bash
npm run format
```

#### Android Release Build

For a locally generated Android release APK:

```bash
cd android
./gradlew assembleRelease
```

The generated APK is located at:

```text
mobile-app/android/app/build/outputs/apk/release/app-release.apk
```

For future production releases, use a properly configured Android release signing key. Never commit private signing credentials or keystores to Git.

---

### 3. Backend API — `app-backend/`

A dedicated backend service built with Node.js and TypeScript.

It provides the API layer shared by the web and mobile applications and manages contact submissions, PostgreSQL persistence, and email notification processing.

#### Features

- RESTful API architecture.
- Contact form submission endpoint.
- Request validation.
- Centralized error handling.
- PostgreSQL database integration.
- Neon PostgreSQL hosting support.
- Persistent contact message storage.
- Resend email integration.
- Notification processing.
- Background notification worker.
- Email retry handling.
- Notification eligibility management.
- Database migration support.
- Environment-based configuration.
- Separate source and compiled production output.

#### Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| TypeScript | Backend development |
| Express | HTTP server and API routing |
| PostgreSQL | Relational database |
| Neon | Managed PostgreSQL hosting |
| Resend | Transactional email delivery |
| SQL | Database queries and migrations |
| npm | Dependency management |

#### Backend Architecture

The backend follows a modular structure:

| Directory | Responsibility |
|---|---|
| `src/config/` | Database and environment configuration |
| `src/controllers/` | HTTP request handling |
| `src/middleware/` | Error handling and middleware |
| `src/routes/` | API route definitions |
| `src/scripts/` | Operational scripts |
| `src/services/` | Business logic and external services |
| `src/validators/` | Request validation |
| `src/workers/` | Notification processing |
| `db/migrations/` | Database schema migrations |
| `dist/` | Compiled JavaScript output |

#### Working Directory

```bash
cd app-backend
```

#### Install Dependencies

```bash
npm install
```

#### Development Server

```bash
npm run dev
```

#### Compile TypeScript

```bash
npm run build
```

#### Start Production Server

```bash
npm start
```

> Backend commands should match the scripts defined in `app-backend/package.json`. Run `npm run` inside `app-backend/` to inspect the available scripts if your local script names differ.

---

## Technology Stack

The following table summarizes the principal technologies used across the entire monorepo.

| Layer | Technologies |
|---|---|
| Web Frontend | React, TypeScript, Vite |
| Web Styling | Tailwind CSS |
| Web Animation | Framer Motion |
| Web Forms | React Hook Form, Zod |
| Mobile Framework | React Native, Expo |
| Mobile Navigation | Expo Router |
| Mobile Styling | NativeWind |
| Mobile Storage | AsyncStorage |
| Backend Runtime | Node.js |
| Backend Language | TypeScript |
| Backend Framework | Express |
| API Architecture | REST |
| Database | PostgreSQL |
| Database Hosting | Neon |
| Email Service | Resend |
| Database Migrations | SQL |
| Mobile Build System | Gradle |
| Web Deployment | Vercel |
| Version Control | Git, GitHub |

---

## Key Features

### Unified Portfolio Experience

The web and mobile applications present the same professional identity, including:

- Personal introduction.
- Technical skills.
- Professional experience.
- Selected software projects.
- Contact information.
- Professional social links.

### Cross-Platform Development

The portfolio is available through two distinct interfaces:

- A responsive web application.
- A native mobile application built with React Native and Expo.

### Centralized Contact Management

Both frontend applications use the backend API for contact form submissions.

The backend handles:

1. Incoming HTTP requests.
2. Request validation.
3. Database persistence.
4. Email notification processing.
5. Notification retry handling.

### Reliable Email Notifications

The backend includes notification processing and retry functionality to help handle temporary email delivery failures.

### Persistent Database Storage

Contact submissions are stored in PostgreSQL rather than relying exclusively on client-side state or email delivery.

---

## Project Structure

The following is a simplified, GitHub-friendly representation of the repository. Generated build output, dependencies, caches, local secrets, and backup files are intentionally excluded.

```text
developer-portfolio/
│
├── app-backend/
│   ├── db/
│   │   └── migrations/
│   │       ├── 000_create_contact_messages.sql
│   │       ├── 001_add_email_retry_fields.sql
│   │       └── 002_add_notification_worker_eligibility.sql
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── workers/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── web-app/
│   ├── assets/
│   ├── src/
│   │   ├── components/
│   │   │   ├── phone/
│   │   │   │   ├── screens/
│   │   │   │   ├── PhoneApp.tsx
│   │   │   │   ├── PhoneContext.tsx
│   │   │   │   ├── PhoneFrame.tsx
│   │   │   │   └── PhoneTabBar.tsx
│   │   │   │
│   │   │   └── site/
│   │   │       ├── AboutSection.tsx
│   │   │       ├── ContactSection.tsx
│   │   │       ├── ExperienceSection.tsx
│   │   │       ├── Hero.tsx
│   │   │       ├── ProjectsSection.tsx
│   │   │       ├── SkillsSection.tsx
│   │   │       └── Navbar.tsx
│   │   │
│   │   ├── data/
│   │   ├── lib/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── mobile-app/
│   ├── android/
│   │   ├── app/
│   │   ├── gradle/
│   │   ├── build.gradle
│   │   ├── gradle.properties
│   │   ├── gradlew
│   │   └── settings.gradle
│   │
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── about.tsx
│   │   │   ├── contact.tsx
│   │   │   ├── index.tsx
│   │   │   ├── projects.tsx
│   │   │   └── skills.tsx
│   │   ├── project/
│   │   │   └── [id].tsx
│   │   ├── experience.tsx
│   │   ├── settings.tsx
│   │   └── _layout.tsx
│   │
│   ├── assets/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── lib/
│   │   ├── theme/
│   │   └── types/
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── app.json
│   ├── eas.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── .gitignore
└── README.md
```

**Note:** `dist/`, `node_modules/`, `.expo/`, `.gradle/`, generated Android build output, local environment files, and backup archives are not part of the documented source structure.

---

## Prerequisites

Install the following tools before setting up the project.

| Tool | Purpose |
|---|---|
| Git | Version control |
| Node.js | JavaScript and TypeScript runtime |
| npm | Package management |
| PostgreSQL | Database connectivity and migration tooling |
| Android Studio | Android SDK and native builds |
| Java JDK | Android Gradle builds |
| Expo Go | Mobile development testing |
| VS Code | Recommended code editor |

For Android development, configure the Android SDK, Java environment, and ADB.

For iOS native builds, use macOS with Xcode.

Check your installed versions:

```bash
node --version
npm --version
git --version
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/saqlainyaqoob/developer-portfolio.git
```

### 2. Navigate to the Root Directory

```bash
cd developer-portfolio
```

### 3. Install Dependencies Separately

This repository maintains independent dependencies for each application.

Install backend dependencies:

```bash
cd app-backend
npm install
```

Install web dependencies:

```bash
cd ../web-app
npm install
```

Install mobile dependencies:

```bash
cd ../mobile-app
npm install
```

Return to the root:

```bash
cd ..
```

Each application has its own `package.json` and `package-lock.json`.

---

## Working Directories

The repository contains three independent working directories.

Use the following commands whenever you need to work on a specific application.

### Backend

```bash
cd app-backend
```

Use this directory for:

- API development.
- Database integration.
- Contact management.
- Email services.
- Notification workers.
- Backend testing and deployment.

### Web Application

```bash
cd web-app
```

Use this directory for:

- React components.
- Portfolio sections.
- Website styling.
- Animations.
- Responsive layouts.
- Web API integration.
- Vercel deployment.

### Mobile Application

```bash
cd mobile-app
```

Use this directory for:

- React Native components.
- Expo Router screens.
- Mobile navigation.
- Theme management.
- Native Android development.
- Mobile API integration.
- Android release builds.

---

## Environment Configuration

Each application has its own environment configuration.

Never commit actual `.env` files, API keys, database credentials, or private signing credentials.

### Backend Environment

Navigate to:

```bash
cd app-backend
```

Create your local environment file:

```bash
cp .env.example .env
```

Configure the required backend settings using the variable names defined in `.env.example`.

Typical configuration includes:

| Configuration | Purpose |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Runtime environment |
| `DATABASE_URL` | PostgreSQL connection string |
| `RESEND_API_KEY` | Resend API authentication |
| Email sender configuration | Notification sender identity |
| CORS configuration | Allowed frontend origins |

Use your actual Neon PostgreSQL connection string for production database connectivity.

### Web Environment

Navigate to:

```bash
cd web-app
```

Create the local environment file:

```bash
cp .env.example .env
```

Configure the frontend API URL and any other variables required by the web application.

Vite exposes client-side environment variables through the appropriate `VITE_` prefix. Never place private API keys or database credentials in frontend environment variables.

### Mobile Environment

Navigate to:

```bash
cd mobile-app
```

Create the local environment file:

```bash
cp .env.example .env
```

Configure the application variables.

The mobile application uses Expo public environment variables, including:

| Variable | Purpose |
|---|---|
| `EXPO_PUBLIC_API_URL` | Backend API base URL |
| `EXPO_PUBLIC_CONTACT_EMAIL` | Portfolio contact email |
| `EXPO_PUBLIC_GITHUB_URL` | GitHub profile |
| `EXPO_PUBLIC_LINKEDIN_URL` | LinkedIn profile |

**Important:** Expo public variables are bundled into the application and must never contain secrets.

After changing environment variables, restart the relevant development server.

---

## Running the Applications

The three applications can run independently during development.

Open separate terminal windows from the repository root.

**Terminal 1 — Backend**

```bash
cd app-backend
npm run dev
```

**Terminal 2 — Web Application**

```bash
cd web-app
npm run dev
```

**Terminal 3 — Mobile Application**

```bash
cd mobile-app
npx expo start
```

The web and mobile applications must be configured with the correct backend API URL.

For Android physical-device testing, use an API address reachable from your phone. A localhost URL on your development computer does not automatically refer to that computer from the phone.

---

## Database and Migrations

The backend uses PostgreSQL for persistent contact message storage.

The production database is hosted using Neon.

Database migrations are maintained in:

```text
app-backend/db/migrations/
```

### Available Migrations

| Migration | Description |
|---|---|
| `000_create_contact_messages.sql` | Creates the contact message database structure |
| `001_add_email_retry_fields.sql` | Adds email notification retry fields |
| `002_add_notification_worker_eligibility.sql` | Adds notification worker eligibility support |

### Connecting to Neon

1. Create or access your Neon project.
2. Obtain the PostgreSQL connection string.
3. Add the connection string to the backend environment file.
4. Ensure the production backend can connect to the database.
5. Apply database migrations in the correct numerical order.

If using `psql`, migrations can be applied individually:

```bash
cd app-backend

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 \
  -f db/migrations/000_create_contact_messages.sql

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 \
  -f db/migrations/001_add_email_retry_fields.sql

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 \
  -f db/migrations/002_add_notification_worker_eligibility.sql
```

Run each migration only once against a database unless the migration has explicitly been designed for safe re-execution. For production, use a controlled migration process and retain database backups.

---

## Email Notification System

The backend integrates with Resend for email notifications.

The notification workflow is designed to separate contact message persistence from email delivery.

### Notification Workflow

1. A visitor submits the contact form.
2. The frontend sends the request to the backend.
3. The backend validates the submitted information.
4. The contact message is saved in PostgreSQL.
5. The notification processing system handles email delivery.
6. Failed notifications can be retried.
7. Notification eligibility and retry information are maintained in the database.

### Resend Configuration

1. Create a Resend account.
2. Configure and verify an appropriate sender domain or sender identity.
3. Generate an API key.
4. Add the key to the backend environment configuration.
5. Configure the sender email address.
6. Test notification delivery before production deployment.

Keep the Resend API key exclusively on the backend.

The backend also includes operational scripts for email testing and notification retry processing.

---

## Production Builds

### Web Application

From the web application directory:

```bash
cd web-app
npm ci
npm run build
```

Output:

```text
web-app/dist/
```

### Mobile Application

From the mobile application directory:

```bash
cd mobile-app
npm ci
```

Generate an Android release APK:

```bash
cd android
./gradlew assembleRelease
```

Output:

```text
android/app/build/outputs/apk/release/app-release.apk
```

For distribution, use a secure release signing configuration and retain your signing credentials outside the repository.

### Backend Application

From the backend directory:

```bash
cd app-backend
npm ci
npm run build
npm start
```

The TypeScript source is compiled into the `dist/` directory for production execution.

Make sure production environment variables and database migrations are configured before starting the backend.

---

## Deployment

The three applications are deployed and maintained independently.

### Web Deployment — Vercel

The web application is configured for Vercel deployment.

| Setting | Value |
|---|---|
| Framework | Vite |
| Root Directory | `web-app` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Production Branch | `main` |

The Vercel project should use the `web-app` directory as its root rather than the monorepo root.

Configure the production API URL in the web application's environment variables.

### Backend Deployment

The backend is designed to run as an independently deployed Node.js service.

Production requirements:

- Node.js runtime.
- Production environment variables.
- Neon PostgreSQL connection.
- Resend API configuration.
- Database migrations applied.
- Correct CORS configuration.
- Persistent notification processing.
- Proper logging and error handling.

The backend must be deployed before the production web and mobile applications can successfully use its API.

### Mobile Distribution

The mobile application supports Android production packaging.

Android APKs can be generated locally using Gradle.

For store distribution, configure release signing and follow the relevant Google Play requirements.

---

## Security and Best Practices

Security and maintainability are important considerations throughout the project.

### Environment Variables

- Never commit `.env` files.
- Keep `.env.example` files free of real credentials.
- Never expose PostgreSQL connection strings in frontend code.
- Never expose Resend API keys in web or mobile applications.
- Keep signing keys outside version control.

### Backend Security

- Validate all incoming API requests.
- Use centralized error handling.
- Restrict CORS to trusted production origins.
- Use parameterized SQL queries.
- Avoid exposing internal database errors to clients.
- Use HTTPS in production.
- Protect operational scripts and notification processing.

### Database Security

- Use secure PostgreSQL connection strings.
- Restrict database credentials to the required permissions.
- Keep production and development database configurations separate.
- Back up production data.
- Apply migrations through a controlled process.

### Git Hygiene

Do not commit:

```text
.env
.env.production
node_modules/
dist/
.expo/
.gradle/
android/app/build/
*.keystore
*.jks
*.apk
*.aab
*.dump
*.tar.gz
*.backup
```

Review the repository's `.gitignore` files before committing changes.

---

## Troubleshooting

### Backend Cannot Connect to PostgreSQL

- Verify the Neon connection string.
- Check the database credentials.
- Confirm the database is available.
- Check network connectivity.
- Verify that the required migrations have been applied.

### Contact Form Submission Fails

- Verify that the backend is running.
- Check the frontend API URL.
- Inspect browser developer tools.
- Inspect backend logs.
- Verify request validation and CORS configuration.

### Email Notifications Are Not Delivered

- Verify the Resend API key.
- Check sender identity verification.
- Confirm email sender configuration.
- Inspect backend notification processing logs.
- Check notification retry information in PostgreSQL.

### Mobile Application Cannot Reach the Backend

- Verify `EXPO_PUBLIC_API_URL`.
- Ensure the backend is accessible from the mobile device.
- Avoid using computer-only localhost addresses on physical devices.
- Restart Expo after changing environment variables.

### Android Build Fails

- Verify Java and Android SDK configuration.
- Check Gradle dependencies.
- Ensure the correct Android SDK platform is installed.
- Review Gradle build output.
- Verify release signing configuration.

### Web Production Build Fails

```bash
cd web-app
npm ci
npm run build
```

Check TypeScript errors, dependency compatibility, and missing environment configuration.

---

## Contributing

Contributions, suggestions, and improvements are welcome.

### Development Guidelines

1. Keep frontend, mobile, and backend responsibilities separated.
2. Follow existing TypeScript conventions.
3. Prefer reusable components.
4. Validate incoming backend requests.
5. Keep environment variables out of source control.
6. Test changes before submitting commits.
7. Keep documentation synchronized with application changes.

### Commit Message Examples

```text
feat: add mobile project details screen
fix: resolve home screen text wrapping
feat: implement contact notification retry
refactor: improve portfolio component structure
docs: update project documentation
```

### Git Workflow

```bash
git checkout -b feature/your-feature-name
```

After implementing and testing your changes:

```bash
git add .
git commit -m "feat: describe your changes"
git push origin feature/your-feature-name
```

Create a pull request against the `main` branch.

---

## License

This repository is maintained as a personal developer portfolio project.

Unless a separate license file is added, all rights are reserved by the repository owner. No permission to redistribute or commercially reuse the source code is granted by default.

---

## Author

**Saqlain Yaqoob**

Computer Science Graduate | Full-Stack Developer | React Native Developer

Interested in building scalable web applications, cross-platform mobile experiences, backend APIs, database-driven systems, and modern software solutions.

### Professional Links

- 💻 **GitHub:** [@saqlainyaqoob](https://github.com/saqlainyaqoob)
- 💼 **LinkedIn:** https://www.linkedin.com/in/saqlain-yaqoob-2022621a4/
- 📧 **Email:** saqlainyakub@gmail.com
- 🌐 **Portfolio:** https://saqlainyaqoob.vercel.app/

---
