import type { ApiResponse } from "./api.type";

export type SubscriptionPlan = "FREE" | "PRO" | "BUSINESS";

export interface CreateSubscriptionInput {
  plan: SubscriptionPlan;
}

export interface UpdateSubscriptionInput {
  plan: SubscriptionPlan;
  cancelAtPeriodEnd: boolean;
}

export type SubscriptionStatus =
  | "PENDING"
  | "ACTIVE"
  | "PAST_DUE"
  | "CANCELLED"
  | "EXPIRED";

export interface SubscriptionRecord {
  id: string;
  organizationId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
  limits?: {
    members: number;
    teams: number;
    projects: number;
    tasksPerProject: number;
    storageBytes: number;
    maxFileSizeBytes: number;
  };
}

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface PaymentRecord {
  id: string;
  organizationId: string;
  subscriptionId: string | null;
  userId: string;
  provider: "BKASH" | "STRIPE";
  transactionId: string;
  providerSessionId: string | null;
  providerTransactionId: string | null;
  amount: string | number;
  currency: string;
  status: PaymentStatus;
  paymentUrl: string | null;
  paidAt: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  organization?: {
    id: string;
    name: string;
    slug: string;
  };
  subscription?: {
    id: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
  } | null;
}

export interface CheckoutResponseData {
  paymentId: string;
  paymentUrl: string | null;
}

export type SubscriptionResponse = ApiResponse<SubscriptionRecord | null>;
export type PaymentResponse = ApiResponse<PaymentRecord>;
export type PaymentListResponse = ApiResponse<PaymentRecord[]>;
export type CheckoutResponse = ApiResponse<CheckoutResponseData>;

export interface CheckoutInput {
  plan: SubscriptionPlan;
}
