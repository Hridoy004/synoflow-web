import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { buttonClass, Container } from "./primitives";
import { ProductPreview } from "./product-preview";

const reassurances = [
  "Free to start",
  "Set up in minutes",
  "Invite your whole team",
];

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

      <Container className="pb-24 pt-16 sm:pt-24 lg:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.035em] text-slate-950 sm:text-7xl">
            The workspace where your team plans, tracks, and ships
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Synoflow brings issues, sprints, roadmaps, and reports together, so
            everyone knows what is happening and what to do next.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className={buttonClass("primary")}>
              Get started for free
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/login" className={buttonClass("secondary")}>
              Sign in to workspace
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

        <div>
          <ProductPreview />
        </div>
      </Container>
    </section>
  );
}
