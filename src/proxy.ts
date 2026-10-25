import { type NextRequest, NextResponse } from "next/server";

type SystemRole = "USER" | "ADMIN" | "SUPER_ADMIN";

function getRedirectUrl(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return url;
}

function redirectToLogin(request: NextRequest) {
  const url = getRedirectUrl(request, "/login");
  url.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  return NextResponse.redirect(url);
}

function isSystemRole(value: unknown): value is SystemRole {
  return value === "USER" || value === "ADMIN" || value === "SUPER_ADMIN";
}

function serviceUnavailable() {
  return NextResponse.json(
    { message: "Authentication service is currently unavailable." },
    { status: 503 },
  );
}

export async function proxy(request: NextRequest) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    console.error(
      "NEXT_PUBLIC_API_BASE_URL is required for route authorization.",
    );
    return serviceUnavailable();
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl.replace(/\/+$/, "")}/auth/me`, {
      headers: { cookie: request.headers.get("cookie") ?? "" },
      cache: "no-store",
    });
  } catch (error) {
    console.error("Could not reach the authentication service.", error);
    return serviceUnavailable();
  }

  if (response.status === 401 || response.status === 403) {
    return redirectToLogin(request);
  }

  if (!response.ok) {
    console.error(
      `Authentication service returned ${response.status} for route authorization.`,
    );
    return serviceUnavailable();
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    console.error("Authentication service returned invalid JSON.", error);
    return serviceUnavailable();
  }

  const data =
    typeof payload === "object" && payload !== null && "data" in payload
      ? payload.data
      : null;
  const role =
    typeof data === "object" && data !== null && "systemRole" in data
      ? data.systemRole
      : null;

  if (!isSystemRole(role)) {
    console.error("Authentication service returned an invalid user role.");
    return serviceUnavailable();
  }

  const path = request.nextUrl.pathname;
  const requiresSuperAdmin =
    path === "/super-admin" || path.startsWith("/super-admin/");
  const requiresAdmin = path === "/admin" || path.startsWith("/admin/");

  if (requiresSuperAdmin && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(
      getRedirectUrl(request, role === "ADMIN" ? "/admin" : "/user"),
    );
  }

  if (requiresAdmin && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(getRedirectUrl(request, "/user"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/super-admin/:path*"],
};
