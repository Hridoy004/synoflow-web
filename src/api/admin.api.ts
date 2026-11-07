import apiClient from "@/lib/apiClient";
import type {
  AdminAuditLog,
  AdminAuditLogFilters,
  AdminDashboardStats,
  AdminOrganization,
  AdminProject,
  AdminResourceFilters,
  AdminSubscription,
  AdminUser,
  AdminUserFilters,
  ApiResponse,
  Meta,
  PaymentRecord,
  UpdateAdminUserRoleInput,
} from "@/types";

const toQuery = (params: object) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
};

export function getAdminDashboardStats() {
  return apiClient<ApiResponse<AdminDashboardStats>>("/admin/dashboard-stats");
}

export function getAdminUsers(filters: AdminUserFilters = { page: 1, limit: 20 }) {
  return apiClient<ApiResponse<AdminUser[]> & { meta: Meta }>(`/admin/users${toQuery(filters)}`);
}

export function updateAdminUserRole(payload: UpdateAdminUserRoleInput) {
  return apiClient<ApiResponse<AdminUser>>(`/admin/users/${payload.userId}/role`, {
    method: "PATCH",
    body: { systemRole: payload.systemRole },
  });
}

export function getAdminOrganizations(filters: AdminResourceFilters = { page: 1, limit: 20 }) {
  return apiClient<ApiResponse<AdminOrganization[]> & { meta: Meta }>(`/admin/organizations${toQuery(filters)}`);
}

export function getAdminProjects(filters: AdminResourceFilters = { page: 1, limit: 20 }) {
  return apiClient<ApiResponse<AdminProject[]> & { meta: Meta }>(`/admin/projects${toQuery(filters)}`);
}

export function getAdminSubscriptions(filters: AdminResourceFilters = { page: 1, limit: 20 }) {
  return apiClient<ApiResponse<AdminSubscription[]> & { meta: Meta }>(`/admin/subscriptions${toQuery(filters)}`);
}

export function getAdminPayments(filters: { page: number; limit: number }) {
  return apiClient<ApiResponse<PaymentRecord[]> & { meta: Meta }>(`/payments/all-payments${toQuery(filters)}`);
}

export function getAdminAuditLogs(filters: AdminAuditLogFilters = { page: 1, limit: 20 }) {
  return apiClient<ApiResponse<AdminAuditLog[]> & { meta: Meta }>(`/admin/audit-logs${toQuery(filters)}`);
}