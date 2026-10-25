import type { Metadata } from "next";
import { ProjectsWorkspace } from "@/components/modules/workspace/workspace-pages";

export const metadata: Metadata = { title: "Projects" };

export default async function OrganizationProjectsPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <ProjectsWorkspace orgId={orgId} />
    </div>
  );
}
