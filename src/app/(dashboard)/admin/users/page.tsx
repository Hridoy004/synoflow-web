import dynamic from "next/dynamic";
import { MetricSkeleton } from "@/components/modules/admin/performance-loading";

const UserManagement = dynamic(
  () =>
    import("@/components/modules/admin/user-management").then(
      (module) => module.UserManagement,
    ),
  { loading: () => <MetricSkeleton /> },
);

export default function AdminUsersPage() {
  return <UserManagement />;
}
