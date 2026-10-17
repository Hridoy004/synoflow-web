import type { Metadata } from "next";
import { OrganizationDetails } from "@/components/modules/organizations/organization-details";

export const metadata: Metadata = {
  title: "Organization details",
};

export default async function OrganizationPage({
  params,
}: PageProps<"/user/organizations/[orgId]">) {
  const { orgId } = await params;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <OrganizationDetails orgId={orgId} />
    </div>
  );
}
