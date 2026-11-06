import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { buttonClass, Container } from "./primitives";
import { ProductPreview } from "./product-preview";

const reassurances = ["Free to start", "Set up in minutes", "No credit card"];

function Aurora() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#F4F5FF] via-white to-white"
    >
      <div className="absolute -left-24 -top-24 size-[34rem] rounded-full bg-[#4852F5]/25 blur-[110px]" />
      <div className="absolute -right-24 top-0 size-[30rem] rounded-full bg-violet-400/25 blur-[110px]" />
      <div className="absolute left-1/3 top-48 size-[26rem] rounded-full bg-sky-300/30 blur-[110px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(72,82,245,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(72,82,245,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)]" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate -mt-16 pt-16">
      <Aurora />

      <Container className="pb-16 pt-10 sm:pt-16 lg:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur">
            Built for modern, focused teams
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-6xl lg:text-7xl">
            Plan, track, and ship work in one place
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-xl sm:leading-8">
            Replace scattered tasks and status meetings with one clear workspace
            for projects, sprints, and team updates.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className={buttonClass("primary")}>
              Get started for free
              <ArrowRight className="size-4" />
            </Link>
            <Link href="#features" className={buttonClass("secondary")}>
              See how it works
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            {reassurances.map((text) => (
              <li key={text} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 sm:mt-14">
          <ProductPreview />
        </div>
      </Container>
    </section>
  );
}
