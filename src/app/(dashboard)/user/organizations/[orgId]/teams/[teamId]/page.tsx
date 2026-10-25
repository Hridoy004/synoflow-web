import type { Metadata } from "next";
import { TeamDetailWorkspace } from "@/components/modules/workspace/workspace-pages";

export const metadata: Metadata = { title: "Team details" };

export default async function TeamPage({
  params,
}: {
  params: Promise<{ orgId: string; teamId: string }>;
}) {
  const { orgId, teamId } = await params;
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <TeamDetailWorkspace orgId={orgId} teamId={teamId} />
    </div>
  );
}
