import type { OrganizationMember } from "@/types";
import type { RoleFilter } from "./constants";

export function getMemberName(member: OrganizationMember) {
  return member.user?.name?.trim() || member.user?.email || "Unknown member";
}

export function getInitials(name: string | null | undefined, fallback = "U") {
  const source = name?.trim() || fallback.trim() || "U";

  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function filterMembers(
  members: OrganizationMember[],
  search: string,
  roleFilter: RoleFilter,
) {
  const query = search.trim().toLowerCase();

  return members.filter((member) => {
    if (roleFilter !== "ALL" && member.role !== roleFilter) return false;
    if (!query) return true;

    return (
      getMemberName(member).toLowerCase().includes(query) ||
      (member.user?.email ?? "").toLowerCase().includes(query)
    );
  });
}
