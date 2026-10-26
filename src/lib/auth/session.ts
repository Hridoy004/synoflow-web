export function getLoginRedirectPath(returnTo?: string) {
  const query = new URLSearchParams();
  if (
    returnTo?.startsWith("/") &&
    !returnTo.startsWith("//") &&
    !returnTo.includes("\\")
  ) {
    query.set("next", returnTo);
  }

  const search = query.toString();
  return search ? `/login?${search}` : "/login";
}
