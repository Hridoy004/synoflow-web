import { AdminResourceManagement } from "@/components/modules/admin/resource-management";

export const metadata = { title: "Subscriptions" };

export default function SuperAdminSubscriptionsPage() {
  return <AdminResourceManagement resource="subscriptions" />;
}
