"use client";

import { ChevronLeft, ChevronRight, RefreshCw, ScrollText } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAdminAuditLogs } from "@/hooks";
import type {
  AdminActivityAction,
  AdminActivityEntity,
  AdminAuditLog,
} from "@/types";

const PAGE_SIZE = 20;
const ENTITY_TYPES: AdminActivityEntity[] = [
  "USER",
  "ORGANIZATION",
  "TEAM",
  "PROJECT",
  "SPRINT",
  "TASK",
  "COMMENT",
  "PAYMENT",
  "SUBSCRIPTION",
];
const ACTIONS: AdminActivityAction[] = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "ASSIGN",
  "UNASSIGN",
  "STATUS_CHANGE",
  "ROLE_CHANGE",
  "MEMBER_ADDED",
  "MEMBER_REMOVED",
  "PAYMENT_SUCCESS",
  "PAYMENT_FAILED",
];
const EMPTY_FILTERS = {
  organizationId: "",
  userId: "",
  entityType: "",
  action: "",
  from: "",
  to: "",
};

function formatTimestamp(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

function humanize(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function AuditLogSkeleton() {
  return (
    <output aria-label="Loading audit logs" className="block space-y-3 p-4">
      {["first", "second", "third", "fourth", "fifth"].map((row) => (
        <div key={row} className="h-14 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </output>
  );
}

function AuditLogDetails({
  log,
  onClose,
}: {
  log: AdminAuditLog | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={Boolean(log)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Audit event details</DialogTitle>
          <DialogDescription>
            Event metadata returned by the audit log API.
          </DialogDescription>
        </DialogHeader>
        {log && (
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Event ID</dt>
              <dd className="mt-1 break-all text-slate-900">{log.id}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Entity ID</dt>
              <dd className="mt-1 break-all text-slate-900">{log.entityId}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Organization ID</dt>
              <dd className="mt-1 break-all text-slate-900">
                {log.organizationId}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">User ID</dt>
              <dd className="mt-1 break-all text-slate-900">{log.userId}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Metadata</dt>
              <dd>
                <pre className="mt-1 max-h-64 overflow-auto rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-700">
                  {JSON.stringify(log.metadata ?? null, null, 2)}
                </pre>
              </dd>
            </div>
          </dl>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function AuditLogExplorer() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<AdminAuditLog | null>(null);
  const auditLogsQuery = useAdminAuditLogs({
    page,
    limit: PAGE_SIZE,
    ...(filters.organizationId.trim()
      ? { organizationId: filters.organizationId.trim() }
      : {}),
    ...(filters.userId.trim() ? { userId: filters.userId.trim() } : {}),
    ...(filters.entityType
      ? { entityType: filters.entityType as AdminActivityEntity }
      : {}),
    ...(filters.action
      ? { action: filters.action as AdminActivityAction }
      : {}),
    ...(filters.from ? { from: filters.from } : {}),
    ...(filters.to ? { to: filters.to } : {}),
  });
  const logs = auditLogsQuery.data?.data ?? [];
  const meta = auditLogsQuery.data?.meta;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);

  const updateFilter = (key: keyof typeof EMPTY_FILTERS, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-sm text-slate-500">
            Review administrative and organization activity.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Filters use the API-supported organizationId, userId, entityType,
            action, from, and to query parameters.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void auditLogsQuery.refetch()}
          disabled={auditLogsQuery.isFetching}
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw
            className={`size-4 ${auditLogsQuery.isFetching ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          Refresh
        </Button>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Input
            value={filters.organizationId}
            onChange={(event) =>
              updateFilter("organizationId", event.target.value)
            }
            placeholder="Organization ID"
            aria-label="Filter by organization ID"
          />
          <Input
            value={filters.userId}
            onChange={(event) => updateFilter("userId", event.target.value)}
            placeholder="Actor user ID"
            aria-label="Filter by actor user ID"
          />
          <select
            aria-label="Filter by entity type"
            value={filters.entityType}
            onChange={(event) => updateFilter("entityType", event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5]"
          >
            <option value="">All entity types</option>
            {ENTITY_TYPES.map((entityType) => (
              <option key={entityType} value={entityType}>
                {humanize(entityType)}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by action"
            value={filters.action}
            onChange={(event) => updateFilter("action", event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5]"
          >
            <option value="">All actions</option>
            {ACTIONS.map((action) => (
              <option key={action} value={action}>
                {humanize(action)}
              </option>
            ))}
          </select>
          <Input
            type="date"
            value={filters.from}
            onChange={(event) => updateFilter("from", event.target.value)}
            aria-label="Filter from date"
          />
          <Input
            type="date"
            value={filters.to}
            onChange={(event) => updateFilter("to", event.target.value)}
            aria-label="Filter to date"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {meta
              ? `${meta.total.toLocaleString()} audit events`
              : "Audit events"}
          </p>
          <Button
            type="button"
            variant="ghost"
            onClick={clearFilters}
            disabled={
              Object.values(filters).every((value) => value === "") &&
              page === 1
            }
          >
            Clear filters
          </Button>
        </div>

        {auditLogsQuery.isPending ? (
          <AuditLogSkeleton />
        ) : auditLogsQuery.isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-800">
              Unable to load audit logs
            </h2>
            <p className="mt-1 text-sm text-red-700">
              {auditLogsQuery.error.message || "The audit-log request failed."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void auditLogsQuery.refetch()}
              className="mt-4 border-red-300 bg-white text-red-800"
            >
              Retry
            </Button>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
            <ScrollText className="size-7 text-slate-400" aria-hidden="true" />
            <h2 className="mt-3 font-semibold text-slate-900">
              No audit records found
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Try different filters or check back after more activity.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-3 xl:hidden">
              {logs.map((log) => (
                <article
                  key={log.id}
                  className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/70 p-4 shadow-xs transition hover:border-indigo-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-950">
                        {log.user?.name || "Unknown user"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {log.user?.email || "Email unavailable"}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 border-indigo-200 bg-indigo-50 text-indigo-700"
                    >
                      {humanize(log.action)}
                    </Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-slate-100 pt-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Entity
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {humanize(log.entityType)}
                      </p>
                      <p className="truncate font-mono text-[11px] text-slate-400">
                        {log.entityId}
                      </p>
                    </div>
                    <div className="min-w-0 text-right">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Organization
                      </p>
                      <p className="mt-1 break-words text-sm text-slate-700">
                        {log.organization?.name || "Unavailable"}
                      </p>
                    </div>
                    <p className="col-span-2 text-xs text-slate-500">
                      {formatTimestamp(log.createdAt)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLog(log)}
                    className="mt-3 w-full"
                  >
                    View event details
                  </Button>
                </article>
              ))}
            </div>
            <div className="hidden overflow-x-auto rounded-xl border border-slate-200 xl:block">
              <table className="w-full min-w-[860px] divide-y divide-slate-200 text-left">
                <caption className="sr-only">Administrative audit logs</caption>
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Timestamp",
                      "Actor",
                      "Action",
                      "Entity",
                      "Organization",
                      "Details",
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
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70">
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                        {formatTimestamp(log.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-900">
                          {log.user?.name || "Unknown user"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {log.user?.email || "Email unavailable"}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                        {humanize(log.action)}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-slate-700">
                          {humanize(log.entityType)}
                        </p>
                        <p className="max-w-40 truncate font-mono text-xs text-slate-400">
                          {log.entityId}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {log.organization?.name || "Organization unavailable"}
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          View
                        </Button>
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
              <div className="flex items-center gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || auditLogsQuery.isFetching}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="gap-1"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || auditLogsQuery.isFetching}
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </>
        )}
      </section>

      <AuditLogDetails log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}
