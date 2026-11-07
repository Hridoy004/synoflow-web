import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { SystemRole } from "@/types/user.type";
import type { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardShell({
  children,
  systemRole,
}: {
  children: ReactNode;
  systemRole: SystemRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={systemRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
