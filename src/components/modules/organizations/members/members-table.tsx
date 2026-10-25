import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { OrganizationMember, OrganizationRole } from "@/types";
import { ROLE_LABELS } from "./constants";
import { getInitials, getMemberName } from "./utils";

const COLUMNS = ["Member", "Role", "Joined", "Actions"] as const;

interface MembersTableProps {
  members: OrganizationMember[];
  currentUserId?: string;
  canManage: boolean;
  isUpdatingRole: boolean;
  onChangeRole: (member: OrganizationMember, role: OrganizationRole) => void;
  onRemove: (member: OrganizationMember) => void;
}

export function MembersTable({
  members,
  currentUserId,
  canManage,
  isUpdatingRole,
  onChangeRole,
  onRemove,
}: MembersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-left">
        <thead className="bg-slate-50">
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500",
                  column === "Actions" && "text-right",
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {members.map((member) => {
            const isSelf = member.user?.id === currentUserId;
            const isOwner = member.role === "OWNER";
            const name = getMemberName(member);

            return (
              <tr key={member.memberId} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" className="bg-[#EBEEFF] text-[#3A43D6]">
                      <AvatarImage src={member.user?.avatar ?? undefined} />
                      <AvatarFallback className="bg-[#EBEEFF] text-[#3A43D6]">
                        {getInitials(member.user?.name, member.user?.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {member.user?.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <Badge
                    variant={isOwner ? "default" : "secondary"}
                    className={cn(
                      isOwner
                        ? "bg-[#EEF1FF] text-[#3A43D6] ring-[#CED2FF]"
                        : "bg-slate-100 text-slate-700",
                    )}
                  >
                    {ROLE_LABELS[member.role]}
                  </Badge>
                </td>

                <td className="px-4 py-3 text-sm text-slate-600">
                  {formatDate(member.createdAt)}
                </td>

                <td className="px-4 py-3 text-right">
                  {canManage && (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        aria-label={`Actions for ${name}`}
                        className="inline-flex size-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5]"
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          disabled={
                            isSelf || isUpdatingRole || member.role === "MEMBER"
                          }
                          onClick={() => onChangeRole(member, "MEMBER")}
                        >
                          Change to member
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={
                            isSelf || isUpdatingRole || member.role === "OWNER"
                          }
                          onClick={() => onChangeRole(member, "OWNER")}
                        >
                          Promote to owner
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={isSelf}
                          onClick={() => onRemove(member)}
                          className="text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                          Remove member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
