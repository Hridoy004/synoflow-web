"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type DashboardHeaderProps = {
  user: {
    name: string;
    email: string;
    avatarUrl?: string | null;
  };
};

const pageTitles: Record<string, string> = {
  "/user": "Overview",
  "/user/organizations": "Organizations",
  "/user/projects": "Projects",
  "/user/teams": "Teams",
  "/user/tasks": "My Tasks",
  "/user/profile": "Profile",
  "/user/notifications": "Notifications",
  "/user/settings": "Account Settings",
};

function getPageTitle(pathname: string) {
  if (pageTitles[pathname]) {
    return pageTitles[pathname];
  }

  const matchingRoute = Object.keys(pageTitles)
    .filter((route) => route !== "/user")
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname.startsWith(`${route}/`));

  if (matchingRoute) {
    return pageTitles[matchingRoute];
  }

  const lastSegment = pathname.split("/").filter(Boolean).at(-1);

  if (!lastSegment) return "Dashboard";

  return lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  const initials =
    user.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b bg-background/90 px-3 backdrop-blur-md sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />

        <Separator orientation="vertical" className="h-5" />

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
            {title}
          </h1>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Manage your workspace efficiently
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          type="button"
          aria-label="Search"
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Search className="size-4" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bell className="size-4" />
        </button>

        <Separator
          orientation="vertical"
          className="mx-1 hidden h-5 sm:block justify-center"
        />

        <div className="flex max-w-56 items-center gap-2 rounded-lg py-1 pl-1 sm:gap-3 sm:pl-2">
          <Avatar className="size-9 shrink-0">
            <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />

            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold leading-5">
              {user.name}
            </p>

            <p className="truncate text-xs leading-4 text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
