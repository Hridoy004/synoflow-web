"use client";

import { CalendarDays, X } from "lucide-react";
import { useState } from "react";
import { useOrganizationActivities } from "@/hooks";
import { formatDate } from "@/lib/format";
import type { OrganizationActivity } from "@/types";
import { EmptyState, ErrorState, ListSkeleton } from "../list-states";
import { OrganizationPagination } from "../organization-pagination";
import { ACTIVITIES_PAGE_SIZE } from "./constants";

function getActorName(actor: OrganizationActivity["actor"]) {
  if (typeof actor === "string") return actor;
  return actor?.name || actor?.email || "System";
}

function ActivityItem({ activity }: { activity: OrganizationActivity }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-medium text-slate-900">
            {activity.description || activity.type || "Organization update"}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>by {getActorName(activity.actor)}</span>
            <span aria-hidden className="text-slate-300">
              •
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {formatDate(activity.createdAt)}
            </span>
          </div>
        </div>

        {activity.target && (
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
            {activity.target}
          </span>
        )}
      </div>
    </li>
  );
}

export function OrganizationActivityPanel({ orgId }: { orgId: string }) {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error, refetch } =
    useOrganizationActivities(orgId, { page, limit: ACTIVITIES_PAGE_SIZE });

  if (isPending) {
    return <ListSkeleton rowClassName="h-20 rounded-xl" />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load activity"
        message={error?.message}
        onRetry={() => void refetch()}
      />
    );
  }

  const activities = data?.data ?? [];
  const meta = data?.meta;

  if (activities.length === 0) {
    return (
      <EmptyState
        icon={X}
        title="No activity yet."
        description="Organization changes will appear here."
      />
    );
  }

  return (
    <div>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </ul>
      {meta && <OrganizationPagination meta={meta} onPageChange={setPage} />}
    </div>
  );
}
