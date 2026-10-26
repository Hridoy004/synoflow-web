"use client";

import {
  Activity,
  BriefcaseBusiness,
  Building2,
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
import { useOrganization, useProject } from "@/hooks";
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
  Organization: Building2,
  Teams: Users,
  Labels: Tags,
  Activity,
  "Open project": FolderKanban,
} as const;

export function DashboardSidebar({ role }: { role: SystemRole }) {
  const pathname = usePathname();
  const projectId = pathname.match(/^\/user\/projects\/([^/]+)$/)?.[1] ?? "";
  const projectQuery = useProject(projectId);
  const project = projectQuery.data?.data;
  const orgIdFromPath =
    pathname.match(/^\/user\/organizations\/([^/]+)/)?.[1] ?? "";
  const orgId = project?.organizationId ?? orgIdFromPath;
  const organizationQuery = useOrganization(orgId);
  const organization = organizationQuery.data?.data;
  const routes = [...(sidebarRoutes[role] ?? [])];

  if (role === "USER" && organization && orgId) {
    routes.push({
      title: organization.name,
      items: [
        {
          title: "Organization",
          url: `/user/organizations/${orgId}`,
        },
        {
          title: "Teams",
          url: `/user/organizations/${orgId}/teams`,
        },
        {
          title: "Projects",
          url: `/user/organizations/${orgId}/projects`,
        },
        {
          title: "Labels",
          url: `/user/organizations/${orgId}/labels`,
        },
        {
          title: "Activity",
          url: `/user/organizations/${orgId}/activity`,
        },
      ],
    });
  }

  if (role === "USER" && project) {
    routes.push({
      title: project.name,
      items: [
        {
          title: "Open project",
          url: `/user/projects/${project.id}`,
        },
        {
          title: "Projects",
          url: `/user/organizations/${project.organizationId}/projects`,
        },
      ],
    });
  }

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
            <SidebarGroupLabel className="truncate px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-data-[collapsible=icon]:hidden">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const Icon =
                    routeIcons[item.title as keyof typeof routeIcons];

                  const isDashboardHome =
                    item.url === "/user" ||
                    item.url === "/admin" ||
                    item.url === "/super-admin";
                  const isActive =
                    pathname === item.url ||
                    (!isDashboardHome && pathname.startsWith(`${item.url}/`));

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
