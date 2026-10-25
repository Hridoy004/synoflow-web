"use client";

import { ArrowRight, Building2, Plus, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetMe, useOrganizations } from "@/hooks";
import { formatDate } from "@/lib/format";

function OverviewSkeleton() {
  return (
    <output
      aria-label="Loading workspace overview"
      className="grid gap-4 md:grid-cols-2"
    >
      {["one", "two", "three", "four"].map((key) => (
        <div
          key={key}
          className="h-32 animate-pulse rounded-2xl bg-slate-100"
        />
      ))}
    </output>
  );
}

export function UserDashboardOverview() {
  const userQuery = useGetMe();
  const organizationsQuery = useOrganizations({ page: 1, limit: 5 });
  const user = userQuery.data?.data;
  const organizationData = organizationsQuery.data?.data;
  const organizations = organizationData?.data ?? [];
  const organizationCount = organizationData?.meta.total ?? 0;

  if (userQuery.isPending || organizationsQuery.isPending) {
    return <OverviewSkeleton />;
  }

  if (userQuery.isError || organizationsQuery.isError || !user) {
    const error = userQuery.error ?? organizationsQuery.error;
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">
          Unable to load your workspace overview
        </h2>
        <p className="mt-1 text-sm text-red-700">
          {error?.message || "Please try refreshing the page."}
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            void userQuery.refetch();
            void organizationsQuery.refetch();
          }}
          className="mt-4 border-red-300 bg-white text-red-800"
        >
          Retry
        </Button>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#303BCE] via-[#4852F5] to-[#747CFF] p-5 text-white shadow-sm sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-24 -z-10 size-64 rounded-full border-[36px] border-white/10"
        />
        <p className="text-sm font-medium text-white/75">Your workspace</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back, {user.name || "there"}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
          Manage your organizations and collaborate with your teams from one
          place.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/user/organizations" />}
          className="mt-5 gap-2 bg-white text-[#3F49E8] hover:bg-white/90"
        >
          View organizations
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Organizations
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                {organizationCount.toLocaleString()}
              </p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-[#4852F5]">
              <Building2 className="size-5" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Organizations you belong to
          </p>
        </article>
        <article className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Account</p>
              <p className="mt-3 truncate text-lg font-semibold text-slate-950">
                {user.email}
              </p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <Users className="size-5" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Member since {formatDate(user.createdAt)}
          </p>
        </article>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-950">Your organizations</h2>
            <p className="mt-1 text-sm text-slate-500">
              Recent workspaces connected to your account.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/user/organizations" />}
            variant="outline"
            className="gap-2 self-start sm:self-auto"
          >
            <Plus className="size-4" aria-hidden="true" />
            Manage organizations
          </Button>
        </div>
        {organizations.length === 0 ? (
          <div className="p-8 text-center">
            <Building2
              className="mx-auto size-8 text-slate-300"
              aria-hidden="true"
            />
            <h3 className="mt-3 font-medium text-slate-900">
              No organizations yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create an organization or accept an invitation to get started.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {organizations.map((organization) => (
              <li key={organization.id}>
                <Link
                  href={`/user/organizations/${encodeURIComponent(organization.id)}`}
                  className="flex flex-col gap-3 p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">
                      {organization.name}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      /{organization.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        organization.role === "OWNER"
                          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }
                    >
                      {organization.role === "OWNER" ? "Owner" : "Member"}
                    </Badge>
                    <ArrowRight
                      className="size-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
