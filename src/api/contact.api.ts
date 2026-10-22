import apiClient from "@/lib/apiClient";
import type { ContactPayload } from "@/types";

export function sendContactMessage(payload: ContactPayload) {
  return apiClient("/contact", { method: "POST", body: payload });
}
