"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useAdminUsers, useGetMe, useUpdateAdminUserRole } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import { useUrlQueryState } from "@/hooks/use-url-query-state";
import { formatDate } from "@/lib/format";
import type { AdminUser, SystemRole, UserStatus } from "@/types";

const PAGE_SIZE = 20;
const SYSTEM_ROLES: SystemRole[] = ["USER", "ADMIN", "SUPER_ADMIN"];
const SYSTEM_ROLE_LABELS: Record<SystemRole, string> = {
  USER: "User",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super admin",
};
const STATUS_STYLES: Record<UserStatus, string> = {
  ACTIVE: "border-green-200 bg-green-50 text-green-700",
  SUSPENDED: "border-amber-200 bg-amber-50 text-amber-700",
};

type RoleChange = {
  user: AdminUser;
  systemRole: SystemRole;
};

function getInitials(name: string, email: string) {
  const source = name.trim() || email;
  return (
    source
      .split(/[\s@._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

function getErrorMessage(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return "Please try again.";
  }

  const apiError = error as {
    message?: unknown;
    data?: { message?: unknown };
  };

  if (typeof apiError.data?.message === "string") {
    return apiError.data.message;
  }
  return typeof apiError.message === "string"
    ? apiError.message
    : "Please try again.";
}

function getProviderLabel(provider: string) {
  return provider
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function UserTableSkeleton() {
  const skeletonRows = ["first", "second", "third", "fourth", "fifth", "sixth"];

  return (
    <output aria-label="Loading users" className="block space-y-3 p-4">
      {skeletonRows.map((row) => (
        <div key={row} className="h-14 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </output>
  );
}

function UserTableRow({
  user,
  currentUserId,
  canChangeRoles,
  isUpdating,
  onRequestRoleChange,
}: {
  user: AdminUser;
  currentUserId?: string;
  canChangeRoles: boolean;
  isUpdating: boolean;
  onRequestRoleChange: (user: AdminUser, systemRole: SystemRole) => void;
}) {
  const isSelf = !currentUserId || user.id === currentUserId;

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50/70">
      <td className="px-4 py-3">
        <div className="flex min-w-48 items-center gap-3">
          <Avatar className="size-9 shrink-0">
            <AvatarImage src={user.imageUrl || undefined} alt={user.name} />
            <AvatarFallback className="bg-indigo-50 font-medium text-[#3A43D6]">
              {getInitials(user.name, user.email)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              {user.name || "Unnamed user"}
            </p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
        {user.email}
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <Badge
          variant="outline"
          className="border-indigo-200 bg-indigo-50 text-indigo-700"
        >
          {SYSTEM_ROLE_LABELS[user.systemRole]}
        </Badge>
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <Badge variant="outline" className={STATUS_STYLES[user.status]}>
          {user.status}
        </Badge>
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
        {getProviderLabel(user.authProvider)}
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        {user.emailVerified ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-700">
            <Check className="size-4" aria-hidden="true" />
            Verified
          </span>
        ) : (
          <span className="text-sm text-slate-500">Not verified</span>
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
        {formatDate(user.createdAt)}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        {canChangeRoles && (
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={`Change system role for ${user.name || user.email}`}
              disabled={isSelf || isUpdating}
              className="inline-flex size-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40"
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-44">
              {SYSTEM_ROLES.map((systemRole) => (
                <DropdownMenuItem
                  key={systemRole}
                  disabled={systemRole === user.systemRole || isUpdating}
                  onClick={() => onRequestRoleChange(user, systemRole)}
                >
                  Set as {SYSTEM_ROLE_LABELS[systemRole]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </td>
    </tr>
  );
}

export function UserManagement() {
  const query = useUrlQueryState();
  const search = query.get("search");
  const rawStatus = query.get("status");
  const status: UserStatus | "" =
    rawStatus === "ACTIVE" || rawStatus === "SUSPENDED" ? rawStatus : "";
  const rawRole = query.get("systemRole");
  const systemRole = SYSTEM_ROLES.find((role) => role === rawRole) ?? "";
  const page = query.getPage();
  const [roleChange, setRoleChange] = useState<RoleChange | null>(null);
  const debouncedSearch = useDebounce(search.trim(), 350);

  const filters = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(status ? { status } : {}),
      ...(systemRole ? { systemRole } : {}),
    }),
    [page, debouncedSearch, status, systemRole],
  );

  const usersQuery = useAdminUsers(filters);
  const { data: currentUser } = useGetMe();
  const { mutate: changeRole, isPending: isChangingRole } =
    useUpdateAdminUserRole();
  const users = usersQuery.data?.data ?? [];
  const meta = usersQuery.data?.meta;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const hasFilters = Boolean(search || status || systemRole);

  const clearFilters = () => {
    query.set({ search: null, status: null, systemRole: null, page: 1 });
  };

  const handleRoleChange = () => {
    if (!roleChange) return;

    changeRole(
      {
        userId: roleChange.user.id,
        systemRole: roleChange.systemRole,
      },
      {
        onSuccess: () => {
          toast.add({
            title: "System role updated",
            description: `${roleChange.user.name || roleChange.user.email} is now ${SYSTEM_ROLE_LABELS[roleChange.systemRole]}.`,
            type: "success",
          });
          setRoleChange(null);
        },
        onError: (error) =>
          toast.add({
            title: "Could not update system role",
            description: getErrorMessage(error),
            type: "error",
          }),
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-sm text-slate-500">
            Search, filter, and manage platform accounts.
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <UserRound className="size-4 text-slate-400" aria-hidden="true" />
            {meta ? `${meta.total.toLocaleString()} users` : "Users"}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void usersQuery.refetch()}
          disabled={usersQuery.isFetching}
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw
            className={`size-4 ${usersQuery.isFetching ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          Refresh
        </Button>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <Input
              value={search}
              onChange={(event) => {
                query.set({ search: event.target.value, page: 1 });
              }}
              placeholder="Search name or email"
              aria-label="Search users by name or email"
              className="h-10 pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter by account status"
              value={status}
              onChange={(event) => {
                query.set({
                  status: event.target.value,
                  page: 1,
                });
              }}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] sm:w-auto"
            >
              <option value="">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
            <select
              aria-label="Filter by system role"
              value={systemRole}
              onChange={(event) => {
                query.set({ systemRole: event.target.value, page: 1 });
              }}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] sm:w-auto"
            >
              <option value="">All roles</option>
              {SYSTEM_ROLES.map((role) => (
                <option key={role} value={role}>
                  {SYSTEM_ROLE_LABELS[role]}
                </option>
              ))}
            </select>
            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                onClick={clearFilters}
                className="gap-1.5 text-slate-600"
              >
                <X className="size-4" aria-hidden="true" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {usersQuery.isPending ? (
          <UserTableSkeleton />
        ) : usersQuery.isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-medium text-red-800">Unable to load users</p>
            <p className="mt-1 text-sm text-red-700">
              {usersQuery.error.message || "The users request failed."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void usersQuery.refetch()}
              className="mt-4 border-red-300 bg-white text-red-800"
            >
              Retry
            </Button>
          </div>
        ) : users.length === 0 ? (
          <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
            <Search className="size-6 text-slate-400" aria-hidden="true" />
            <h2 className="mt-3 font-semibold text-slate-900">
              {hasFilters ? "No matching users" : "No users yet"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {hasFilters
                ? "Try changing your search or filters."
                : "User accounts will appear here when available."}
            </p>
            {hasFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-3 2xl:hidden">
              {users.map((user) => {
                const canChangeRoles =
                  currentUser?.data?.systemRole === "SUPER_ADMIN";
                const isSelf =
                  !currentUser?.data?.id || user.id === currentUser.data.id;
                return (
                  <article
                    key={user.id}
                    className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/70 p-4 shadow-xs transition hover:border-indigo-200 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="size-10 shrink-0">
                        <AvatarImage
                          src={user.imageUrl || undefined}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-indigo-50 font-medium text-[#3A43D6]">
                          {getInitials(user.name, user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-slate-950">
                          {user.name || "Unnamed user"}
                        </p>
                        <p className="break-all text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                      {canChangeRoles && (
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            aria-label={`Change system role for ${user.name || user.email}`}
                            disabled={isSelf || isChangingRole}
                            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40"
                          >
                            <MoreHorizontal className="size-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="min-w-44">
                            {SYSTEM_ROLES.map((nextRole) => (
                              <DropdownMenuItem
                                key={nextRole}
                                disabled={
                                  nextRole === user.systemRole || isChangingRole
                                }
                                onClick={() =>
                                  setRoleChange({ user, systemRole: nextRole })
                                }
                              >
                                Set as {SYSTEM_ROLE_LABELS[nextRole]}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                      <Badge
                        variant="outline"
                        className="border-indigo-200 bg-indigo-50 text-indigo-700"
                      >
                        {SYSTEM_ROLE_LABELS[user.systemRole]}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={STATUS_STYLES[user.status]}
                      >
                        {user.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-slate-200 bg-white text-slate-600"
                      >
                        {getProviderLabel(user.authProvider)}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        {user.emailVerified ? (
                          <>
                            <Check
                              className="size-3.5 text-green-600"
                              aria-hidden="true"
                            />
                            Verified
                          </>
                        ) : (
                          "Not verified"
                        )}
                      </span>
                      <span>Joined {formatDate(user.createdAt)}</span>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="hidden overflow-x-auto rounded-xl border border-slate-200 2xl:block">
              <table className="w-full min-w-[1120px] divide-y divide-slate-200 text-left">
                <caption className="sr-only">Platform users</caption>
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "User",
                      "Email",
                      "System role",
                      "Status",
                      "Provider",
                      "Email verification",
                      "Created",
                      "Actions",
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
                <tbody className="divide-y divide-slate-100 bg-white">
                  {users.map((user) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      currentUserId={currentUser?.data?.id}
                      canChangeRoles={
                        currentUser?.data?.systemRole === "SUPER_ADMIN"
                      }
                      isUpdating={isChangingRole}
                      onRequestRoleChange={(targetUser, nextRole) =>
                        setRoleChange({
                          user: targetUser,
                          systemRole: nextRole,
                        })
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                {meta
                  ? `Page ${meta.page} of ${totalPages} · ${meta.total.toLocaleString()} users`
                  : `Page ${page}`}
              </p>
              <div className="flex items-center gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || usersQuery.isFetching}
                  onClick={() => query.set({ page: Math.max(page - 1, 1) })}
                  className="gap-1"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || usersQuery.isFetching}
                  onClick={() =>
                    query.set({ page: Math.min(page + 1, totalPages) })
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

      <Dialog
        open={Boolean(roleChange)}
        onOpenChange={(open) => {
          if (!open && !isChangingRole) setRoleChange(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm system role change</DialogTitle>
            <DialogDescription>
              Review this sensitive account permission change before applying
              it.
            </DialogDescription>
          </DialogHeader>
          {roleChange && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <p className="font-medium text-slate-900">
                {roleChange.user.name || roleChange.user.email}
              </p>
              <p className="mt-2 text-slate-600">
                Current role:{" "}
                <span className="font-medium text-slate-900">
                  {SYSTEM_ROLE_LABELS[roleChange.user.systemRole]}
                </span>
              </p>
              <p className="mt-1 text-slate-600">
                New role:{" "}
                <span className="font-medium text-slate-900">
                  {SYSTEM_ROLE_LABELS[roleChange.systemRole]}
                </span>
              </p>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                This change alters the user&apos;s platform-level permissions.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isChangingRole}
              onClick={() => setRoleChange(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isChangingRole}
              onClick={handleRoleChange}
              className="bg-[#4852F5] text-white hover:bg-[#3A43D6]"
            >
              <ShieldCheck className="size-4" aria-hidden="true" />
              {isChangingRole ? "Updating..." : "Confirm change"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
