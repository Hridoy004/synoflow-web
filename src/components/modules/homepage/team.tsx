import { TEAMS } from "./data";
import { Container, SectionHeader } from "./primitives";

export function Teams() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          title="One tool, whatever your team builds"
          description="Start with a workflow for your kind of work, then shape it to fit."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAMS.map(({ icon: Icon, title, text, chipClass }) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-xl hover:shadow-slate-900/5"
            >
              <span
                className={`flex size-11 items-center justify-center rounded-xl ${chipClass}`}
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
