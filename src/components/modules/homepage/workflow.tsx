import { WORKFLOW } from "./data";
import { Container, SectionHeader } from "./primitives";

export function Workflow() {
  return (
    <section
      id="how-it-works"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#0E1250] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4852F5]/40 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]"
      />

      <Container>
        <SectionHeader
          tone="dark"
          title="Plan it. Build it. Ship it."
          description="A simple workflow, so your team spends less time chasing updates and more time doing the work."
        />

        <ol className="mt-16 grid gap-5 md:grid-cols-3">
          {WORKFLOW.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="rounded-3xl bg-white/[0.05] p-8 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/[0.08]"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#2C34C9]">
                  {index + 1}
                </span>
                <Icon aria-hidden className="size-6 text-indigo-200/70" />
              </div>
              <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-7 text-indigo-100/70">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
