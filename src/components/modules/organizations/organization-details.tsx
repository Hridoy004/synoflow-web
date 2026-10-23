"use client";

import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrganization } from "@/hooks";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Organization } from "@/types";
import { OrganizationActivityPanel } from "./members/activity-panel";
import { OrganizationMembersPanel } from "./members/members-panel";

const TABS = [
  { id: "general", label: "General" },
  { id: "members", label: "Members" },
  { id: "activity", label: "Activity" },
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
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
      <div
        role="tablist"
        aria-label="Organization sections"
        className="flex flex-wrap items-center gap-2"
      >
        {TABS.map(({ id, label }) => {
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(id)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#F3F4FF] text-[#3A43D6] ring-1 ring-[#CED2FF]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

function OrganizationGeneral({ organization }: { organization: Organization }) {
  const initial = organization.name.trim().charAt(0).toUpperCase() || "O";

  return (
    <Card className="overflow-hidden">
      <div className="h-2 bg-primary" />

      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
          {initial}
        </div>

        <div className="min-w-0 space-y-2">
          <CardTitle className="text-2xl">{organization.name}</CardTitle>
          <p className="text-sm text-muted-foreground">/{organization.slug}</p>
          <Badge
            variant={organization.role === "OWNER" ? "default" : "secondary"}
          >
            {organization.role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Description</h3>
          <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
            {organization.description || "No description added yet."}
          </p>
        </div>

        <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
          <MetaItem
            icon={CalendarDays}
            label="Created"
            value={formatDate(organization.createdAt)}
          />
          <MetaItem
            icon={Clock3}
            label="Last updated"
            value={formatDate(organization.updatedAt)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function OrganizationActivity({ orgId }: { orgId: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
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
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="/user/organizations" />}
      >
        <ArrowLeft className="mr-2 size-4" />
        All organizations
      </Button>

      <Button
        variant="outline"
        nativeButton={false}
        render={
          <Link
            href={`/user/organizations/${encodeURIComponent(orgId)}/subscription`}
          />
        }
      >
        Subscription & billing
      </Button>

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
    </div>
  );
}
