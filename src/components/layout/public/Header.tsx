"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import type { SystemRole } from "@/types";

const routes = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Services", url: "/services" },
  { name: "Pricing", url: "/pricing" },
  { name: "Contact", url: "/contact" },
];

const dashboardRoute: Record<SystemRole, string> = {
  SUPER_ADMIN: "/super-admin",
  ADMIN: "/admin",
  USER: "/user",
};

const roleLabel: Record<SystemRole, string> = {
  SUPER_ADMIN: "Super admin",
  ADMIN: "Admin",
  USER: "Member",
};

/* ---------- Style tokens ---------- */
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] focus-visible:ring-offset-2";

const primaryButton =
  "rounded-lg bg-[#4852F5] font-semibold text-white shadow-sm transition-colors hover:bg-[#3A43D6]";

const secondaryButton =
  "rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 transition-colors hover:bg-slate-50";

const menuItem =
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors";

const navLink = `rounded-md px-3 py-2 text-sm font-medium transition-colors ${focusRing}`;
const navLinkActive = "bg-brand-50 text-brand-800";
const navLinkIdle = "text-slate-600 hover:bg-brand-50 hover:text-brand-800";

/* ---------- Helpers ---------- */
function getIdentity(user: unknown) {
  const u = (user ?? {}) as Record<string, unknown>;
  const text = (value: unknown) =>
    typeof value === "string" ? value.trim() : "";

  const email = text(u.email);
  const name =
    text(u.name) ||
    [text(u.firstName), text(u.lastName)].filter(Boolean).join(" ") ||
    email.split("@")[0] ||
    "Account";

  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return { name, email, initials };
}

function Avatar({
  initials,
  className = "size-8 text-xs",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#4852F5] font-semibold text-white ${className}`}
    >
      {initials}
    </span>
  );
}

function UserSummary({
  name,
  email,
  initials,
  avatarClassName,
  children,
}: {
  name: string;
  email: string;
  initials: string;
  avatarClassName: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar initials={initials} className={avatarClassName} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
        {email && <p className="truncate text-xs text-slate-500">{email}</p>}
        {children}
      </div>
    </div>
  );
}

/* ---------- Header ---------- */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending } = useLogout();
  const queryClient = useQueryClient();

  const user = data?.data;
  const role = user?.systemRole as SystemRole | undefined;
  const dashboardHref = role ? dashboardRoute[role] : undefined;
  const identity = getIdentity(user);

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, []);

  // Header gets a surface once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigating
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile menu if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape + click outside
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenus();
    };
    const onMouseDown = (e: MouseEvent) => {
      if (!accountRef.current?.contains(e.target as Node))
        setAccountOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [closeMenus]);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["user"] });
        toast.add({
          title: "Logged out",
          description: "You have successfully logged out.",
          type: "success",
        });
        closeMenus();
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  // "/" matches only itself; other routes also match their sub-pages
  const isActive = (url: string) =>
    url === "/"
      ? pathname === "/"
      : pathname === url || pathname.startsWith(`${url}/`);

  const guestActions = (mobile: boolean) => {
    const size = mobile ? "h-12 w-full text-[15px]" : "h-10 px-4 text-sm";

    return (
      <div
        className={
          mobile ? "flex flex-col-reverse gap-3" : "flex items-center gap-2"
        }
      >
        <Button
          variant="ghost"
          render={<Link href="/login" />}
          nativeButton={false}
          onClick={closeMenus}
          className={`${secondaryButton} ${size}`}
        >
          Log in
        </Button>
        <Button
          render={<Link href="/register" />}
          nativeButton={false}
          onClick={closeMenus}
          className={`${primaryButton} ${size}`}
        >
          Get started free
        </Button>
      </div>
    );
  };

  const desktopAccountMenu = () => (
    <div ref={accountRef} className="relative">
      <button
        type="button"
        onClick={() => setAccountOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={accountOpen}
        className={`flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 transition-colors hover:border-slate-300 hover:bg-slate-50 ${focusRing}`}
      >
        <Avatar initials={identity.initials} />
        <span className="max-w-[120px] truncate text-sm font-medium text-slate-800">
          {identity.name}
        </span>
        <ChevronDown
          aria-hidden
          className={`size-4 text-slate-400 transition-transform duration-200 ${
            accountOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {accountOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
        >
          <div className="border-b border-slate-100 px-4 py-3.5">
            <UserSummary {...identity} avatarClassName="size-10 text-sm">
              {role && (
                <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                  {roleLabel[role]}
                </span>
              )}
            </UserSummary>
          </div>

          <div className="p-1.5">
            {dashboardHref && (
              <Link
                href={dashboardHref}
                role="menuitem"
                onClick={closeMenus}
                className={`${menuItem} hover:bg-slate-50 hover:text-slate-950`}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
            )}
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={isPending}
              className={`${menuItem} hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <LogOut className="size-4" />
              {isPending ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const mobileAccountActions = () => (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
        <UserSummary {...identity} avatarClassName="size-11 text-sm" />
      </div>

      {dashboardHref && (
        <Button
          render={<Link href={dashboardHref} />}
          nativeButton={false}
          onClick={closeMenus}
          className={`${primaryButton} h-12 w-full text-[15px]`}
        >
          <LayoutDashboard className="mr-2 size-4" />
          Go to dashboard
        </Button>
      )}

      <Button
        variant="outline"
        onClick={handleLogout}
        disabled={isPending}
        className="h-12 w-full rounded-lg border-slate-300 text-[15px] text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="mr-2 size-4" />
        {isPending ? "Logging out..." : "Log out"}
      </Button>
    </div>
  );

  const authSection = (mobile: boolean) => {
    if (isLoading) {
      return (
        <div
          aria-hidden
          className={`animate-pulse rounded-lg bg-slate-100 ${
            mobile ? "h-12 w-full" : "h-10 w-44"
          }`}
        />
      );
    }
    if (!user) return guestActions(mobile);
    return mobile ? mobileAccountActions() : desktopAccountMenu();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled || mobileOpen
          ? "border-slate-200 bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="Synoflow homepage"
            className={`flex shrink-0 items-center gap-2.5 rounded-md ${focusRing}`}
          >
            <Logo className="size-8" />
            <span className="text-xl font-bold tracking-tight text-[#10156F]">
              Synoflow
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {routes.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                aria-current={isActive(route.url) ? "page" : undefined}
                className={`${navLink} ${
                  isActive(route.url) ? navLinkActive : navLinkIdle
                }`}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden shrink-0 items-center lg:flex">
          {authSection(false)}
        </div>

        <Button
          variant="outline"
          size="icon"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="synoflow-mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
          className="size-10 rounded-lg border-slate-300 bg-white lg:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        id="synoflow-mobile-menu"
        aria-hidden={!mobileOpen}
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          mobileOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-slate-100 bg-white px-4 pb-6 pt-3 sm:px-6">
            <nav aria-label="Mobile navigation" className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.url}
                  href={route.url}
                  onClick={closeMenus}
                  aria-current={isActive(route.url) ? "page" : undefined}
                  className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-[15px] font-medium transition-colors ${
                    isActive(route.url)
                      ? navLinkActive
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {route.name}
                  <ChevronRight aria-hidden className="size-4 text-slate-400" />
                </Link>
              ))}
            </nav>

            <div className="mt-5 border-t border-slate-100 pt-5">
              {authSection(true)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
