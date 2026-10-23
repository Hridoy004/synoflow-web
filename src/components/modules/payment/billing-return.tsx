"use client";

import { AlertCircle, CheckCircle2, Clock3, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayment, usePaymentHistory, useSubscription } from "@/hooks";
import type { SubscriptionPlan } from "@/types";

function isPlan(value: unknown): value is SubscriptionPlan {
  return value === "FREE" || value === "PRO" || value === "BUSINESS";
}

function formatAmount(amount: string | number, currency: string) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${amount} ${currency}`;
  }

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
  }).format(numericAmount);
}

export function BillingReturn({ paymentId }: { paymentId: string }) {
  const [retryCount, setRetryCount] = useState(0);
  const paymentQuery = usePayment(paymentId);
  const payment = paymentQuery.data?.data;
  const subscriptionQuery = useSubscription(
    payment?.organizationId ?? "",
    payment?.status === "SUCCESS",
  );
  const paymentHistoryQuery = usePaymentHistory(
    payment?.organizationId ?? "",
    payment?.status === "SUCCESS",
  );
  const plan = payment?.metadata?.plan;

  const retryVerification = () => {
    setRetryCount((count) => count + 1);
    void paymentQuery.refetch();
    if (payment?.status === "SUCCESS") {
      void subscriptionQuery.refetch();
      void paymentHistoryQuery.refetch();
    }
  };

  if (!paymentId) {
    return (
      <ResultCard
        icon={<AlertCircle className="size-7 text-amber-600" />}
        title="Payment could not be verified"
        message="The payment return did not include a payment reference. Check your payment history or contact support."
      />
    );
  }

  if (paymentQuery.isPending) {
    return (
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle>Verifying payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (paymentQuery.isError || !payment) {
    return (
      <ResultCard
        icon={<AlertCircle className="size-7 text-amber-600" />}
        title="Payment could not be verified"
        message="We couldn't retrieve the payment status. This does not confirm success or failure. Sign in and try verification again."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button type="button" variant="outline" onClick={retryVerification}>
              Retry verification
            </Button>
            <Button
              nativeButton={false}
              render={
                <Link
                  href={`/login?next=${encodeURIComponent(`/billing/success?paymentId=${paymentId}`)}`}
                />
              }
            >
              Sign in
            </Button>
          </div>
        }
      />
    );
  }

  if (payment.status === "PENDING") {
    return (
      <ResultCard
        icon={<Clock3 className="size-7 text-amber-600" />}
        title="Payment confirmation pending"
        message="The payment provider has not yet confirmed this payment. Your plan will not be shown as active until the backend confirms it."
        action={
          <Button type="button" variant="outline" onClick={retryVerification}>
            Check again
          </Button>
        }
        reference={payment.id}
      />
    );
  }

  if (payment.status === "FAILED") {
    return (
      <ResultCard
        icon={<XCircle className="size-7 text-destructive" />}
        title="Payment was not completed"
        message="The backend reports that this payment failed or was cancelled. You can return to pricing and try again."
        action={
          <Button nativeButton={false} render={<Link href="/pricing" />}>
            Back to pricing
          </Button>
        }
        reference={payment.id}
      />
    );
  }

  const subscription = subscriptionQuery.data?.data;

  if (subscriptionQuery.isPending) {
    return (
      <ResultCard
        icon={<Clock3 className="size-7 text-amber-600" />}
        title="Payment received; activation pending"
        message="The payment is confirmed. We are still verifying that the backend activated the matching plan."
        action={
          <Button type="button" variant="outline" onClick={retryVerification}>
            Check activation
          </Button>
        }
        reference={payment.id}
        amount={formatAmount(payment.amount, payment.currency)}
        retryCount={retryCount}
      />
    );
  }

  if (
    !subscription ||
    subscription.status !== "ACTIVE" ||
    !isPlan(plan) ||
    subscription.plan !== plan
  ) {
    return (
      <ResultCard
        icon={<AlertCircle className="size-7 text-amber-600" />}
        title="Payment confirmed; activation not verified"
        message={
          subscriptionQuery.isError
            ? "The payment succeeded, but subscription status could not be verified. Check billing again in a moment."
            : "The payment succeeded, but the matching plan is not active yet. Do not pay again while activation is being checked."
        }
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button type="button" variant="outline" onClick={retryVerification}>
              Refresh status
            </Button>
            <Button
              nativeButton={false}
              render={
                <Link
                  href={`/user/organizations/${encodeURIComponent(payment.organizationId)}/subscription?paymentId=${encodeURIComponent(payment.id)}`}
                />
              }
            >
              View billing
            </Button>
          </div>
        }
        reference={payment.id}
        amount={formatAmount(payment.amount, payment.currency)}
        retryCount={retryCount}
      />
    );
  }

  return (
    <ResultCard
      icon={<CheckCircle2 className="size-7 text-emerald-600" />}
      title="Payment confirmed"
      message={`${subscription.plan} is active for ${payment.organization?.name ?? "your organization"}.`}
      action={
        <Button
          nativeButton={false}
          render={
            <Link
              href={`/user/organizations/${encodeURIComponent(payment.organizationId)}/subscription?paymentId=${encodeURIComponent(payment.id)}`}
            />
          }
        >
          View subscription
        </Button>
      }
      reference={payment.id}
      amount={formatAmount(payment.amount, payment.currency)}
      retryCount={retryCount}
    />
  );
}

function ResultCard({
  icon,
  title,
  message,
  action,
  reference,
  amount,
  retryCount,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  action?: React.ReactNode;
  reference?: string;
  amount?: string;
  retryCount?: number;
}) {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-14 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-center">
        <p className="text-sm leading-6 text-muted-foreground">{message}</p>
        {reference && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <Badge variant="outline">Payment {reference}</Badge>
            {amount && <Badge variant="secondary">{amount}</Badge>}
          </div>
        )}
        {retryCount !== undefined && retryCount > 0 && (
          <p className="text-xs text-muted-foreground">
            Verification attempts: {retryCount}
          </p>
        )}
        {action}
      </CardContent>
    </Card>
  );
}
