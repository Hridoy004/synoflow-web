import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Organization } from "@/types";

interface OrganizationCardProps {
  organization: Organization;
  onEdit: (organization: Organization) => void;
  onDelete: (organization: Organization) => void;
}
function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "O"
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

function formatDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : dateFormatter.format(date);
}

export function OrganizationCard({
  organization,
  onEdit,
  onDelete,
}: OrganizationCardProps) {
  const isOwner = organization.role === "OWNER";

  return (
    <article className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white"
          >
            {getInitials(organization.name)}
          </span>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              <Link
                href={`/user/organizations/${encodeURIComponent(organization.id)}`}
                className="rounded-sm after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {organization.name}
              </Link>
            </h3>
            <p className="truncate font-mono text-xs text-slate-500">
              /{organization.slug}
            </p>
          </div>
        </div>

        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={`Actions for ${organization.name}`}
              className="relative z-10 grid size-8 shrink-0 place-items-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(organization)}>
                <Pencil className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(organization)}
                className="text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <Trash2 className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <p
        className={cn(
          "line-clamp-2 min-h-10 text-sm",
          organization.description ? "text-slate-600" : "italic text-slate-400",
        )}
      >
        {organization.description ?? "No description provided."}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 font-medium",
            isOwner
              ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
              : "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
          )}
        >
          {isOwner ? "Owner" : "Member"}
        </span>
        <span className="flex items-center gap-1.5 text-slate-500">
          <CalendarDays className="size-3.5" />
          {formatDate(organization.createdAt)}
        </span>
      </div>
    </article>
  );
}
