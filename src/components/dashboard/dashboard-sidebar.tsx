"use client";

import {
  BriefcaseBusiness,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  ScrollText,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/svg/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes, superAdminRoutes, userRoutes } from "@/routes";
import type { SidebarItems, SystemRole } from "@/types";

const sidebarRoutes: Partial<Record<SystemRole, SidebarItems>> = {
  SUPER_ADMIN: superAdminRoutes,
  ADMIN: adminRoutes,
  USER: userRoutes,
};

const routeIcons = {
  Overview: LayoutDashboard,
  Organizations: BriefcaseBusiness,
  Projects: FolderKanban,
  "Audit logs": ScrollText,
  Subscriptions: Tags,
  Payments: CreditCard,
  Users,
} as const;

export function DashboardSidebar({ role }: { role: SystemRole }) {
  const pathname = usePathname();
  const routes = sidebarRoutes[role] ?? [];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="h-16 justify-center border-b px-3">
        <Link
          href="/"
          className="flex items-center gap-3 overflow-hidden"
          aria-label="Synoflow home"
        >
          <Logo />
          <span className="truncate text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Synoflow
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-3">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="px-2 py-2">
            <SidebarGroupLabel className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground group-data-[collapsible=icon]:hidden">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const Icon =
                    routeIcons[item.title as keyof typeof routeIcons];

                  const isActive =
                    pathname === item.url ||
                    (item.url !== "/user" &&
                      pathname.startsWith(`${item.url}/`));

                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={isActive}
                        tooltip={item.title}
                        className="h-10 rounded-lg px-3 data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary"
                      >
                        {Icon && <Icon className="size-4 shrink-0" />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
