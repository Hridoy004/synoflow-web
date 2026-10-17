"use client";

import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { useRemoveOrganizationMember } from "@/hooks";
import type { OrganizationMember } from "@/types";
import { getMemberName } from "./utils";

export function RemoveMemberDialog({
  orgId,
  member,
  onClose,
}: {
  orgId: string;
  member: OrganizationMember | null;
  onClose: () => void;
}) {
  const { mutate: removeMember, isPending } =
    useRemoveOrganizationMember(orgId);

  const handleRemove = () => {
    if (!member) return;

    removeMember(member.memberId, {
      onSuccess: () => {
        toast.add({
          title: "Member removed",
          description: `${getMemberName(member)} was removed from the organization.`,
          type: "success",
        });
        onClose();
      },
      onError: (error) => {
        toast.add({
          title: "Removal failed",
          description: error.message || "Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <AlertDialog
      open={member !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex size-11 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="size-5" />
          </div>
          <AlertDialogTitle>Remove member?</AlertDialogTitle>
          <AlertDialogDescription>
            This action removes {member ? getMemberName(member) : "this member"}{" "}
            from the organization. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleRemove}
            disabled={isPending}
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
