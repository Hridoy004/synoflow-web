import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#10156F] px-5 py-14 text-center sm:rounded-[32px] sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50 blur-[110px]"
        />

        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
            Make teamwork flow.
          </h2>
          <p className="mt-4 text-base leading-7 text-indigo-100/80 sm:text-lg sm:leading-8">
            Bring your projects, teams, and tasks together with Synoflow.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row">
            <Button
              nativeButton={false}
              render={<Link href="/register" />}
              size="lg"
              className="h-12 w-full bg-white px-6 text-[#10156F] hover:bg-indigo-50 sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/services" />}
              variant="outline"
              size="lg"
              className="h-12 w-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
