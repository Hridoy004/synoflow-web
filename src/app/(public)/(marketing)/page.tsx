import { FinalCta } from "@/components/modules/homepage/cta";
import { Faq } from "@/components/modules/homepage/faq";
import { Features } from "@/components/modules/homepage/features";
import { Hero } from "@/components/modules/homepage/hero";
import { Proof } from "@/components/modules/homepage/proof";
import { Teams } from "@/components/modules/homepage/team";
import { Workflow } from "@/components/modules/homepage/workflow";
import { WorkspaceOperations } from "@/components/modules/homepage/workspace-operations";

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-900 antialiased">
      <Hero />
      <Proof />
      <Features />
      <Workflow />
      <Teams />
      <WorkspaceOperations />
      <Faq />
      <FinalCta />
    </main>
  );
}
