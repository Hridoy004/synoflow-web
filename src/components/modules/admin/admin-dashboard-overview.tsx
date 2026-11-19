"use client";

import { Button } from "@/components/ui/button";
import { memo } from "react";
import { useAdminDashboardGrowth, useAdminDashboardStats } from "@/hooks";
import type { AdminDashboardGrowth } from "@/types";
import {
  Building2,
  CreditCard,
  RefreshCw,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const PLAN_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const GrowthChart = memo(function GrowthChart({
  data,
  field,
  title,
  description,
  color,
  type,
}: {
  data: AdminDashboardGrowth["days"];
  field: "users" | "organizations";
  title: string;
  description: string;
  color: string;
  type: "bar" | "line";
}) {
  const width = 720;
  const height = 250;
  const margin = { top: 16, right: 12, bottom: 34, left: 36 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const values = data.map((item) => item[field]);
  const maxValue = Math.max(1, ...values);
  const x = (index: number) =>
    margin.left + (index / Math.max(data.length - 1, 1)) * chartWidth;
  const y = (value: number) =>
    margin.top + chartHeight - (value / maxValue) * chartHeight;
  const points = data.map((item, index) => `${x(index)},${y(item[field])}`).join(" ");
  const labelIndexes = [0, 6, 12, 18, 24, 29].filter((index) => index < data.length);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h3 className="font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {data.length === 0 ? (
        <div className="mt-5 flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
          No daily activity is available.
        </div>
      ) : (
        <>
          <svg
            role="img"
            aria-label={`${title} over the past 30 days`}
            viewBox={`0 0 ${width} ${height}`}
            className="mt-4 h-auto w-full overflow-visible"
          >
            <title>{title}</title>
            <desc>{description}</desc>
            {[0, 0.5, 1].map((step) => {
              const value = Math.round(maxValue * step);
              const yPosition = y(value);
              return (
                <g key={step}>
                  <line
                    x1={margin.left}
                    y1={yPosition}
                    x2={width - margin.right}
                    y2={yPosition}
                    stroke="var(--border)"
                    strokeDasharray={step === 0 ? undefined : "4 4"}
                  />
                  <text
                    x={margin.left - 8}
                    y={yPosition + 4}
                    textAnchor="end"
                    className="fill-slate-400"
                    fontSize="11"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            {type === "line" ? (
              <>
                <polyline
                  points={points}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {data.map((item, index) => (
                  <circle
                    key={item.date}
                    cx={x(index)}
                    cy={y(item[field])}
                    r="3"
                    fill={color}
                  />
                ))}
              </>
            ) : (
              data.map((item, index) => {
                const barWidth = Math.max(3, chartWidth / data.length - 3);
                return (
                  <rect
                    key={item.date}
                    x={x(index) - barWidth / 2}
                    y={y(item[field])}
                    width={barWidth}
                    height={Math.max(1, margin.top + chartHeight - y(item[field]))}
                    rx="2"
                    fill={color}
                  >
                    <title>
                      {item.date}: {formatCount(item[field])}
                    </title>
                  </rect>
                );
              })
            )}
            {labelIndexes.map((index) => (
              <text
                key={data[index].date}
                x={x(index)}
                y={height - 8}
                textAnchor="middle"
                className="fill-slate-400"
                fontSize="11"
              >
                {new Date(`${data[index].date}T00:00:00Z`).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", timeZone: "UTC" },
                )}
              </text>
            ))}
          </svg>
          <p className="sr-only">
            {title}:{" "}
            {data
              .map((item) => `${item.date}: ${item[field]}`)
              .join("; ")}
          </p>
        </>
      )}
    </section>
  );
});

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

const MetricCard = memo(function MetricCard({
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
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{detail}</p>
    </article>
  );
});

function MetricSkeleton() {
  return (
    <output
      aria-label="Loading dashboard metrics"
      className="block h-36 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
    />
  );
}

const SubscriptionDistribution = memo(function SubscriptionDistribution({
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
});

export function AdminDashboardOverview() {
  const statsQuery = useAdminDashboardStats();
  const growthQuery = useAdminDashboardGrowth();
  const stats = statsQuery.data?.data;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <div className="brand-gradient relative isolate overflow-hidden rounded-2xl p-5 text-white shadow-sm sm:flex sm:items-end sm:justify-between sm:gap-6 sm:p-7">
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
          onClick={() => {
            void statsQuery.refetch();
            void growthQuery.refetch();
          }}
          disabled={statsQuery.isFetching || growthQuery.isFetching}
          className="mt-5 gap-2 border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:mt-0"
        >
          <RefreshCw
            className={`size-4 ${statsQuery.isFetching || growthQuery.isFetching ? "animate-spin" : ""}`}
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

              {growthQuery.isPending ? (
                <>
                  <MetricSkeleton />
                  <MetricSkeleton />
                </>
              ) : growthQuery.isError || !growthQuery.data?.data ? (
                <section
                  role="alert"
                  className="rounded-2xl border border-red-200 bg-red-50 p-5 xl:col-span-2"
                >
                  <h2 className="font-semibold text-red-800">
                    Unable to load daily growth charts
                  </h2>
                  <p className="mt-1 text-sm text-red-700">
                    {growthQuery.error?.message ||
                      "The analytics API returned no chart data."}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void growthQuery.refetch()}
                    className="mt-4 border-red-300 bg-white text-red-800 hover:bg-red-100"
                  >
                    Try again
                  </Button>
                </section>
              ) : (
                <>
                  <GrowthChart
                    data={growthQuery.data.data.days}
                    field="users"
                    title="Daily user registrations"
                    description="New active accounts each day over the past 30 days."
                    color="var(--chart-1)"
                    type="line"
                  />
                  <GrowthChart
                    data={growthQuery.data.data.days}
                    field="organizations"
                    title="Daily organization creation"
                    description="Organizations created each day over the past 30 days."
                    color="var(--chart-2)"
                    type="bar"
                  />
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
