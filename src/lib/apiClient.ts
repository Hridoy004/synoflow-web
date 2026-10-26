import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

if (!BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is required. Set it to the backend API URL ending in /api/v1.",
  );
}

let parsedBaseURL: URL;

try {
  parsedBaseURL = new URL(BASE_URL);
} catch {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL must be an absolute backend URL ending in /api/v1.",
  );
}

if (parsedBaseURL.protocol !== "http:" && parsedBaseURL.protocol !== "https:") {
  throw new Error("NEXT_PUBLIC_API_BASE_URL must use HTTP or HTTPS.");
}

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

export default apiClient;
