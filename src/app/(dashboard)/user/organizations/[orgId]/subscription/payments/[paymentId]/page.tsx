import type { Metadata } from "next";
import { PaymentDetails } from "@/components/modules/payment/payment-details";

export const metadata: Metadata = {
  title: "Payment details",
};

export default async function PaymentDetailsPage({
  params,
}: PageProps<"/user/organizations/[orgId]/subscription/payments/[paymentId]">) {
  const { orgId, paymentId } = await params;

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <PaymentDetails orgId={orgId} paymentId={paymentId} />
    </div>
  );
}
