import type { Meta, SystemRole, UserStatus } from "@/types";

export interface AdminApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: Meta;
}

export interface AdminDashboardStats {
  users: {
    total: number;
    newLast7Days: number;
    newLast30Days: number;
  };
  organizations: {
    total: number;
    newLast30Days: number;
  };
  subscriptions: {
    activeTotal: number;
    byPlan: {
      plan: string;
      count: number;
    }[];
  };
  revenue: {
    currentMonth: number | string;
    currency: string;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  systemRole: SystemRole;
  status: UserStatus;
  authProvider: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserFilters {
  page: number;
  limit: number;
  search?: string;
  status?: UserStatus;
  systemRole?: SystemRole;
}

export interface AdminUserListResponse extends AdminApiResponse<AdminUser[]> {
  meta: Meta;
}

export type AdminActivityAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "ASSIGN"
  | "UNASSIGN"
  | "STATUS_CHANGE"
  | "ROLE_CHANGE"
  | "MEMBER_ADDED"
  | "MEMBER_REMOVED"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED";

export type AdminActivityEntity =
  | "USER"
  | "ORGANIZATION"
  | "TEAM"
  | "PROJECT"
  | "SPRINT"
  | "TASK"
  | "COMMENT"
  | "PAYMENT"
  | "SUBSCRIPTION";

export interface AdminAuditLogFilters {
  page: number;
  limit: number;
  organizationId?: string;
  userId?: string;
  entityType?: AdminActivityEntity;
  action?: AdminActivityAction;
  from?: string;
  to?: string;
}

export interface AdminAuditLog {
  id: string;
  organizationId: string;
  userId: string;
  entityType: AdminActivityEntity;
  entityId: string;
  action: AdminActivityAction;
  metadata: unknown;
  createdAt: string;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AdminAuditLogListResponse
  extends AdminApiResponse<AdminAuditLog[]> {
  meta: Meta;
}

export type AdminOrganizationStatus = "ACTIVE" | "SUSPENDED";
export type AdminProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED";
export type AdminSubscriptionPlan = "FREE" | "PRO" | "BUSINESS";
export type AdminSubscriptionStatus =
  | "PENDING"
  | "ACTIVE"
  | "PAST_DUE"
  | "CANCELLED"
  | "EXPIRED";

export interface AdminResourceFilters {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  plan?: string;
}

export interface AdminOrganization {
  id: string;
  name: string;
  slug: string;
  status: AdminOrganizationStatus;
  createdAt: string;
  updatedAt: string;
  owner: { id: string; name: string; email: string } | null;
  memberCount: number;
  projectCount: number;
}

export interface AdminProject {
  id: string;
  name: string;
  key: string;
  status: AdminProjectStatus;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
  organization: { id: string; name: string; slug: string };
  createdBy: { id: string; name: string; email: string };
  taskCount: number;
  memberCount: number;
}

export interface AdminSubscription {
  id: string;
  plan: AdminSubscriptionPlan;
  status: AdminSubscriptionStatus;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
  organization: { id: string; name: string; slug: string };
}

export interface AdminResourceListResponse<T> extends AdminApiResponse<T[]> {
  meta: Meta;
}

export interface UpdateAdminUserRoleInput {
  userId: string;
  systemRole: SystemRole;
}
