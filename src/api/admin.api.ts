import apiClient from "@/lib/apiClient";
import type {
  AdminApiResponse,
  AdminAuditLogFilters,
  AdminAuditLogListResponse,
  AdminDashboardStats,
  AdminOrganization,
  AdminProject,
  AdminResourceFilters,
  AdminResourceListResponse,
  AdminSubscription,
  AdminUserFilters,
  AdminUserListResponse,
  PaginationParams,
  PaymentListResponse,
  SystemRole,
  UpdateAdminUserRoleInput,
} from "@/types";

const ADMIN_URL = "/admin";

function resourceQuery(filters: AdminResourceFilters) {
  const params = new URLSearchParams({
    page: String(filters.page),
    limit: String(filters.limit),
  });

  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.plan) params.set("plan", filters.plan);

  return params.toString();
}

export function getAdminDashboardStats() {
  return apiClient<AdminApiResponse<AdminDashboardStats>>(
    `${ADMIN_URL}/dashboard-stats`,
  );
}

export function getAdminUsers({
  page,
  limit,
  search,
  status,
  systemRole,
}: AdminUserFilters) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (systemRole) params.set("systemRole", systemRole);

  return apiClient<AdminUserListResponse>(
    `${ADMIN_URL}/users?${params.toString()}`,
  );
}

export function getAdminOrganizations(filters: AdminResourceFilters) {
  return apiClient<AdminResourceListResponse<AdminOrganization>>(
    `${ADMIN_URL}/organizations?${resourceQuery(filters)}`,
  );
}

export function getAdminProjects(filters: AdminResourceFilters) {
  return apiClient<AdminResourceListResponse<AdminProject>>(
    `${ADMIN_URL}/projects?${resourceQuery(filters)}`,
  );
}

export function getAdminSubscriptions(filters: AdminResourceFilters) {
  return apiClient<AdminResourceListResponse<AdminSubscription>>(
    `${ADMIN_URL}/subscriptions?${resourceQuery(filters)}`,
  );
}

export function getAdminPayments({
  page = 1,
  limit = 20,
}: PaginationParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return apiClient<PaymentListResponse>(
    `/payments/all-payments?${params.toString()}`,
  );
}

export function updateAdminUserRole({
  userId,
  systemRole,
}: UpdateAdminUserRoleInput) {
  return apiClient<AdminApiResponse<unknown>>(
    `${ADMIN_URL}/users/${encodeURIComponent(userId)}/role`,
    {
      method: "PATCH",
      body: { systemRole } satisfies { systemRole: SystemRole },
    },
  );
}

export function getAdminAuditLogs(filters: AdminAuditLogFilters) {
  const params = new URLSearchParams({
    page: String(filters.page),
    limit: String(filters.limit),
  });

  for (const key of [
    "organizationId",
    "userId",
    "entityType",
    "action",
    "from",
    "to",
  ] as const) {
    const value = filters[key];
    if (value) params.set(key, value);
  }

  return apiClient<AdminAuditLogListResponse>(
    `${ADMIN_URL}/audit-logs?${params.toString()}`,
  );
}
