"use client";

import {
  Building2,
  CreditCard,
  RefreshCw,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminDashboardStats } from "@/hooks";

const PLAN_COLORS = ["#4852F5", "#16a34a", "#f59e0b", "#7c3aed", "#0891b2"];

function formatCount(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US").format(value);
}

function formatCurrency(
  value: number | string | null | undefined,
  currency: string,
) {
  if (value === null || value === undefined || !currency) return "—";
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
    return `${currency} ${new Intl.NumberFormat("en-BD").format(amount)}`;
  }
}

function MetricCard({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  icon: typeof Users;
}) {
  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 break-words text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {value}
          </p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#4852F5] transition-colors group-hover:bg-indigo-100">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{detail}</p>
    </article>
  );
}

function MetricSkeleton() {
  return (
    <output
      aria-label="Loading dashboard metrics"
      className="block h-36 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
    />
  );
}

function SubscriptionDistribution({
  plans,
}: {
  plans: { plan: string; count: number }[];
}) {
  const entries = plans.map((item, index) => ({
    ...item,
    count: Number.isFinite(item.count) ? Math.max(item.count, 0) : 0,
    color: PLAN_COLORS[index % PLAN_COLORS.length],
  }));
  const total = entries.reduce((sum, item) => sum + item.count, 0);

  let currentPercent = 0;
  const gradient = entries
    .filter((entry) => entry.count > 0)
    .map((entry) => {
      const start = currentPercent;
      currentPercent += (entry.count / total) * 100;
      return `${entry.color} ${start}% ${currentPercent}%`;
    })
    .join(", ");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
      <div>
        <h2 className="font-semibold text-slate-950">
          Subscription distribution
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Active subscriptions by plan
        </p>
      </div>

      {total === 0 ? (
        <div className="mt-6 flex min-h-44 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center text-sm text-slate-500">
          No subscription plan data is available yet.
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div
            aria-hidden="true"
            className="relative size-44 shrink-0 rounded-full"
            style={{ background: `conic-gradient(${gradient})` }}
          >
            <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-semibold text-slate-950">
                {formatCount(total)}
              </span>
              <span className="text-xs text-slate-500">subscriptions</span>
            </div>
          </div>
          <p className="sr-only">
            Subscription distribution chart. Total subscriptions:{" "}
            {formatCount(total)}.
          </p>
          <ul className="grid w-full gap-3 sm:max-w-56">
            {entries.map((entry) => (
              <li
                key={entry.plan}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2 text-slate-600">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: entry.color }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{entry.plan}</span>
                </span>
                <span className="font-medium tabular-nums text-slate-900">
                  {formatCount(entry.count)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function AdminDashboardOverview() {
  const statsQuery = useAdminDashboardStats();
  const stats = statsQuery.data?.data;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#303BCE] via-[#4852F5] to-[#747CFF] p-5 text-white shadow-sm sm:flex sm:items-end sm:justify-between sm:gap-6 sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-20 -z-10 size-64 rounded-full border-[36px] border-white/10"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Synoflow platform
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Platform overview
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
            Live activity and subscription metrics from your platform.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void statsQuery.refetch()}
          disabled={statsQuery.isFetching}
          className="mt-5 gap-2 border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:mt-0"
        >
          <RefreshCw
            className={`size-4 ${statsQuery.isFetching ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          Refresh
        </Button>
      </div>

      {statsQuery.isError || (!statsQuery.isPending && !stats) ? (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-800">
            {statsQuery.isError
              ? "Unable to load platform analytics"
              : "Platform analytics are unavailable"}
          </h2>
          <p className="mt-1 text-sm text-red-700">
            {statsQuery.isError
              ? statsQuery.error.message || "The dashboard request failed."
              : "The dashboard API returned no statistics."}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => void statsQuery.refetch()}
            className="mt-4 border-red-300 bg-white text-red-800 hover:bg-red-100"
          >
            Try again
          </Button>
        </section>
      ) : (
        <>
          <section
            aria-label="Platform key metrics"
            className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
          >
            {statsQuery.isPending || !stats ? (
              <>
                <MetricSkeleton />
                <MetricSkeleton />
                <MetricSkeleton />
                <MetricSkeleton />
                <MetricSkeleton />
                <MetricSkeleton />
              </>
            ) : (
              <>
                <MetricCard
                  title="Total users"
                  value={formatCount(stats.users.total)}
                  detail="Registered platform accounts"
                  icon={Users}
                />
                <MetricCard
                  title="New users · last 7 days"
                  value={formatCount(stats.users.newLast7Days)}
                  detail="New registrations in the past week"
                  icon={TrendingUp}
                />
                <MetricCard
                  title="Total organizations"
                  value={formatCount(stats.organizations.total)}
                  detail="Organizations on the platform"
                  icon={Building2}
                />
                <MetricCard
                  title="Active subscriptions"
                  value={formatCount(stats.subscriptions.activeTotal)}
                  detail="Currently active subscriptions"
                  icon={CreditCard}
                />
                <MetricCard
                  title="Current month revenue"
                  value={formatCurrency(
                    stats.revenue.currentMonth,
                    stats.revenue.currency,
                  )}
                  detail={`Reported in ${stats.revenue.currency}`}
                  icon={Wallet}
                />
                <MetricCard
                  title="New organizations · last 30 days"
                  value={formatCount(stats.organizations.newLast30Days)}
                  detail="Organizations created in the past month"
                  icon={Building2}
                />
              </>
            )}
          </section>

          {stats && (
            <div className="grid gap-4 xl:grid-cols-2">
              <SubscriptionDistribution
                plans={stats.subscriptions.byPlan ?? []}
              />

              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div>
                  <h2 className="font-semibold text-slate-950">
                    Recent platform growth
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Available registration summaries—historical daily data is
                    not provided by this endpoint.
                  </p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-indigo-50 p-4">
                    <p className="text-sm font-medium text-indigo-900">
                      New users · 7 days
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-indigo-950">
                      {formatCount(stats.users.newLast7Days)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-700">
                      New users · 30 days
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">
                      {formatCount(stats.users.newLast30Days)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                    <p className="text-sm font-medium text-slate-700">
                      New organizations · 30 days
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">
                      {formatCount(stats.organizations.newLast30Days)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-400">
                  Daily growth trends and historical revenue charts require
                  time-series data that is not included in the available API
                  response.
                </p>
              </section>
            </div>
          )}
        </>
      )}
    </div>
  );
}
