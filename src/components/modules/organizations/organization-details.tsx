"use client";

import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Clock3,
  CreditCard,
  FolderKanban,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useOrganization } from "@/hooks";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Organization } from "@/types";
import { OrganizationActivityPanel } from "./members/activity-panel";
import { OrganizationMembersPanel } from "./members/members-panel";

const TABS = [
  { id: "general", label: "Overview", icon: Building2 },
  { id: "members", label: "Members", icon: Users },
  { id: "activity", label: "Activity", icon: Activity },
] as const;

type TabId = (typeof TABS)[number]["id"];

function OrganizationTabs({
  activeTab,
  onChange,
}: {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
      <div
        role="tablist"
        aria-label="Organization sections"
        className="grid grid-cols-3 gap-1"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(id)}
              className={cn(
                "flex min-h-10 items-center justify-center gap-2 rounded-xl px-2 py-2 text-xs font-semibold transition-colors sm:text-sm",
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OrganizationGeneral({ organization }: { organization: Organization }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
            <Building2 className="size-4 text-indigo-600" />
            About this organization
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Description
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {organization.description ||
                "Add a description to tell members what this organization is for."}
            </p>
          </div>
          <div className="grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <CalendarDays className="size-4" />
                Created
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {formatDate(organization.createdAt)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Clock3 className="size-4" />
                Last updated
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {formatDate(organization.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
            <ShieldCheck className="size-4 text-indigo-600" />
            Your access
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {organization.role === "OWNER"
                  ? "Organization owner"
                  : "Organization member"}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {organization.role === "OWNER"
                  ? "You can manage members, teams, and organization settings."
                  : "You can collaborate in this organization and its workspaces."}
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-indigo-200 bg-white text-indigo-700"
            >
              {organization.role}
            </Badge>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Need to change access? Contact an organization owner.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function OrganizationActivity({ orgId }: { orgId: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent organization activity
        </h2>
        <p className="text-sm text-slate-500">
          Track adds, role changes, and key team updates.
        </p>
      </div>

      <OrganizationActivityPanel orgId={orgId} />
    </div>
  );
}

export function OrganizationDetails({ orgId }: { orgId: string }) {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const { data, isPending, isError, error, refetch } = useOrganization(orgId);

  if (isPending) {
    return (
      <output
        aria-label="Loading organization"
        className="block h-48 animate-pulse rounded-xl bg-muted"
      />
    );
  }

  const organization = data?.data;

  if (isError || !organization) {
    return (
      <div className="space-y-3 rounded-xl border p-8 text-center">
        <h2 className="font-semibold">Unable to load organization</h2>
        <p className="text-sm text-muted-foreground">
          {error?.message ?? "Organization not found."}
        </p>
        <Button variant="outline" onClick={() => void refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <Link
        href="/user/organizations"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-700"
      >
        <ArrowLeft className="size-4" />
        All organizations
      </Link>

      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 px-5 py-6 text-white shadow-lg shadow-indigo-950/10 sm:px-8 sm:py-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -right-16 -z-10 size-80 rounded-full border-[42px] border-white/[0.06]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -bottom-44 -z-10 size-80 rounded-full bg-indigo-400/15 blur-3xl"
        />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner sm:size-16">
              <Building2 className="size-7 text-indigo-100 sm:size-8" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.18em] text-indigo-200 uppercase">
                Organization workspace
              </p>
              <h1 className="mt-2 break-words text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {organization.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-indigo-100">
                  /{organization.slug}
                </span>
                <Badge className="border border-white/20 bg-white/10 text-white">
                  {organization.role === "OWNER" ? "Owner" : "Member"}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            nativeButton={false}
            variant="outline"
            render={
              <Link
                href={`/user/organizations/${encodeURIComponent(orgId)}/subscription`}
              />
            }
            className="h-10 w-full gap-2 border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white sm:w-auto"
          >
            <CreditCard className="size-4" />
            Subscription & billing
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-indigo-100/80 sm:ml-20 sm:mt-4">
          {organization.description ||
            "Your shared space for people, projects, and coordinated work."}
        </p>
      </section>

      <section
        aria-label="Workspace shortcuts"
        className="grid gap-3 sm:grid-cols-3"
      >
        {[
          {
            label: "Teams",
            detail: "Organize people into focused groups",
            href: "teams",
            icon: Users,
            tint: "bg-violet-50 text-violet-700",
          },
          {
            label: "Projects",
            detail: "Plan work and track delivery",
            href: "projects",
            icon: FolderKanban,
            tint: "bg-indigo-50 text-indigo-700",
          },
          {
            label: "Labels",
            detail: "Keep work categorized consistently",
            href: "labels",
            icon: Layers3,
            tint: "bg-amber-50 text-amber-700",
          },
        ].map(({ label, detail, href, icon: Icon, tint }) => (
          <Link
            key={href}
            href={`/user/organizations/${encodeURIComponent(orgId)}/${href}`}
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-5"
          >
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tint}`}
            >
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-900">
                {label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {detail}
              </span>
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-slate-400 transition group-hover:text-indigo-600" />
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <OrganizationTabs activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "general" && (
          <OrganizationGeneral organization={organization} />
        )}
        {activeTab === "members" && (
          <OrganizationMembersPanel
            orgId={orgId}
            canManageMembers={organization.role === "OWNER"}
          />
        )}
        {activeTab === "activity" && <OrganizationActivity orgId={orgId} />}
      </section>
    </div>
  );
}
