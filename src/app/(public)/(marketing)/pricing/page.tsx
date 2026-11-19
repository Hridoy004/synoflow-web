import type { Metadata } from "next";
import PricingSection from "@/components/modules/pricing/pricing-section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare Synoflow plans for organizing and delivering team work.",
};

export default function PricingPage() {
  return (
    <main className="overflow-x-clip bg-background text-foreground antialiased">
      <PricingSection />
    </main>
  );
}
