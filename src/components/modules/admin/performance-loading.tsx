export function MetricSkeleton() {
  return (
    <output aria-label="Loading dashboard module" className="block space-y-4">
      <div className="h-36 animate-pulse rounded-2xl bg-slate-100" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["first", "second", "third"].map((key) => (
          <div key={key} className="h-32 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    </output>
  );
}
