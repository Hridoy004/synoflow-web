"use client";

import { RefreshCw, Search, ShieldCheck, UserPlus, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  useGetMe,
  useOrganizationMembers,
  useUpdateOrganizationMemberRole,
} from "@/hooks";
import { useUrlQueryState } from "@/hooks/use-url-query-state";
import { cn } from "@/lib/utils";
import type { OrganizationMember, OrganizationRole } from "@/types";
import { EmptyState, ErrorState, ListSkeleton } from "../list-states";
import { OrganizationPagination } from "../organization-pagination";
import {
  inputClass,
  MEMBERS_PAGE_SIZE,
  ROLE_LABELS,
  type RoleFilter,
  selectClass,
} from "./constants";
import { InviteMemberDialog } from "./invite-member-dialog";
import { MembersTable } from "./members-table";
import { RemoveMemberDialog } from "./remove-member-dialog";
import { filterMembers, getMemberName } from "./utils";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>{label}</span>
        <Icon className="size-4 text-slate-400" />
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export function OrganizationMembersPanel({
  orgId,
  canManageMembers,
}: {
  orgId: string;
  canManageMembers: boolean;
}) {
  const query = useUrlQueryState();
  const search = query.get("search");
  const rawRole = query.get("role");
  const roleFilter: RoleFilter =
    rawRole === "OWNER" || rawRole === "MEMBER" ? rawRole : "ALL";
  const page = query.getPage();
  const setQuery = query.set;
  const [inviteOpen, setInviteOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] =
    useState<OrganizationMember | null>(null);

  const { data: currentUser } = useGetMe();
  const currentUserId = currentUser?.data?.id;

  const membersQuery = useOrganizationMembers(orgId, {
    page,
    limit: MEMBERS_PAGE_SIZE,
  });
  const members = useMemo(
    () => membersQuery.data?.data ?? [],
    [membersQuery.data],
  );
  const meta = membersQuery.data?.meta;

  const { mutate: updateMemberRole, isPending: isUpdatingRole } =
    useUpdateOrganizationMemberRole(orgId);

  // Keep the page in range after a removal shrinks the list.
  useEffect(() => {
    if (meta && page > Math.max(meta.totalPages, 1)) {
      setQuery({ page: Math.max(meta.totalPages, 1) });
    }
  }, [meta, page, setQuery]);

  const filteredMembers = useMemo(
    () => filterMembers(members, search, roleFilter),
    [members, search, roleFilter],
  );
  const ownerCount = members.filter((m) => m.role === "OWNER").length;

  const resetFilters = () => {
    query.set({ search: null, role: null, page: 1 });
  };

  const handleRoleChange = (
    member: OrganizationMember,
    role: OrganizationRole,
  ) => {
    updateMemberRole(
      { memberId: member.memberId, role },
      {
        onSuccess: () =>
          toast.add({
            title: "Role updated",
            description: `${getMemberName(member)} is now a ${ROLE_LABELS[role]}.`,
            type: "success",
          }),
        onError: (error: Error & { data?: { message?: unknown } }) =>
          toast.add({
            title: "Role update failed",
            description:
              (typeof error.data?.message === "string"
                ? error.data.message
                : error.message) || "Please try again.",
            type: "error",
          }),
      },
    );
  };

  const renderList = () => {
    if (membersQuery.isPending) return <ListSkeleton />;

    if (membersQuery.isError) {
      return (
        <ErrorState
          title="Unable to load members"
          message={membersQuery.error?.message}
          onRetry={() => void membersQuery.refetch()}
        />
      );
    }

    if (filteredMembers.length === 0) {
      return (
        <EmptyState
          icon={Search}
          title="No members found"
          description="Try a different search or invite a teammate to get started."
        />
      );
    }

    return (
      <>
        <MembersTable
          members={filteredMembers}
          currentUserId={currentUserId}
          canManage={canManageMembers}
          isUpdatingRole={isUpdatingRole}
          onChangeRole={handleRoleChange}
          onRemove={setMemberToRemove}
        />
        {meta && (
          <OrganizationPagination
            meta={meta}
            onPageChange={(nextPage) => query.set({ page: nextPage })}
            disabled={isUpdatingRole}
          />
        )}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Members &amp; access
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage who can access this organization.
            </p>
          </div>

          {canManageMembers && (
            <Button
              type="button"
              className="gap-2 rounded-lg bg-[#4852F5] px-4 text-white shadow-sm hover:bg-[#3A43D6]"
              onClick={() => setInviteOpen(true)}
            >
              <UserPlus className="size-4" />
              Invite member
            </Button>
          )}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <StatCard
            label="Total members"
            value={meta?.total ?? members.length}
            icon={Users}
          />
          <StatCard
            label="Owners on this page"
            value={ownerCount}
            icon={ShieldCheck}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => {
                query.set({ search: event.target.value, page: 1 });
              }}
              placeholder="Search members..."
              aria-label="Search members"
              className={cn("pl-9", inputClass)}
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              aria-label="Filter members by role"
              value={roleFilter}
              onChange={(event) => {
                query.set({ role: event.target.value, page: 1 });
              }}
              className={selectClass}
            >
              <option value="ALL">All roles</option>
              <option value="OWNER">Owner</option>
              <option value="MEMBER">Member</option>
            </select>

            <Button
              type="button"
              variant="outline"
              className="h-11 gap-2 rounded-lg border-slate-200 text-slate-600"
              onClick={resetFilters}
            >
              <RefreshCw className="size-4" />
              Reset
            </Button>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Search and role filters apply to the current page.
        </p>

        <div className="mt-5">{renderList()}</div>
      </section>

      <InviteMemberDialog
        orgId={orgId}
        open={inviteOpen}
        onOpenChange={setInviteOpen}
      />
      <RemoveMemberDialog
        orgId={orgId}
        member={memberToRemove}
        onClose={() => setMemberToRemove(null)}
      />
    </div>
  );
}
