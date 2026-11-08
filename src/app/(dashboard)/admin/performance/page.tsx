import dynamic from "next/dynamic";
import { MetricSkeleton } from "@/components/modules/admin/performance-loading";

const PerformanceLab = dynamic(
  () =>
    import("@/components/modules/admin/performance-lab").then(
      (module) => module.PerformanceLab,
    ),
  { loading: () => <MetricSkeleton /> },
);

export default function AdminPerformancePage() {
  return <PerformanceLab />;
}
