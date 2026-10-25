import type { Metadata } from "next";
import { OrganizationLabelsWorkspace } from "@/components/modules/workspace/workspace-pages";

export const metadata: Metadata = { title: "Labels" };

export default async function OrganizationLabelsPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <OrganizationLabelsWorkspace orgId={orgId} />
    </div>
  );
}
