import type { Metadata } from "next";
import { OrganizationList } from "@/components/modules/organizations/organization-list";

export const metadata: Metadata = {
  title: "Organizations",
};

export default function OrganizationsPage() {
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <OrganizationList />
    </div>
  );
}
