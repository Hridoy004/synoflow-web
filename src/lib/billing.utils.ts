export function getBkashCheckoutUrl(paymentUrl: string | null | undefined) {
  if (!paymentUrl?.trim()) return null;

  try {
    const url = new URL(paymentUrl.trim());
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
