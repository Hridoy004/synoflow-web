import { ArrowRight, CreditCard, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { Container, SectionHeader } from "./primitives";

const capabilities = [
  {
    icon: Users,
    title: "Bring teams into one workspace",
    description:
      "Organize your work across organizations, teams, projects, and members.",
  },
  {
    icon: ShieldCheck,
    title: "Keep access accountable",
    description:
      "Manage membership and review activity with role-aware workspace controls.",
  },
  {
    icon: CreditCard,
    title: "Keep subscriptions visible",
    description:
      "Review plans, subscription status, and payment history alongside your work.",
  },
];

export function WorkspaceOperations() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-20 sm:py-24">
      <Container>
        <SectionHeader
          title="More than a project board"
          description="Manage the people, access, and subscriptions that keep projects moving."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Explore all capabilities
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
