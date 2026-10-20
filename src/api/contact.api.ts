import type { ContactPayload } from "@/validation/contact.validation";

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type ContactErrorCode = "not-configured" | "request-failed";

export class ContactError extends Error {
  readonly code: ContactErrorCode;

  constructor(code: ContactErrorCode, message: string) {
    super(message);
    this.name = "ContactError";
    this.code = code;
  }
}

function readMessage(body: unknown): string | undefined {
  if (typeof body !== "object" || body === null || !("message" in body)) {
    return undefined;
  }

  const message = (body as { message: unknown }).message;
  return typeof message === "string" && message.trim() ? message : undefined;
}

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<void> {
  if (!CONTACT_ENDPOINT) {
    throw new ContactError(
      "not-configured",
      "The contact form is not connected to a backend yet.",
    );
  }

  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      organization: payload.organization || undefined,
    }),
  });

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => undefined);
    throw new ContactError(
      "request-failed",
      readMessage(body) ?? "We couldn't send your message. Please try again.",
    );
  }
}

export function getContactErrorMessage(error: unknown): string {
  if (error instanceof ContactError) {
    return error.code === "not-configured"
      ? "Messages can't be sent right now because the contact service isn't set up yet."
      : error.message;
  }

  return "Something went wrong while sending your message. Check your connection and try again.";
}
