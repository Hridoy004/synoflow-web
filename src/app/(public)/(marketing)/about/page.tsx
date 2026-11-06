import type { Metadata } from "next";
import {
  AboutHero,
  Capabilities,
  FinalCta,
  MissionVision,
  Values,
  WhySynoflow,
} from "@/components/modules/about/about-section";

const description =
  "Learn how Synoflow helps teams plan work, collaborate clearly, and deliver projects from one connected workspace.";

export const metadata: Metadata = {
  title: "About",
  description,
  openGraph: { title: "About Synoflow", description },
};

export default function AboutPage() {
  return (
    <main className="overflow-x-clip bg-background text-foreground antialiased">
      <AboutHero />
      <MissionVision />
      <WhySynoflow />
      <Capabilities />
      <Values />
      <FinalCta />
    </main>
  );
}
