import type { Metadata } from "next";
import { ProjectDetailWorkspace } from "@/components/modules/workspace/workspace-pages";

export const metadata: Metadata = { title: "Project workspace" };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <ProjectDetailWorkspace projectId={projectId} />
    </div>
  );
}
