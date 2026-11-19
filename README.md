# Synoflow

Synoflow is a project-management platform for organizing work across
organizations, teams, projects, sprints, and tasks. This repository contains
the Next.js web application. The Express and Prisma API is maintained
separately.

## Product capabilities

- Email/password and Google sign-in with protected role-aware dashboards.
- Organization, team, project, sprint, task, comment, and activity workflows.
- Organization search, membership filtering, sorting, and pagination.
- Profile editing, profile-image upload, and password changes.
- Admin user management, platform statistics, audit logs, and live daily growth
  charts.
- Contact requests stored through the API.
- Responsive light and dark themes.

## Technology

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, TanStack Query.
- Backend: Express 5, TypeScript, Prisma, PostgreSQL, Redis.
- Authentication: bcrypt password hashing, JWT sessions in HttpOnly cookies,
  role checks, and Google OAuth.

## Local development

1. Configure and start the API and its PostgreSQL and Redis dependencies using
   the API repository's environment setup.
2. Set `NEXT_PUBLIC_API_BASE_URL` in the frontend `.env.local` to the API URL
   ending in `/api/v1`. Browser API requests are sent directly to that API
   origin, so configure the API to allow the frontend origin and credentials.
3. Install dependencies and start the frontend:

   ```bash
   bun install
   bun run dev
   ```

4. Verify a production build and code checks:

   ```bash
   bun run build
   bun run lint
   ```

The API schema lives in the API repository's `prisma/schema` directory. Generate
Prisma Client and apply migrations using the API repository's database workflow.
Do not apply migrations to a production database without review and backup.

## Deployment

Deploy the frontend as a Node.js-capable Next.js application; this project uses
a standard Next.js server build rather than a static export. Deploy the API
separately with PostgreSQL, Redis, and the required authentication, mail, and
image-storage configuration. Set `NEXT_PUBLIC_API_BASE_URL` to the deployed
API URL ending in `/api/v1` for each frontend environment. Use HTTPS in
production so session cookies remain secure.

This project has not been deployed from this workspace; no live URL is claimed.
The source repository is [Hridoy004/synoflow-web](https://github.com/Hridoy004/synoflow-web).

## Demo account

The login page displays demo autofill only when both
`NEXT_PUBLIC_DEMO_EMAIL` and `NEXT_PUBLIC_DEMO_PASSWORD` are configured. These
values are public in the browser bundle. Use a dedicated, least-privilege
account with non-sensitive data; never expose production credentials.
