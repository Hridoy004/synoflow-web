"use client";

import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrganizations } from "@/hooks";
import { useUrlQueryState } from "@/hooks/use-url-query-state";
import { cn } from "@/lib/utils";
import type { Organization } from "@/types";

import { DeleteOrganizationDialog } from "./delete-organization-dialog";
import { OrganizationCard } from "./organization-card";
import { OrganizationFormDialog } from "./organization-form-dialog";
import {
  OrganizationEmptyState,
  OrganizationErrorState,
  OrganizationGridSkeleton,
} from "./organization-states";

const PAGE_SIZE = 9;

interface DialogState {
  open: boolean;
  organization?: Organization;
}

export function OrganizationList() {
  const query = useUrlQueryState();
  const page = query.getPage();
  const search = query.get("search");
  const view = query.get("view") === "list" ? "list" : "grid";

  const [formDialog, setFormDialog] = useState<DialogState>({
    open: false,
  });

  const [deleteDialog, setDeleteDialog] = useState<DialogState>({
    open: false,
  });

  const { data, isPending, isError, error, refetch, isPlaceholderData } =
    useOrganizations({
      page,
      limit: PAGE_SIZE,
    });

  const organizations = data?.data.data ?? [];
  const meta = data?.data.meta;

  // Client-side search for the currently loaded page.
  const filteredOrganizations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return organizations;

    return organizations.filter(
      (organization) =>
        organization.name.toLowerCase().includes(query) ||
        organization.slug.toLowerCase().includes(query) ||
        organization.description?.toLowerCase().includes(query),
    );
  }, [organizations, search]);

  const openCreate = () => setFormDialog({ open: true });

  const openEdit = (organization: Organization) =>
    setFormDialog({ open: true, organization });

  const openDelete = (organization: Organization) =>
    setDeleteDialog({ open: true, organization });

  const handleDeleted = () => {
    if (organizations.length === 1 && page > 1) {
      query.set({ page: page - 1 });
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-7">
      {/* Page introduction: no duplicate Organizations heading */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm leading-6 text-slate-500">
            Manage your organizations, members, and workspaces.
          </p>

          {!isPending && !isError && meta && (
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">{meta.total}</span>{" "}
              {meta.total === 1 ? "organization" : "organizations"} in your
              workspace
            </p>
          )}
        </div>

        <Button
          onClick={openCreate}
          className="h-10 shrink-0 gap-2 rounded-lg bg-blue-600 px-4 text-white shadow-sm hover:bg-blue-700"
        >
          <Plus className="size-4" />
          Create organization
        </Button>
      </div>

      {/* Search and view controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={search}
            onChange={(event) =>
              query.set({ search: event.target.value, page: 1 })
            }
            placeholder="Search organizations..."
            aria-label="Search organizations"
            className="h-10 rounded-lg border-slate-200 bg-white pl-9 shadow-none focus-visible:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-10 gap-2 rounded-lg border-slate-200 text-slate-600"
            onClick={() => {
              query.set({ search: null, page: 1 });
            }}
          >
            <SlidersHorizontal className="size-4" />
            Clear filters
          </Button>

          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => query.set({ view: "grid" })}
              className={cn(
                "size-8 rounded-md",
                view === "grid" && "bg-blue-50 text-blue-700 hover:bg-blue-50",
              )}
            >
              <LayoutGrid className="size-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => query.set({ view: "list" })}
              className={cn(
                "size-8 rounded-md",
                view === "list" && "bg-blue-50 text-blue-700 hover:bg-blue-50",
              )}
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Organization results */}
      {isPending ? (
        <OrganizationGridSkeleton />
      ) : isError ? (
        <OrganizationErrorState
          message={error.message}
          onRetry={() => refetch()}
        />
      ) : organizations.length === 0 ? (
        <OrganizationEmptyState onCreate={openCreate} />
      ) : filteredOrganizations.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-6 text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-slate-100">
            <Search className="size-5 text-slate-500" />
          </div>

          <h2 className="font-semibold text-slate-900">
            No organizations found
          </h2>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Try a different name or slug, or clear your search.
          </p>

          <Button
            variant="outline"
            className="mt-4 rounded-lg"
            onClick={() => query.set({ search: null })}
          >
            Clear search
          </Button>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "grid gap-5 transition-opacity",
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1",
              isPlaceholderData && "opacity-60",
            )}
          >
            {filteredOrganizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <nav
              aria-label="Organization pagination"
              className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-medium text-slate-900">{meta.page}</span>{" "}
                of {meta.totalPages}
                <span className="mx-2 text-slate-300">·</span>
                {meta.total} total organizations
              </p>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => query.set({ page: page - 1 })}
                  disabled={meta.page <= 1 || isPlaceholderData}
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => query.set({ page: page + 1 })}
                  disabled={meta.page >= meta.totalPages || isPlaceholderData}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </nav>
          )}
        </>
      )}

      <OrganizationFormDialog
        open={formDialog.open}
        onOpenChange={(open) =>
          setFormDialog((current) => (open ? current : { open: false }))
        }
        organization={formDialog.organization}
      />

      <DeleteOrganizationDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog((current) => (open ? current : { open: false }))
        }
        organization={deleteDialog.organization}
        onDeleted={handleDeleted}
      />
    </section>
  );
}
