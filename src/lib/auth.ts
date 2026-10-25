import type { SystemRole } from "@/types";

export function getDashboardPath(role: SystemRole) {
  switch (role) {
    case "SUPER_ADMIN":
      return "/super-admin";
    case "ADMIN":
      return "/admin";
    case "USER":
      return "/user";
  }
}
