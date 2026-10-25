"use client";

import { ChevronLeft, ChevronRight, RefreshCw, Search } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAdminOrganizations,
  useAdminProjects,
  useAdminSubscriptions,
} from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import { useUrlQueryState } from "@/hooks/use-url-query-state";
import { formatDate } from "@/lib/format";
import type {
  AdminOrganization,
  AdminProject,
  AdminResourceFilters,
  AdminSubscription,
} from "@/types";

const PAGE_SIZE = 20;

const RESOURCE_COPY = {
  organizations: {
    title: "Organizations",
    description: "Review platform organizations and their workspace activity.",
    search: "Search organization name or slug",
    statuses: ["ACTIVE", "SUSPENDED"],
  },
  projects: {
    title: "Projects",
    description: "Review projects across active platform organizations.",
    search: "Search project, key, or organization",
    statuses: ["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "ARCHIVED"],
  },
  subscriptions: {
    title: "Subscriptions",
    description: "Review organization plans, status, and billing periods.",
    search: "Search organization name or slug",
    statuses: ["PENDING", "ACTIVE", "PAST_DUE", "CANCELLED", "EXPIRED"],
  },
} as const;

type ResourceType = keyof typeof RESOURCE_COPY;

interface ResourceRow {
  id: string;
  name: string;
  description: string;
  status: string;
  detail: string;
  secondary: string;
  date: string;
}

function ResourceSkeleton() {
  return (
    <output
      aria-label="Loading platform records"
      className="block space-y-3 p-4"
    >
      {["one", "two", "three", "four", "five"].map((key) => (
        <div key={key} className="h-14 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </output>
  );
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getStatusStyle(status: string) {
  if (status === "ACTIVE") return "border-green-200 bg-green-50 text-green-700";
  if (["SUSPENDED", "PAST_DUE", "PENDING", "ON_HOLD"].includes(status)) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  if (["CANCELLED", "EXPIRED", "ARCHIVED"].includes(status)) {
    return "border-slate-200 bg-slate-100 text-slate-700";
  }
  return "border-indigo-200 bg-indigo-50 text-indigo-700";
}

type ResourceData =
  | {
      resource: "organizations";
      records: AdminOrganization[] | undefined;
    }
  | { resource: "projects"; records: AdminProject[] | undefined }
  | {
      resource: "subscriptions";
      records: AdminSubscription[] | undefined;
    };

function toResourceRows({ resource, records }: ResourceData): ResourceRow[] {
  if (!records) return [];

  if (resource === "organizations") {
    return records.map((record) => ({
      id: record.id,
      name: record.name,
      description: `/${record.slug}`,
      status: record.status,
      detail: record.owner
        ? `Owner: ${record.owner.name}`
        : "Owner unavailable",
      secondary: `${record.memberCount} members · ${record.projectCount} projects`,
      date: record.createdAt,
    }));
  }

  if (resource === "projects") {
    return records.map((record) => ({
      id: record.id,
      name: record.name,
      description: record.key,
      status: record.status,
      detail: `Organization: ${record.organization.name}`,
      secondary: `${record.taskCount} tasks · ${record.memberCount} members`,
      date: record.createdAt,
    }));
  }

  return records.map((record) => ({
    id: record.id,
    name: `${record.plan} plan`,
    description: record.organization.name,
    status: record.status,
    detail: record.cancelAtPeriodEnd
      ? "Cancellation scheduled"
      : "Organization subscription",
    secondary: record.currentPeriodEnd
      ? `Period ends ${formatDate(record.currentPeriodEnd)}`
      : "Renewal date unavailable",
    date: record.createdAt,
  }));
}

export function AdminResourceManagement({
  resource,
}: {
  resource: ResourceType;
}) {
  const urlQuery = useUrlQueryState();
  const copy = RESOURCE_COPY[resource];
  const search = urlQuery.get("search");
  const rawStatus = urlQuery.get("status");
  const status = copy.statuses.some((value) => value === rawStatus)
    ? rawStatus
    : "";
  const rawPlan = urlQuery.get("plan");
  const plan = ["FREE", "PRO", "BUSINESS"].includes(rawPlan) ? rawPlan : "";
  const page = urlQuery.getPage();
  const debouncedSearch = useDebounce(search.trim(), 350);
  const filters: AdminResourceFilters = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(status ? { status } : {}),
      ...(resource === "subscriptions" && plan ? { plan } : {}),
    }),
    [page, debouncedSearch, status, plan, resource],
  );

  const organizationsQuery = useAdminOrganizations(
    filters,
    resource === "organizations",
  );
  const projectsQuery = useAdminProjects(filters, resource === "projects");
  const subscriptionsQuery = useAdminSubscriptions(
    filters,
    resource === "subscriptions",
  );
  const query =
    resource === "organizations"
      ? organizationsQuery
      : resource === "projects"
        ? projectsQuery
        : subscriptionsQuery;
  const rows = toResourceRows(
    resource === "organizations"
      ? { resource, records: organizationsQuery.data?.data }
      : resource === "projects"
        ? { resource, records: projectsQuery.data?.data }
        : { resource, records: subscriptionsQuery.data?.data },
  );
  const meta = query.data?.meta;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const clearFilters = () => {
    urlQuery.set({ search: null, status: null, plan: null, page: 1 });
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-sm text-slate-500">{copy.description}</p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {meta
              ? `${meta.total.toLocaleString()} records`
              : "Platform records"}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void query.refetch()}
          disabled={query.isFetching}
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw
            className={`size-4 ${query.isFetching ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          Refresh
        </Button>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative w-full lg:max-w-sm">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <Input
              value={search}
              onChange={(event) => {
                urlQuery.set({ search: event.target.value, page: 1 });
              }}
              placeholder={copy.search}
              aria-label={copy.search}
              className="h-10 pl-9"
            />
          </div>
          <select
            aria-label="Filter by status"
            value={status}
            onChange={(event) => {
              urlQuery.set({ status: event.target.value, page: 1 });
            }}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] md:w-auto"
          >
            <option value="">All statuses</option>
            {copy.statuses.map((value) => (
              <option key={value} value={value}>
                {formatLabel(value)}
              </option>
            ))}
          </select>
          {resource === "subscriptions" && (
            <select
              aria-label="Filter by subscription plan"
              value={plan}
              onChange={(event) => {
                urlQuery.set({ plan: event.target.value, page: 1 });
              }}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] md:w-auto"
            >
              <option value="">All plans</option>
              <option value="FREE">Free</option>
              <option value="PRO">Pro</option>
              <option value="BUSINESS">Business</option>
            </select>
          )}
          {(search || status || plan) && (
            <Button
              type="button"
              variant="ghost"
              onClick={clearFilters}
              className="self-start"
            >
              Clear filters
            </Button>
          )}
        </div>

        {query.isPending ? (
          <ResourceSkeleton />
        ) : query.isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-800">
              Unable to load {copy.title.toLowerCase()}
            </h2>
            <p className="mt-1 text-sm text-red-700">
              {query.error.message || "The platform records request failed."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void query.refetch()}
              className="mt-4 border-red-300 bg-white text-red-800"
            >
              Retry
            </Button>
          </div>
        ) : rows.length === 0 ? (
          <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
            <div>
              <h2 className="font-semibold text-slate-900">
                {search || status || plan
                  ? "No matching records"
                  : `No ${copy.title.toLowerCase()} found`}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Adjust filters or check back after records are created.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-3 xl:hidden">
              {rows.map((row) => (
                <article
                  key={row.id}
                  className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/70 p-4 shadow-xs transition hover:border-indigo-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="break-words font-semibold text-slate-950">
                        {row.name}
                      </h2>
                      <p className="mt-0.5 break-all text-xs text-slate-500">
                        {row.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusStyle(row.status)}
                    >
                      {formatLabel(row.status)}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-3 border-t border-slate-100 pt-3 text-sm">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Owner / organization
                      </p>
                      <p className="mt-1 text-slate-700">{row.detail}</p>
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Activity
                        </p>
                        <p className="mt-1 text-slate-700">{row.secondary}</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        {formatDate(row.date)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="hidden overflow-x-auto rounded-xl border border-slate-200 xl:block">
              <table className="w-full min-w-[780px] divide-y divide-slate-200 text-left">
                <caption className="sr-only">{copy.title}</caption>
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Name",
                      "Status",
                      "Owner / organization",
                      "Activity",
                      "Created",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{row.name}</p>
                        <p className="text-xs text-slate-500">
                          {row.description}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge
                          variant="outline"
                          className={getStatusStyle(row.status)}
                        >
                          {formatLabel(row.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {row.detail}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {row.secondary}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                        {formatDate(row.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Page {meta?.page ?? page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || query.isFetching}
                  onClick={() => urlQuery.set({ page: Math.max(1, page - 1) })}
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || query.isFetching}
                  onClick={() =>
                    urlQuery.set({ page: Math.min(totalPages, page + 1) })
                  }
                >
                  Next
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
