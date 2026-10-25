import type { Metadata } from "next";
import { TeamsWorkspace } from "@/components/modules/workspace/workspace-pages";

export const metadata: Metadata = { title: "Teams" };

export default async function OrganizationTeamsPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <TeamsWorkspace orgId={orgId} />
    </div>
  );
}
