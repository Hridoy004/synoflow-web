import { AdminResourceManagement } from "@/components/modules/admin/resource-management";

export const metadata = { title: "Projects" };

export default function SuperAdminProjectsPage() {
  return <AdminResourceManagement resource="projects" />;
}
