import { AuditLogExplorer } from "@/components/modules/admin/audit-log-explorer";

export const metadata = { title: "Platform audit logs" };

export default function SuperAdminAuditLogsPage() {
  return <AuditLogExplorer />;
}
