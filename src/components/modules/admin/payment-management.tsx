"use client";

import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminPayments } from "@/hooks";
import { formatDate } from "@/lib/format";

const PAGE_SIZE = 20;

const STATUS_STYLES = {
  SUCCESS: "border-green-200 bg-green-50 text-green-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  FAILED: "border-red-200 bg-red-50 text-red-700",
} as const;

function formatAmount(value: number | string, currency: string) {
  const amount = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(amount)) return `${currency} ${value}`;

  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    if (!(error instanceof RangeError)) throw error;
    return `${currency} ${amount.toLocaleString("en-BD")}`;
  }
}

export function AdminPaymentManagement() {
  const [page, setPage] = useState(1);
  const paymentsQuery = useAdminPayments({ page, limit: PAGE_SIZE });
  const payments = paymentsQuery.data?.data ?? [];
  const meta = paymentsQuery.data?.meta;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-sm text-slate-500">
            Review payment activity across the platform.
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {meta
              ? `${meta.total.toLocaleString()} payments`
              : "Platform payments"}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void paymentsQuery.refetch()}
          disabled={paymentsQuery.isFetching}
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw
            className={`size-4 ${paymentsQuery.isFetching ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          Refresh
        </Button>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-5">
        {paymentsQuery.isPending ? (
          <output aria-label="Loading payments" className="block space-y-3 p-4">
            {["one", "two", "three", "four", "five"].map((key) => (
              <div
                key={key}
                className="h-14 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </output>
        ) : paymentsQuery.isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-800">
              Unable to load payments
            </h2>
            <p className="mt-1 text-sm text-red-700">
              {paymentsQuery.error.message || "The payments request failed."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void paymentsQuery.refetch()}
              className="mt-4 border-red-300 bg-white text-red-800"
            >
              Retry
            </Button>
          </div>
        ) : payments.length === 0 ? (
          <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
            <div>
              <h2 className="font-semibold text-slate-900">
                No payments found
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Payment records will appear here when transactions are made.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-3 xl:hidden">
              {payments.map((payment) => (
                <article
                  key={payment.id}
                  className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/70 p-4 shadow-xs transition hover:border-indigo-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="break-words font-semibold text-slate-950">
                        {payment.organization?.name ??
                          "Organization unavailable"}
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {payment.subscription
                          ? `${payment.subscription.plan} subscription`
                          : "One-time payment"}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={STATUS_STYLES[payment.status]}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Amount
                      </p>
                      <p className="mt-1 break-words text-lg font-semibold text-slate-900">
                        {formatAmount(payment.amount, payment.currency)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Provider · date
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {payment.provider}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 truncate border-t border-slate-100 pt-3 font-mono text-xs text-slate-500">
                    {payment.transactionId}
                  </p>
                </article>
              ))}
            </div>
            <div className="hidden overflow-x-auto rounded-xl border border-slate-200 xl:block">
              <table className="w-full min-w-[800px] divide-y divide-slate-200 text-left">
                <caption className="sr-only">Platform payments</caption>
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Organization",
                      "Amount",
                      "Status",
                      "Provider",
                      "Transaction",
                      "Date",
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
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">
                          {payment.organization?.name ??
                            "Organization unavailable"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {payment.subscription
                            ? `${payment.subscription.plan} subscription`
                            : "One-time payment"}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-800">
                        {formatAmount(payment.amount, payment.currency)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge
                          variant="outline"
                          className={STATUS_STYLES[payment.status]}
                        >
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                        {payment.provider}
                      </td>
                      <td className="max-w-52 truncate px-4 py-3 font-mono text-xs text-slate-600">
                        {payment.transactionId}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                        {formatDate(payment.createdAt)}
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
              <div className="flex gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || paymentsQuery.isFetching}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || paymentsQuery.isFetching}
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
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
