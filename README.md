This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Authentication deployment configuration

Set `NEXT_PUBLIC_API_BASE_URL` in Vercel for every environment you deploy, using the backend URL and the `/api/v1` path, for example:

```text
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api/v1
```

The frontend sends API requests to its own `/api/v1` path, and Next.js proxies them to this backend URL. This keeps authentication cookies first-party on the frontend domain. `NEXT_PUBLIC_API_BASE_URL` is read when Next.js starts/builds, so set it before deploying and redeploy after changing it. Do not use `localhost` for a Vercel deployment. Local development can continue to use the backend's localhost URL in `.env.local`.

The browser now talks only to the frontend origin, so browser CORS is not required for these API calls. The backend can keep its existing CORS configuration for other clients.

- The login response must set an `HttpOnly; Secure` session cookie without a `Domain` attribute, so the browser stores it for the frontend host. `/auth/me` must accept that cookie.

If login succeeds but `/auth/me` returns `401`, verify in the browser's Network panel that the same-origin `/api/v1/auth/login` response's `Set-Cookie` was accepted and that the subsequent `/api/v1/auth/me` request includes that cookie.
