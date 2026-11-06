import apiClient from "@/lib/apiClient";
import type {
  CheckoutInput,
  CheckoutResponse,
  PaymentListResponse,
  PaymentResponse,
} from "@/types";

export function getPayment(paymentId: string) {
  return apiClient<PaymentResponse>(
    `/payments/${encodeURIComponent(paymentId)}`,
    { method: "GET" },
  );
}

export function getPaymentHistory(orgId: string) {
  const searchParams = new URLSearchParams();
  const query = searchParams.size ? `?${searchParams.toString()}` : "";
  return apiClient<PaymentListResponse>(
    `/organizations/${encodeURIComponent(orgId)}/payments${query}`,
    {
      method: "GET",
    },
  );
}

export function createCheckout(orgId: string, payload: CheckoutInput) {
  return apiClient<CheckoutResponse>(
    `/organizations/${encodeURIComponent(orgId)}/payments/checkout`,
    {
      method: "POST",
      body: payload,
    },
  );
}
