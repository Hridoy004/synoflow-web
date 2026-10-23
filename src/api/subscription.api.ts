import apiClient from "@/lib/apiClient";
import type {
  CreateSubscriptionInput,
  SubscriptionResponse,
  UpdateSubscriptionInput,
} from "@/types";

const subscriptionUrl = (orgId: string) =>
  `/organizations/${encodeURIComponent(orgId)}/subscription`;

export function getSubscription(orgId: string) {
  return apiClient<SubscriptionResponse>(subscriptionUrl(orgId), {
    method: "GET",
  });
}

export function createSubscription(
  orgId: string,
  payload: CreateSubscriptionInput,
) {
  return apiClient<SubscriptionResponse>(subscriptionUrl(orgId), {
    method: "POST",
    body: payload,
  });
}

export function updateSubscription(
  orgId: string,
  payload: UpdateSubscriptionInput,
) {
  return apiClient<SubscriptionResponse>(subscriptionUrl(orgId), {
    method: "PATCH",
    body: payload,
  });
}

export function cancelSubscription(orgId: string) {
  return apiClient<SubscriptionResponse>(`${subscriptionUrl(orgId)}/cancel`, {
    method: "POST",
  });
}
