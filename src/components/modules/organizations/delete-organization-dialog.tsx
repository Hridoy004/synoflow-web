"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useDeleteOrganization } from "@/hooks";
import type { Organization } from "@/types";

interface DeleteOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization?: Organization;
  onDeleted?: () => void;
}

export function DeleteOrganizationDialog({
  open,
  onOpenChange,
  organization,
  onDeleted,
}: DeleteOrganizationDialogProps) {
  const { mutate: remove, isPending } = useDeleteOrganization();

  const handleDelete = () => {
    if (!organization) return;

    remove(organization.id, {
      onSuccess: () => {
        toast.add({
          title: "Organization deleted",
          description: `${organization.name} has been removed.`,
          type: "success",
        });
        onOpenChange(false);
        onDeleted?.();
      },
      onError: (error) => {
        toast.add({
          title: "Couldn't delete organization",
          description: error.message || "Please try again.",
          type: "error",
        });
      },
    });
  };

  if (!organization) {
    return null;
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!isPending) onOpenChange(next);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete organization?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong className="font-semibold text-slate-900">
              {organization.name}
            </strong>{" "}
            will be permanently deleted. This action can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Spinner /> Deleting…
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
