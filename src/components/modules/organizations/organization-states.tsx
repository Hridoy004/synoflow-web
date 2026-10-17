import { AlertCircle, Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function OrganizationGridSkeleton({ count = 6 }: { count?: number }) {
  const skeletonKeys = Array.from(
    { length: count },
    (_, index) => `organization-skeleton-${index}`,
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {skeletonKeys.map((key) => (
        <div
          key={key}
          className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 rounded-xl" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function OrganizationEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
        <Building2 className="size-7" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-slate-900">
          No organizations yet
        </h2>
        <p className="max-w-sm text-sm text-slate-500">
          Create your first organization to start managing projects and inviting
          your team.
        </p>
      </div>
      <Button
        onClick={onCreate}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        <Plus className="size-4" /> New organization
      </Button>
    </div>
  );
}

interface OrganizationErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function OrganizationErrorState({
  message,
  onRetry,
}: OrganizationErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-2xl border border-red-100 bg-red-50/50 px-6 py-14 text-center"
    >
      <span className="grid size-12 place-items-center rounded-xl bg-red-100 text-red-600">
        <AlertCircle className="size-6" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-slate-900">
          Couldn&apos;t load organizations
        </h2>
        <p className="max-w-sm text-sm text-slate-600">
          {message || "Something went wrong. Please try again."}
        </p>
      </div>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
