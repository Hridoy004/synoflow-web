import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAdminAuditLogs,
  getAdminDashboardStats,
  getAdminOrganizations,
  getAdminPayments,
  getAdminProjects,
  getAdminSubscriptions,
  getAdminUsers,
  updateAdminUserRole,
} from "@/api";
import type {
  AdminAuditLogFilters,
  AdminResourceFilters,
  AdminUserFilters,
} from "@/types";

export const adminKeys = {
  all: ["admin"] as const,
  dashboardStats: () => [...adminKeys.all, "dashboard-stats"] as const,
  users: () => [...adminKeys.all, "users"] as const,
  userList: (filters: AdminUserFilters) =>
    [...adminKeys.users(), filters] as const,
  auditLogs: () => [...adminKeys.all, "audit-logs"] as const,
  auditLogList: (filters: AdminAuditLogFilters) =>
    [...adminKeys.auditLogs(), filters] as const,
  organizations: () => [...adminKeys.all, "organizations"] as const,
  organizationList: (filters: AdminResourceFilters) =>
    [...adminKeys.organizations(), filters] as const,
  projects: () => [...adminKeys.all, "projects"] as const,
  projectList: (filters: AdminResourceFilters) =>
    [...adminKeys.projects(), filters] as const,
  subscriptions: () => [...adminKeys.all, "subscriptions"] as const,
  subscriptionList: (filters: AdminResourceFilters) =>
    [...adminKeys.subscriptions(), filters] as const,
  payments: () => [...adminKeys.all, "payments"] as const,
  paymentList: (filters: { page: number; limit: number }) =>
    [...adminKeys.payments(), filters] as const,
};

export function useAdminDashboardStats() {
  return useQuery({
    queryKey: adminKeys.dashboardStats(),
    queryFn: getAdminDashboardStats,
  });
}

export function useAdminUsers(filters: AdminUserFilters) {
  return useQuery({
    queryKey: adminKeys.userList(filters),
    queryFn: () => getAdminUsers(filters),
    placeholderData: keepPreviousData,
  });
}

export function useAdminOrganizations(
  filters: AdminResourceFilters,
  enabled = true,
) {
  return useQuery({
    queryKey: adminKeys.organizationList(filters),
    queryFn: () => getAdminOrganizations(filters),
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useAdminProjects(
  filters: AdminResourceFilters,
  enabled = true,
) {
  return useQuery({
    queryKey: adminKeys.projectList(filters),
    queryFn: () => getAdminProjects(filters),
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useAdminSubscriptions(
  filters: AdminResourceFilters,
  enabled = true,
) {
  return useQuery({
    queryKey: adminKeys.subscriptionList(filters),
    queryFn: () => getAdminSubscriptions(filters),
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useAdminPayments(filters: { page: number; limit: number }) {
  return useQuery({
    queryKey: adminKeys.paymentList(filters),
    queryFn: () => getAdminPayments(filters),
    placeholderData: keepPreviousData,
  });
}

export function useUpdateAdminUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminUserRole,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: adminKeys.users() }),
        queryClient.invalidateQueries({
          queryKey: adminKeys.dashboardStats(),
        }),
      ]),
  });
}

export function useAdminAuditLogs(filters: AdminAuditLogFilters) {
  return useQuery({
    queryKey: adminKeys.auditLogList(filters),
    queryFn: () => getAdminAuditLogs(filters),
    placeholderData: keepPreviousData,
  });
}
