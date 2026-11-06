import { BarChart3, Layers3, MessageSquare, Route } from "lucide-react";
import { Container } from "./primitives";

const capabilities = [
  { icon: Layers3, label: "Projects & backlogs" },
  { icon: Route, label: "Sprints & roadmaps" },
  { icon: MessageSquare, label: "Team collaboration" },
  { icon: BarChart3, label: "Reports & insights" },
];

export function Proof() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 py-px sm:grid-cols-4">
          {capabilities.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-h-24 items-center justify-center gap-3 bg-white px-4 text-center text-sm font-semibold text-slate-700"
            >
              <Icon className="size-5 shrink-0 text-[#4852F5]" aria-hidden />
              {label}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
