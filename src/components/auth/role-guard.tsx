"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import { getLoginRedirectPath } from "@/lib/auth/session";
import type { SystemRole } from "@/types";
import AccessDenied from "./access-denied";
import AuthLoading from "./auth-loading";

interface IProps {
  children: ReactNode;
  roles: SystemRole[];
}

export default function RoleGuard({ children, roles }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isPending, isError } = useGetMe();

  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.systemRole);

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      const search = searchParams.toString();
      router.replace(
        getLoginRedirectPath(`${pathname}${search ? `?${search}` : ""}`),
      );
    }
  }, [isPending, isError, user, router, pathname, searchParams]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
