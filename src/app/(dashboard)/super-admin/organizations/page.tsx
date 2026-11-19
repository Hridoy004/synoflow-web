import { AdminResourceManagement } from "@/components/modules/admin/resource-management";

export const metadata = { title: "Organizations" };

export default function SuperAdminOrganizationsPage() {
  return <AdminResourceManagement resource="organizations" />;
}
