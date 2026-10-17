"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useAddOrganizationMember, useInviteOrganizationMember } from "@/hooks";
import { cn } from "@/lib/utils";
import type { OrganizationRole } from "@/types";
import { organizationMemberEmailSchema } from "@/validation";
import { inputClass, selectClass } from "./constants";

type Mode = "invite" | "add";

const MODES: { id: Mode; label: string }[] = [
  { id: "invite", label: "Invite by email" },
  { id: "add", label: "Add existing" },
];

const COPY = {
  invite: {
    title: "Invite member",
    description:
      "Send an invitation to a teammate that is not on the team yet.",
    submit: "Send invitation",
    successTitle: "Invitation sent",
    successMessage: (email: string) => `An invitation was sent to ${email}.`,
    errorTitle: "Could not send invitation",
  },
  add: {
    title: "Add existing member",
    description: "Add a registered teammate to this organization.",
    submit: "Add member",
    successTitle: "Member added",
    successMessage: (email: string) =>
      `${email} was added to the organization.`,
    errorTitle: "Could not add member",
  },
} satisfies Record<Mode, unknown>;

export function InviteMemberDialog({
  orgId,
  open,
  onOpenChange,
}: {
  orgId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [mode, setMode] = useState<Mode>("invite");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [role, setRole] = useState<OrganizationRole>("MEMBER");

  const { mutate: addMember, isPending: isAdding } =
    useAddOrganizationMember(orgId);
  const { mutate: inviteMember, isPending: isInviting } =
    useInviteOrganizationMember(orgId);

  const isPending = isAdding || isInviting;
  const copy = COPY[mode];

  const reset = () => {
    setMode("invite");
    setEmail("");
    setEmailError("");
    setRole("MEMBER");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = () => {
    const result = organizationMemberEmailSchema.safeParse({ email });
    if (!result.success) {
      setEmailError(result.error.issues[0]?.message ?? "Enter a valid email.");
      return;
    }

    const normalizedEmail = result.data.email;
    const callbacks = {
      onSuccess: () => {
        toast.add({
          title: copy.successTitle,
          description: copy.successMessage(normalizedEmail),
          type: "success",
        });
        handleOpenChange(false);
      },
      onError: (error: Error) => {
        toast.add({
          title: copy.errorTitle,
          description: error.message || "Please try again.",
          type: "error",
        });
      },
    };

    if (mode === "add") {
      addMember({ email: normalizedEmail, role }, callbacks);
    } else {
      inviteMember({ email: normalizedEmail }, callbacks);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div
            role="tablist"
            className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1"
          >
            {MODES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => {
                  setMode(id);
                  setEmailError("");
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  mode === id
                    ? "bg-white text-[#3A43D6] shadow-xs ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-900",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="organization-member-email"
              className="text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <Input
              id="organization-member-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (emailError) setEmailError("");
              }}
              placeholder="colleague@company.com"
              className={inputClass}
              aria-invalid={Boolean(emailError)}
              aria-describedby={
                emailError ? "organization-member-email-error" : undefined
              }
            />
            {emailError && (
              <p
                id="organization-member-email-error"
                className="text-sm text-red-600"
              >
                {emailError}
              </p>
            )}
          </div>

          {mode === "add" && (
            <div className="space-y-2">
              <label
                htmlFor="organization-member-role"
                className="text-sm font-medium text-slate-700"
              >
                Organization role
              </label>
              <select
                id="organization-member-role"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as OrganizationRole)
                }
                className={cn(selectClass, "w-full")}
              >
                <option value="MEMBER">Member</option>
                <option value="OWNER">Owner</option>
              </select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-[#4852F5] text-white hover:bg-[#3A43D6]"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {copy.submit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
