import { PRODUCT_AREAS } from "./data";
import { AppWindow, GlowFrame } from "./primitives";

export function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <GlowFrame>
        <AppWindow
          title="Synoflow workspace"
          className="rounded-3xl shadow-none"
        >
          <div className="border-b border-slate-100 px-5 py-5 sm:px-8 sm:py-7">
            <p className="text-sm font-medium text-primary">
              A connected way to work
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Bring each stage of project work together
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Plan work, coordinate the team, and review project activity from
              one shared workspace.
            </p>
          </div>
          <ol className="grid gap-px bg-slate-200 sm:grid-cols-3">
            {PRODUCT_AREAS.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                className="bg-white p-5 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </AppWindow>
      </GlowFrame>
    </div>
  );
}
