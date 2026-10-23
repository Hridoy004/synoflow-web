import type { Metadata } from "next";
import { BillingReturn } from "@/components/modules/payment/billing-return";

export const metadata: Metadata = {
  title: "Verify payment",
};

export default async function BillingSuccessPage({
  searchParams,
}: PageProps<"/billing/success">) {
  const { paymentId } = await searchParams;

  return (
    <div className="px-4 py-16 sm:px-6 lg:py-24">
      <BillingReturn
        paymentId={
          Array.isArray(paymentId) ? (paymentId[0] ?? "") : (paymentId ?? "")
        }
      />
    </div>
  );
}
