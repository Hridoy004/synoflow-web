export default function Loading() {
  return (
    <main
      aria-label="Loading page"
      className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="h-8 w-52 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-5 max-w-md animate-pulse rounded-md bg-slate-100" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {["one", "two", "three"].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white" />
    </main>
  );
}
