import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  cancelSubscription,
  createCheckout,
  createSubscription,
  getPayment,
  getPaymentHistory,
  getSubscription,
  updateSubscription,
} from "@/api";
import type {
  CheckoutInput,
  CreateSubscriptionInput,
  PaginationParams,
  UpdateSubscriptionInput,
} from "@/types";
import { organizationKeys } from "./organization.hook";

export const billingKeys = {
  all: ["billing"] as const,
  subscription: (orgId: string) =>
    [...billingKeys.all, "subscription", orgId] as const,
  paymentHistory: (orgId: string) =>
    [...billingKeys.all, "payments", orgId] as const,
  payment: (paymentId: string) =>
    [...billingKeys.all, "payment", paymentId] as const,
};

export function useSubscription(orgId: string, enabled = true) {
  return useQuery({
    queryKey: billingKeys.subscription(orgId),
    queryFn: () => getSubscription(orgId),
    enabled: Boolean(orgId) && enabled,
    retry: false,
  });
}

export function usePaymentHistory(
  orgId: string,
  enabled = true,
  params: PaginationParams = {},
) {
  return useQuery({
    queryKey: [...billingKeys.paymentHistory(orgId), params],
    queryFn: () => getPaymentHistory(orgId, params),
    enabled: Boolean(orgId) && enabled,
    retry: false,
    placeholderData: keepPreviousData,
  });
}

export function usePayment(paymentId: string, enabled = true) {
  return useQuery({
    queryKey: billingKeys.payment(paymentId),
    queryFn: () => getPayment(paymentId),
    enabled: Boolean(paymentId) && enabled,
    retry: false,
  });
}

function invalidateOrganizationBilling(
  queryClient: ReturnType<typeof useQueryClient>,
  orgId: string,
) {
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: billingKeys.subscription(orgId),
    }),
    queryClient.invalidateQueries({
      queryKey: billingKeys.paymentHistory(orgId),
    }),
    queryClient.invalidateQueries({
      queryKey: organizationKeys.detail(orgId),
    }),
  ]);
}

export function useCreateSubscription(orgId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSubscriptionInput) =>
      createSubscription(orgId, payload),
    onSuccess: () => invalidateOrganizationBilling(queryClient, orgId),
  });
}

export function useUpdateSubscription(orgId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateSubscriptionInput) =>
      updateSubscription(orgId, payload),
    onSuccess: () => invalidateOrganizationBilling(queryClient, orgId),
  });
}

export function useCancelSubscription(orgId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cancelSubscription(orgId),
    onSuccess: () => invalidateOrganizationBilling(queryClient, orgId),
  });
}

export function useCreateCheckout(orgId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CheckoutInput) => createCheckout(orgId, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: billingKeys.paymentHistory(orgId),
      }),
  });
}
