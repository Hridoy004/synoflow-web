"use client";

import { type FormEvent, useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateOrganization, useUpdateOrganization } from "@/hooks";
import type { Organization } from "@/types";
import {
  createOrganizationSchema,
  ORGANIZATION_DESCRIPTION_MAX_LENGTH,
  ORGANIZATION_NAME_MAX_LENGTH,
  ORGANIZATION_SLUG_MAX_LENGTH,
  updateOrganizationSchema,
} from "@/validation/organization.validation";

type FormField = "name" | "slug" | "description";
type FormErrors = Partial<Record<FormField, string>>;

type OrganizationFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization?: Organization;
};

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export function OrganizationFormDialog({
  open,
  onOpenChange,
  organization,
}: OrganizationFormDialogProps) {
  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization();

  const isEditing = Boolean(organization);
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) return;

    setName(organization?.name ?? "");
    setSlug(organization?.slug ?? "");
    setDescription(organization?.description ?? "");
    setSlugTouched(Boolean(organization));
    setErrors({});
  }, [open, organization]);

  function clearError(field: FormField) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  function handleNameChange(value: string) {
    setName(value);
    clearError("name");

    if (!slugTouched) {
      setSlug(toSlug(value));
      clearError("slug");
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
    setSlugTouched(true);
    clearError("slug");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation =
      organization === undefined
        ? {
            operation: "create" as const,
            result: createOrganizationSchema.safeParse({
              name,
              slug,
              description,
            }),
          }
        : {
            operation: "update" as const,
            organization,
            result: updateOrganizationSchema.safeParse({ name, description }),
          };

    if (!validation.result.success) {
      const nextErrors: FormErrors = {};

      for (const issue of validation.result.error.issues) {
        const field = issue.path[0];
        if (field === "name" || field === "slug" || field === "description") {
          nextErrors[field] ??= issue.message;
        }
      }

      setErrors(nextErrors);
      return;
    }

    setErrors({});

    try {
      if (validation.operation === "update") {
        const { name: validName, description: validDescription } =
          validation.result.data;

        await updateMutation.mutateAsync({
          id: validation.organization.id,
          payload: {
            name: validName,
            description: validDescription || null,
          },
        });

        toast.add({
          title: "Organization updated",
          description: "Your changes have been saved.",
          type: "success",
        });
      } else {
        const {
          name: validName,
          slug: validSlug,
          description: validDescription,
        } = validation.result.data;

        await createMutation.mutateAsync({
          name: validName,
          slug: validSlug,
          ...(validDescription && { description: validDescription }),
        });

        toast.add({
          title: "Organization created",
          description: `${validName} is ready to use.`,
          type: "success",
        });
      }

      onOpenChange(false);
    } catch (error) {
      toast.add({
        title: "Couldn't save organization",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        type: "error",
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit organization" : "Create organization"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Update your organization details."
              : "Create a workspace for your team and projects."}
          </DialogDescription>
        </DialogHeader>

        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization name</Label>
            <Input
              id="org-name"
              value={name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="Synoflow Labs"
              maxLength={ORGANIZATION_NAME_MAX_LENGTH}
              disabled={isPending}
              autoComplete="organization"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "org-name-error" : undefined}
              className="h-11 text-base sm:text-sm"
            />
            {errors.name && (
              <p id="org-name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="org-slug">Workspace slug</Label>
              <Input
                id="org-slug"
                value={slug}
                onChange={(event) => handleSlugChange(event.target.value)}
                placeholder="synoflow-labs"
                maxLength={ORGANIZATION_SLUG_MAX_LENGTH}
                disabled={isPending}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                aria-invalid={Boolean(errors.slug)}
                aria-describedby={errors.slug ? "org-slug-error" : undefined}
                className="h-11 font-mono text-base sm:text-sm"
              />
              {errors.slug ? (
                <p id="org-slug-error" className="text-sm text-destructive">
                  {errors.slug}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Lowercase letters, numbers and hyphens. Can&apos;t be changed
                  later.
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="org-description">Description (optional)</Label>
              <span className="text-xs text-muted-foreground">
                {description.length}/{ORGANIZATION_DESCRIPTION_MAX_LENGTH}
              </span>
            </div>
            <Textarea
              id="org-description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                clearError("description");
              }}
              placeholder="Describe your workspace..."
              rows={4}
              maxLength={ORGANIZATION_DESCRIPTION_MAX_LENGTH}
              disabled={isPending}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "org-description-error" : undefined
              }
              className="resize-none text-base sm:text-sm"
            />
            {errors.description && (
              <p
                id="org-description-error"
                className="text-sm text-destructive"
              >
                {errors.description}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Spinner /> Saving…
                </>
              ) : isEditing ? (
                "Save changes"
              ) : (
                "Create organization"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
