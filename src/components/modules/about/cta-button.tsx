"use client";

import { ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks";
import { cn } from "@/lib/utils";
import type { SystemRole } from "@/types";

const DASHBOARD_ROUTE: Record<SystemRole, string> = {
  SUPER_ADMIN: "/super-admin",
  ADMIN: "/admin",
  USER: "/user",
};

type AuthCtaButtonProps = Pick<
  ComponentProps<typeof Button>,
  "variant" | "className"
>;

export function AuthCtaButton({ variant, className }: AuthCtaButtonProps) {
  const { data, isLoading } = useGetMe();
  const role = data?.data?.systemRole as SystemRole | undefined;

  if (isLoading) {
    return (
      <div aria-hidden className="h-12 w-full rounded-lg bg-muted/60 sm:w-48" />
    );
  }

  return (
    <Button
      nativeButton={false}
      render={<Link href={role ? DASHBOARD_ROUTE[role] : "/register"} />}
      size="lg"
      variant={variant}
      className={cn("h-12 w-full px-6 sm:w-auto", className)}
    >
      {role ? (
        <>
          <LayoutDashboard className="size-4" />
          Go to dashboard
        </>
      ) : (
        <>
          Get started free
          <ArrowRight className="size-4" />
        </>
      )}
    </Button>
  );
}
