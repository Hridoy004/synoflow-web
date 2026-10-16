import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["SUPER_ADMIN"]}>
      <DashboardShell dashboardRole="SUPER_ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
