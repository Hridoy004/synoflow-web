import type { Metadata } from "next";
import { SubscriptionManagement } from "@/components/modules/subscription/subscription-management";

export const metadata: Metadata = {
  title: "Subscription & billing",
};

export default async function OrganizationSubscriptionPage({
  params,
  searchParams,
}: PageProps<"/user/organizations/[orgId]/subscription">) {
  const [{ orgId }, { paymentId }] = await Promise.all([params, searchParams]);

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <SubscriptionManagement
        orgId={orgId}
        paymentId={
          Array.isArray(paymentId) ? (paymentId[0] ?? "") : (paymentId ?? "")
        }
      />
    </div>
  );
}
