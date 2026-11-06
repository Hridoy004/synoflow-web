import type { Metadata } from "next";
import { ServicesSection } from "@/components/modules/services/services-section";

const description =
  "Plan projects, manage tasks, collaborate with teams, run sprints, report progress, and manage workspace access with Synoflow.";

export const metadata: Metadata = {
  title: "Services",
  description,
  openGraph: { title: "Services | Synoflow", description },
};

export default function ServicesPage() {
  return (
    <main className="overflow-x-clip bg-background text-foreground antialiased">
      <ServicesSection />
    </main>
  );
}
