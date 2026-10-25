"use client";

import type { ReactNode } from "react";
import AuthLoading from "@/components/auth/auth-loading";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetMe } from "@/hooks";
import type { SystemRole } from "@/types";

type DashboardShellProps = {
  children: ReactNode;
  dashboardRole: SystemRole;
};

export default function DashboardShell({
  children,
  dashboardRole,
}: DashboardShellProps) {
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;

  if (isPending || !user) {
    return (
      <AuthLoading
        label={isError ? "Redirecting..." : "Loading your workspace"}
      />
    );
  }

  return (
    <SidebarProvider>
      <DashboardSidebar
        role={
          user.systemRole === "SUPER_ADMIN" ||
          user.systemRole === "ADMIN" ||
          user.systemRole === "USER"
            ? user.systemRole
            : dashboardRole
        }
      />

      <SidebarInset className="min-h-svh min-w-0">
        <DashboardHeader
          user={{
            name: user.name,
            email: user.email,
            avatarUrl: user.imageUrl,
          }}
        />

        <main className="flex min-w-0 flex-1 flex-col bg-[#F7F8FF] px-3 py-4 sm:px-6 sm:py-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
