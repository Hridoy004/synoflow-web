import dynamic from "next/dynamic";
import { MetricSkeleton } from "@/components/modules/admin/performance-loading";

const AdminDashboardOverview = dynamic(
  () =>
    import("@/components/modules/admin/admin-dashboard-overview").then(
      (module) => module.AdminDashboardOverview,
    ),
  { loading: () => <MetricSkeleton /> },
);

export default function AdminDashboard() {
  return <AdminDashboardOverview />;
}
