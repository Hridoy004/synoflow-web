import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ListSkeleton({
  rowClassName = "h-16 rounded-lg",
}: {
  rowClassName?: string;
}) {
  return (
    <output className="block space-y-3" aria-label="Loading">
      {["first", "second", "third", "fourth"].map((row) => (
        <div
          key={row}
          className={cn("animate-pulse bg-slate-100", rowClassName)}
        />
      ))}
    </output>
  );
}

export function ErrorState({
  title,
  message,
  onRetry,
}: {
  title: string;
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
      <p className="font-medium text-red-700">{title}</p>
      <p className="mt-1 text-sm text-red-600">
        {message || "Something went wrong."}
      </p>
      <Button variant="outline" className="mt-4" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
        <Icon className="size-5" />
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
    </div>
  );
}
