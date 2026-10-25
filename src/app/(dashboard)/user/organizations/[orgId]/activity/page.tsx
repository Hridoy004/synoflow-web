import type { Metadata } from "next";
import { OrganizationActivityWorkspace } from "@/components/modules/workspace/workspace-pages";

export const metadata: Metadata = { title: "Organization activity" };

export default async function OrganizationActivityPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <OrganizationActivityWorkspace orgId={orgId} />
    </div>
  );
}
