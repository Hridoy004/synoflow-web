import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonClass, Container } from "./primitives";

export function FinalCta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#4852F5] via-[#5B5FF7] to-[#8B5CF6] px-6 py-20 text-center sm:px-12 sm:py-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
          />
          <div className="mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.025em] text-white sm:text-5xl sm:leading-[1.08]">
              Give your team a clearer path from idea to delivery
            </h2>
            <p className="mt-5 text-lg leading-8 text-indigo-50/90">
              Create a workspace, add your first project, and invite your team
              in minutes.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register" className={buttonClass("inverse")}>
                Get started for free
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/contact" className={buttonClass("inverseOutline")}>
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
