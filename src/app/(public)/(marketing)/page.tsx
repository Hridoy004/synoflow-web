import { FinalCta } from "@/components/modules/homepage/cta";
import { Faq } from "@/components/modules/homepage/faq";
import { Features } from "@/components/modules/homepage/features";
import { Hero } from "@/components/modules/homepage/hero";
import { Teams } from "@/components/modules/homepage/team";
import { Workflow } from "@/components/modules/homepage/workflow";

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-900 antialiased">
      <Hero />
      <Features />
      <Workflow />
      <Teams />
      <Faq />
      <FinalCta />
    </main>
  );
}
