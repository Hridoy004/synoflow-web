import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminAuditLogs, getAdminDashboardStats, getAdminOrganizations,
  getAdminPayments, getAdminProjects, getAdminSubscriptions,
  getAdminUsers, updateAdminUserRole,
} from "@/api";
import type { AdminAuditLogFilters, AdminResourceFilters, AdminUserFilters, UpdateAdminUserRoleInput } from "@/types";

export const adminKeys = {
  all: ["admin"] as const,
  stats: () => [...adminKeys.all, "stats"] as const,
  users: (filters: AdminUserFilters) => [...adminKeys.all, "users", filters] as const,
  organizations: (filters: AdminResourceFilters) => [...adminKeys.all, "organizations", filters] as const,
  projects: (filters: AdminResourceFilters) => [...adminKeys.all, "projects", filters] as const,
  subscriptions: (filters: AdminResourceFilters) => [...adminKeys.all, "subscriptions", filters] as const,
  payments: (filters: { page: number; limit: number }) => [...adminKeys.all, "payments", filters] as const,
  auditLogs: (filters: AdminAuditLogFilters) => [...adminKeys.all, "auditLogs", filters] as const,
};

export const useAdminDashboardStats = () => useQuery({ queryKey: adminKeys.stats(), queryFn: getAdminDashboardStats });
export const useAdminUsers = (filters: AdminUserFilters) => useQuery({ queryKey: adminKeys.users(filters), queryFn: () => getAdminUsers(filters), placeholderData: (previous) => previous });
export const useAdminOrganizations = (filters: AdminResourceFilters, enabled = true) => useQuery({ queryKey: adminKeys.organizations(filters), queryFn: () => getAdminOrganizations(filters), enabled });
export const useAdminProjects = (filters: AdminResourceFilters, enabled = true) => useQuery({ queryKey: adminKeys.projects(filters), queryFn: () => getAdminProjects(filters), enabled });
export const useAdminSubscriptions = (filters: AdminResourceFilters, enabled = true) => useQuery({ queryKey: adminKeys.subscriptions(filters), queryFn: () => getAdminSubscriptions(filters), enabled });
export const useAdminPayments = (filters: { page: number; limit: number }) => useQuery({ queryKey: adminKeys.payments(filters), queryFn: () => getAdminPayments(filters) });
export const useAdminAuditLogs = (filters: AdminAuditLogFilters) => useQuery({ queryKey: adminKeys.auditLogs(filters), queryFn: () => getAdminAuditLogs(filters), placeholderData: (previous) => previous });

export function useUpdateAdminUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateAdminUserRoleInput) => updateAdminUserRole(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminKeys.all }),
  });
}