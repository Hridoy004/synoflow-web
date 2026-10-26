import type { NextConfig } from "next";

const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

if (!apiBaseURL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is required. Set it to the backend API URL ending in /api/v1.",
  );
}

let parsedApiBaseURL: URL;

try {
  parsedApiBaseURL = new URL(apiBaseURL);
} catch {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL must be an absolute backend URL ending in /api/v1.",
  );
}

if (
  (parsedApiBaseURL.protocol !== "http:" &&
    parsedApiBaseURL.protocol !== "https:") ||
  parsedApiBaseURL.pathname.replace(/\/+$/, "") !== "/api/v1" ||
  parsedApiBaseURL.search ||
  parsedApiBaseURL.hash
) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL must use HTTP or HTTPS and end in /api/v1.",
  );
}

const apiRewriteDestination = `${apiBaseURL.replace(/\/+$/, "")}/:path*`;

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: apiRewriteDestination,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
