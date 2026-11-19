"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useChangePassword,
  useGetMe,
  useUpdateMyProfile,
  useUploadProfileImage,
} from "@/hooks";
import Image from "next/image";
import { Camera, Check, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

const imageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;
const passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$";

function errorMessage(error: Error | null) {
  return error?.message || "Something went wrong. Please try again.";
}

function StatusMessage({
  message,
  error = false,
}: {
  message: string;
  error?: boolean;
}) {
  if (!message) return null;

  return (
    <p
      role={error ? "alert" : "status"}
      className={`mt-4 rounded-lg px-3 py-2 text-sm ${
        error
          ? "bg-destructive/10 text-destructive"
          : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      }`}
    >
      {message}
    </p>
  );
}

export function ProfileSettings() {
  const userQuery = useGetMe();
  const updateProfile = useUpdateMyProfile();
  const uploadImage = useUploadProfileImage();
  const updatePassword = useChangePassword();
  const user = userQuery.data?.data;

  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user?.name]);

  useEffect(() => {
    if (!selectedImage) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

  function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfileMessage("");
    updateProfile.mutate(
      { name: name.trim() },
      { onSuccess: () => setProfileMessage("Your profile details have been saved.") },
    );
  }

  function submitImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setImageError("");
    setImageMessage("");

    if (!selectedImage) {
      setImageError("Choose a profile image to upload.");
      return;
    }

    if (!imageTypes.includes(selectedImage.type)) {
      setImageError("Choose a JPEG, PNG, or WebP image.");
      return;
    }

    if (selectedImage.size > maxImageSize) {
      setImageError("The image must be 5 MB or smaller.");
      return;
    }

    uploadImage.mutate(selectedImage, {
      onSuccess: () => {
        setSelectedImage(null);
        setImageMessage("Your profile image has been updated.");
      },
    });
  }

  function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    const formData = new FormData(event.currentTarget);
    const currentPassword = String(formData.get("currentPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");

    if (newPassword !== passwordConfirmation) {
      setPasswordError("The new password and confirmation do not match.");
      return;
    }

    const form = event.currentTarget;
    updatePassword.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          setPasswordMessage("Password changed. Sign in again with your new password.");
          form.reset();
          setPasswordConfirmation("");
        },
      },
    );
  }

  if (userQuery.isPending) {
    return (
      <output
        aria-label="Loading profile"
        className="mx-auto block h-72 w-full max-w-4xl animate-pulse rounded-2xl bg-muted"
      />
    );
  }

  if (userQuery.isError || !user) {
    return (
      <section
        role="alert"
        className="mx-auto max-w-4xl rounded-2xl border border-destructive/30 bg-destructive/5 p-6"
      >
        <h2 className="font-semibold">Unable to load your profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {userQuery.error?.message || "No profile data was returned."}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => void userQuery.refetch()}
        >
          Try again
        </Button>
      </section>
    );
  }

  const avatar = imagePreview || user.imageUrl;

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header>
        <p className="text-sm font-medium text-primary">Account settings</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Your profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep your account information and sign-in credentials up to date.
        </p>
      </header>

      <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserRound className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold">Personal information</h2>
            <p className="text-sm text-muted-foreground">
              Update your name and profile photo.
            </p>
          </div>
        </div>

        <form onSubmit={submitImage} className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted text-xl font-semibold text-muted-foreground">
            {avatar ? (
              <Image
                src={avatar}
                alt={`${user.name}'s profile`}
                width={80}
                height={80}
                className="size-full object-cover"
              />
            ) : (
              user.name.slice(0, 1).toUpperCase()
            )}
          </div>
          <div className="min-w-0 flex-1">
            <label htmlFor="profileImage" className="text-sm font-medium">
              Profile image
            </label>
            <Input
              id="profileImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                setSelectedImage(event.target.files?.[0] ?? null);
                setImageError("");
                setImageMessage("");
              }}
              className="mt-2 h-10 file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm"
              aria-describedby="profileImageHelp"
            />
            <p id="profileImageHelp" className="mt-1 text-xs text-muted-foreground">
              JPEG, PNG, or WebP. Maximum file size: 5 MB.
            </p>
          </div>
          <Button type="submit" disabled={uploadImage.isPending} className="gap-2">
            {uploadImage.isPending ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Camera className="size-4" aria-hidden="true" />
            )}
            Upload image
          </Button>
        </form>
        <StatusMessage message={imageError || (uploadImage.isError ? errorMessage(uploadImage.error) : imageMessage)} error={Boolean(imageError || uploadImage.isError)} />

        <form onSubmit={submitProfile} className="mt-7 border-t pt-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="profileName" className="text-sm font-medium">
                Full name
              </label>
              <Input
                id="profileName"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                className="mt-2 h-10"
              />
            </div>
            <div>
              <label htmlFor="profileEmail" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="profileEmail"
                value={user.email}
                readOnly
                aria-describedby="emailReadOnlyHelp"
                className="mt-2 h-10 bg-muted/50"
              />
              <p id="emailReadOnlyHelp" className="mt-1 text-xs text-muted-foreground">
                Email address is managed as your sign-in identity.
              </p>
            </div>
          </div>
          <StatusMessage
            message={updateProfile.isError ? errorMessage(updateProfile.error) : profileMessage}
            error={updateProfile.isError}
          />
          <div className="mt-5 flex justify-end">
            <Button type="submit" disabled={updateProfile.isPending || name.trim().length < 2} className="gap-2">
              {updateProfile.isPending ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Check className="size-4" aria-hidden="true" />
              )}
              Save profile
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LockKeyhole className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold">Change password</h2>
            <p className="text-sm text-muted-foreground">
              Use at least 8 characters with uppercase, lowercase, a number, and a symbol.
            </p>
          </div>
        </div>

        <form onSubmit={submitPassword} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Current password
              </label>
              <Input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required className="mt-2 h-10" />
            </div>
            <div>
              <label htmlFor="newPassword" className="text-sm font-medium">
                New password
              </label>
              <Input id="newPassword" name="newPassword" type="password" autoComplete="new-password" required minLength={8} pattern={passwordPattern} title="Use 8 or more characters with uppercase, lowercase, a number, and a symbol." className="mt-2 h-10" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm new password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                required
                minLength={8}
                pattern={passwordPattern}
                title="Use 8 or more characters with uppercase, lowercase, a number, and a symbol."
                className="mt-2 h-10"
              />
            </div>
          </div>
          <StatusMessage
            message={passwordError || (updatePassword.isError ? errorMessage(updatePassword.error) : passwordMessage)}
            error={Boolean(passwordError || updatePassword.isError)}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={updatePassword.isPending} className="gap-2">
              {updatePassword.isPending && (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              )}
              Update password
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
