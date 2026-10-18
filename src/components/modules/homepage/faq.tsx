import { Plus } from "lucide-react";
import { FAQS } from "./data";
import { Container, SectionHeader } from "./primitives";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-slate-100 bg-slate-50/70 py-24 sm:py-28"
    >
      <Container className="max-w-3xl">
        <SectionHeader
          title="Questions, answered"
          description="Everything you need to know before you start."
        />

        <div className="mt-12 divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group px-7 py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-950 [&::-webkit-details-marker]:hidden">
                {q}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-600">
                {a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
