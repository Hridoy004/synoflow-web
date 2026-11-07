import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

export default apiClient as typeof apiClient &
  (<T>(request: Parameters<typeof apiClient>[0], options?: Parameters<typeof apiClient>[1]) => Promise<T>);
