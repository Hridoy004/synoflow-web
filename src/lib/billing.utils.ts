const BKASH_HOSTS = ["bka.sh", "bkash.com"];

export function getBkashCheckoutUrl(value: unknown) {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  try {
    const checkoutUrl = new URL(value);
    const isBkashHost = BKASH_HOSTS.some(
      (domain) =>
        checkoutUrl.hostname === domain ||
        checkoutUrl.hostname.endsWith(`.${domain}`),
    );

    if (
      checkoutUrl.protocol !== "https:" ||
      !isBkashHost ||
      checkoutUrl.username ||
      checkoutUrl.password
    ) {
      return null;
    }

    return checkoutUrl.toString();
  } catch {
    return null;
  }
}
