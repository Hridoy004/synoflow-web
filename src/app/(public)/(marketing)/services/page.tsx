import type { Metadata } from "next";
import { ServicesSection } from "@/components/modules/services/services-section";

const description =
  "Explore Synoflow's connected tools for project management, task workflows, team collaboration, sprint planning, reporting, and workspace access.";

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
