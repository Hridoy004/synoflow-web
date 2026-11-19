import type { OrganizationRole } from "@/types";

export const MEMBERS_PAGE_SIZE = 10;
export const ACTIVITIES_PAGE_SIZE = 10;

export const ROLE_LABELS: Record<OrganizationRole, string> = {
  OWNER: "Owner",
  MEMBER: "Member",
};

export type RoleFilter = "ALL" | OrganizationRole;

export const inputClass =
  "h-11 rounded-lg border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-primary/20";

export const selectClass =
  "h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
