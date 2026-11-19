export default function Loading() {
  return (
    <main
      aria-live="polite"
      aria-label="Loading page"
      className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 py-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

        <div className="absolute -top-32 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:size-96" />

        <div className="absolute -bottom-32 -right-20 size-72 rounded-full bg-primary/10 blur-3xl sm:size-96" />
      </div>

      <div className="flex w-full max-w-xs flex-col items-center gap-7 text-center sm:max-w-sm sm:gap-8">
        <div aria-hidden="true" className="relative size-20 sm:size-24">
          <div className="absolute -inset-4 rounded-full bg-primary/15 blur-2xl" />

          <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 motion-safe:animate-[spin_10s_linear_infinite_reverse]" />

          <div className="absolute inset-2.5 rounded-full border-4 border-primary/15" />

          <div className="absolute inset-2.5 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,var(--brand)_200deg,var(--brand-strong)_360deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),#000_calc(100%-3px))] motion-safe:animate-spin" />

          <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-primary to-brand-700 shadow-lg shadow-primary/30 ring-4 ring-card motion-safe:animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            Getting things ready
          </h2>

          <p className="text-pretty text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Please wait while Synoflow loads your workspace.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="h-1.5 w-44 overflow-hidden rounded-full bg-primary/10 shadow-inner sm:w-56"
        >
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-brand-400 via-primary to-brand-700 motion-safe:animate-pulse" />
        </div>
      </div>
    </main>
  );
}
