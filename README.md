# Synoflow

<div align="center">

**A modern project management and team collaboration platform**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

## Project Overview

**Synoflow** is a complete project management and team workspace web application. It brings organizations, teams, projects, sprints, and tasks together in a centralized workspace. Users can plan work, manage members, coordinate tasks, and track project activity.

This repository contains the Next.js frontend. The backend API is maintained as a separate Express and Prisma project.

## Main Features

- **Authentication:** Email/password sign-in, Google OAuth, account verification, and password reset
- **Organization management:** Create organizations, invite members, and manage memberships
- **Team collaboration:** Teams, team members, and organization-level activity
- **Project workspace:** Project backlogs, labels, project details, and due dates
- **Sprint planning:** Create sprints, add work from the backlog, and track sprint activity
- **Task management:** Task priority, status, assignment, and contextual comments
- **Role-based dashboards:** Separate interfaces for users, admins, and super admins
- **Admin tools:** User management, organizations, payments, subscriptions, and audit logs
- **User profile:** Update profiles, upload avatars, and change passwords
- **Billing and subscriptions:** Pricing plans, payment flow, and subscription management
- **Contact system:** Contact and FAQ pages with support request submission through the API
- **Modern UI:** Responsive layout, dark and light themes, and a mobile-friendly sidebar

## Technologies

| Category | Technology |
|---|---|
| Framework | Next.js 16 |
| UI library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, shadcn/ui, Base UI |
| State and data | TanStack Query, TanStack Form |
| API client | Ofetch |
| Validation | Zod |
| Authentication UI | Google OAuth |
| Icons | Lucide React |
| Code quality | Biome |
| Package manager | Bun |

## Dependencies

### Runtime dependencies

| Package | Purpose |
|---|---|
| `next`, `react`, `react-dom` | Next.js application and UI runtime |
| `@tanstack/react-query` | Server state, caching, and API synchronization |
| `@tanstack/react-form` | Form state and handling |
| `@tanstack/react-virtual` | Virtualized rendering for large lists |
| `@react-oauth/google` | Google sign-in integration |
| `@base-ui/react`, `shadcn` | Accessible UI primitives and component system |
| `tailwindcss`, `tw-animate-css` | Styling and animation |
| `lucide-react` | Icon library |
| `ofetch` | API request client |
| `zod` | Schema and input validation |
| `input-otp` | OTP and verification input |
| `class-variance-authority`, `cn` | Component variants and class-name utilities |

### Development dependencies

- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@biomejs/biome`
- `@tailwindcss/postcss`
- `babel-plugin-react-compiler`

The backend uses Express 5, Prisma, PostgreSQL, and Redis in a separate repository.

## Running Locally

### Prerequisites

- [Bun](https://bun.sh/) **1.4.2 or compatible**
- Node.js **20 or later**
- A running Synoflow backend API
- PostgreSQL and Redis for the backend

### 1. Clone the repository

```bash
git clone https://github.com/Hridoy004/synoflow-web.git
cd synoflow-web
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Optional: Demo autofill on the login page
NEXT_PUBLIC_DEMO_EMAIL=demo@example.com
NEXT_PUBLIC_DEMO_PASSWORD=your_demo_password
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL; it must end with `/api/v1` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth 2.0 web client ID |
| `NEXT_PUBLIC_DEMO_EMAIL` | Optional email used for demo login autofill |
| `NEXT_PUBLIC_DEMO_PASSWORD` | Optional password used for demo login autofill |

> Environment variables prefixed with `NEXT_PUBLIC` are exposed in the browser bundle. Do not use demo credentials or Google credentials as production secrets. Keep sensitive backend credentials in server-side environment variables.

### 4. Start the backend API

Start the backend API before starting the frontend. Ensure that PostgreSQL and Redis are running for the backend.

The backend default URL in `.env.local` is:

```text
http://localhost:5000/api/v1
```

Configure the backend to allow the frontend origin and credentialed API requests.

### 5. Start the development server

```bash
bun run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

### Production build

```bash
bun run build
bun run start
```

### Lint and format

```bash
bun run lint
bun run format
```

## Screenshots

> To add screenshots of the updated UI, place the images in a `docs/screenshots/` folder and display them in this section.

<!--
<img src="./docs/screenshots/homepage.png" alt="Synoflow homepage" width="800">
<img src="./docs/screenshots/dashboard.png" alt="Synoflow dashboard" width="800">
-->

## Links

- **Live website:** No live deployment has been confirmed from this workspace
- **GitHub repository:** [Hridoy004/synoflow-web](https://github.com/Hridoy004/synoflow-web)
- **Next.js documentation:** [nextjs.org/docs](https://nextjs.org/docs)
- **TanStack Query:** [tanstack.com/query](https://tanstack.com/query/latest)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui:** [ui.shadcn.com](https://ui.shadcn.com/)

## Deployment

The frontend should be deployed as a Next.js Node.js server. It is not configured as a static export.

1. Set `NEXT_PUBLIC_API_BASE_URL` in the frontend hosting environment.
2. The API URL must include the `/api/v1` suffix.
3. Deploy the backend with production PostgreSQL, Redis, and the required OAuth, mail, payment, and image configuration.
4. Configure frontend and API CORS or allowed-origin settings for the production domains.
5. Use HTTPS in production.
6. Run the frontend and backend as two separate deployments.
