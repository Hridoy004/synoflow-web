import { CheckCircle2, Layers3, ListTodo, MessageSquare, Route } from "lucide-react";
import { FEATURE_AREAS } from "./data";
import { Container, SectionHeader } from "./primitives";

const icons = [Layers3, ListTodo, MessageSquare, Route];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <SectionHeader
          title="From backlog to release, stay in sync"
          description="Give every team the tools to plan clearly, move work forward, and understand project activity."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {FEATURE_AREAS.map((feature, index) => {
            const Icon = icons[index];

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <span
                  className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {feature.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2
                        className="size-4 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
