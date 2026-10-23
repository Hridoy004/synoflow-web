"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  RotateCw,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { pricingPlans } from "@/components/modules/pricing/pricing-plans";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import {
  useCancelSubscription,
  useCreateCheckout,
  useCreateSubscription,
  usePayment,
  usePaymentHistory,
  useSubscription,
  useUpdateSubscription,
} from "@/hooks/billing.hook";
import { useOrganization } from "@/hooks/organization.hook";
import { getBkashCheckoutUrl } from "@/lib/billing.utils";
import type { SubscriptionPlan } from "@/types";

function formatPaymentAmount(amount: string | number, currency: string) {
  const value = Number(amount);
  return Number.isFinite(value)
    ? new Intl.NumberFormat("en-BD", { style: "currency", currency }).format(
        value,
      )
    : `${amount} ${currency}`;
}

function QueryError({
  label,
  onRetry,
}: {
  label: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-5"
    >
      <p className="text-sm text-destructive">
        {label} could not be loaded. Please try again.
      </p>
      <Button
        type="button"
        variant="outline"
        className="w-fit"
        onClick={onRetry}
      >
        <RotateCw /> Retry
      </Button>
    </div>
  );
}

export function SubscriptionManagement({
  orgId,
  paymentId = "",
}: {
  orgId: string;
  paymentId?: string;
}) {
  const [pendingPlan, setPendingPlan] = useState<SubscriptionPlan | null>(null);
  const [checkoutNeedsReview, setCheckoutNeedsReview] = useState(false);
  const [paymentPage, setPaymentPage] = useState(1);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const organization = useOrganization(orgId);
  const org = organization.data?.data;
  const isOwner = org?.role === "OWNER";
  const subscription = useSubscription(orgId, organization.isSuccess);
  const payment = usePayment(
    paymentId,
    organization.isSuccess && isOwner && Boolean(paymentId),
  );
  const payments = usePaymentHistory(orgId, organization.isSuccess && isOwner, {
    page: paymentPage,
    limit: 10,
  });
  const paymentRecords = payments.data?.data ?? [];
  const cancel = useCancelSubscription(orgId);
  const create = useCreateSubscription(orgId);
  const update = useUpdateSubscription(orgId);
  const checkout = useCreateCheckout(orgId);
  const currentSubscription = subscription.data?.data ?? null;
  const confirmedPayment = payment.data?.data;
  const paymentMatchesActiveSubscription =
    confirmedPayment?.status === "SUCCESS" &&
    confirmedPayment.organizationId === orgId &&
    currentSubscription?.status === "ACTIVE" &&
    typeof confirmedPayment.metadata?.plan === "string" &&
    confirmedPayment.metadata.plan === currentSubscription.plan;
  const currentPlan = currentSubscription?.plan;
  const canManageCurrentPlan =
    subscription.isSuccess &&
    (!currentSubscription || currentSubscription.status === "ACTIVE");
  const isPlanChangePending =
    create.isPending || update.isPending || checkout.isPending;

  const confirmPlanChange = async () => {
    if (!pendingPlan || !isOwner) return;

    try {
      if (pendingPlan === "FREE") {
        if (currentSubscription) {
          await update.mutateAsync({
            plan: "FREE",
            cancelAtPeriodEnd: false,
          });
        } else {
          await create.mutateAsync({ plan: "FREE" });
        }
        toast.add({
          title: "Free plan active",
          description: `${org.name} is now on the Free plan.`,
          type: "success",
        });
      } else {
        const response = await checkout.mutateAsync({ plan: pendingPlan });
        const paymentUrl = getBkashCheckoutUrl(response.data.paymentUrl);
        if (!response.data.paymentId || !paymentUrl) {
          setCheckoutNeedsReview(true);
          toast.add({
            title: "Checkout outcome needs review",
            description:
              "A payment may have been created. Check payment history before trying again.",
            type: "error",
          });
          return;
        }
        window.location.assign(paymentUrl);
      }
      setPendingPlan(null);
    } catch {
      if (pendingPlan !== "FREE") {
        setCheckoutNeedsReview(true);
      }
      toast.add({
        title: "Plan could not be changed",
        description:
          pendingPlan === "FREE"
            ? "No plan change was confirmed. Please try again."
            : "Checkout may have started. Check payment history before trying again.",
        type: "error",
      });
    }
  };

  const confirmCancellation = async () => {
    try {
      await cancel.mutateAsync();
      toast.add({
        title: "Cancellation scheduled",
        description:
          "Your subscription will remain active through the current period.",
        type: "success",
      });
      setCancelDialogOpen(false);
    } catch {
      toast.add({
        title: "Cancellation could not be scheduled",
        description:
          "Your subscription has not been changed. Please try again.",
        type: "error",
      });
    }
  };

  if (organization.isPending) {
    return <Skeleton className="h-40 w-full rounded-2xl" />;
  }

  if (organization.isError || !org) {
    return (
      <QueryError
        label="Organization"
        onRetry={() => void organization.refetch()}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <Button
        variant="ghost"
        nativeButton={false}
        render={
          <Link href={`/user/organizations/${encodeURIComponent(orgId)}`} />
        }
      >
        <ArrowLeft /> Organization
      </Button>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Subscription & billing
        </h1>
        <p className="text-sm text-muted-foreground">
          {org.name} · Your role: {org.role}
        </p>
      </header>

      {paymentId && !isOwner && (
        <div
          role="alert"
          className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
        >
          Payment confirmation details are available to the organization owner.
        </div>
      )}
      {paymentId && isOwner && payment.isError && (
        <QueryError
          label="Payment confirmation"
          onRetry={() => void payment.refetch()}
        />
      )}
      {paymentMatchesActiveSubscription && confirmedPayment && (
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="size-5" />
              Payment successful
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your {currentSubscription.plan} subscription is active.
            </p>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Amount paid</p>
              <p className="font-semibold">
                {formatPaymentAmount(
                  confirmedPayment.amount,
                  confirmedPayment.currency,
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment reference</p>
              <p className="break-all font-medium">{confirmedPayment.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid at</p>
              <p>
                {confirmedPayment.paidAt
                  ? new Date(confirmedPayment.paidAt).toLocaleString()
                  : "Confirmed"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!isOwner && (
        <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>
            Only organization owners can manage billing. Ask an owner to make
            subscription changes. The backend must also enforce this access
            control.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Current subscription</CardTitle>
        </CardHeader>
        <CardContent>
          {subscription.isPending && (
            <Skeleton className="h-24 w-full rounded-lg" />
          )}
          {subscription.isError && (
            <QueryError
              label="Subscription"
              onRetry={() => void subscription.refetch()}
            />
          )}
          {!subscription.isPending &&
            !subscription.isError &&
            (subscription.data?.data ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-semibold">{subscription.data.data.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold">
                    {subscription.data.data.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Current period starts
                  </p>
                  <p>
                    {subscription.data.data.currentPeriodStart
                      ? new Date(
                          subscription.data.data.currentPeriodStart,
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Current period ends
                  </p>
                  <p>
                    {subscription.data.data.currentPeriodEnd
                      ? new Date(
                          subscription.data.data.currentPeriodEnd,
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">Cancellation</p>
                  <p>
                    {subscription.data.data.cancelAtPeriodEnd
                      ? "Scheduled at the end of the current period"
                      : "Not scheduled"}
                  </p>
                </div>
                {isOwner &&
                  subscription.data.data.status === "ACTIVE" &&
                  !subscription.data.data.cancelAtPeriodEnd && (
                    <div className="sm:col-span-2">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => setCancelDialogOpen(true)}
                      >
                        Cancel subscription
                      </Button>
                    </div>
                  )}
              </div>
            ) : (
              <p className="rounded-lg border p-4 text-sm text-muted-foreground">
                No subscription is set up for this organization yet.
              </p>
            ))}
        </CardContent>
      </Card>

      <section aria-labelledby="available-plans-heading" className="space-y-4">
        <div>
          <h2 id="available-plans-heading" className="text-xl font-semibold">
            Available plans
          </h2>
          <p className="text-sm text-muted-foreground">
            Plan prices are in BDT and billed monthly.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-2xl font-semibold">
                  {plan.price}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {plan.period}
                  </span>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Button
                  type="button"
                  disabled={
                    !isOwner ||
                    isPlanChangePending ||
                    !canManageCurrentPlan ||
                    currentPlan === plan.id
                  }
                  onClick={() => {
                    setCheckoutNeedsReview(false);
                    setPendingPlan(plan.id);
                  }}
                  className="w-full"
                >
                  {currentPlan === plan.id
                    ? "Current plan"
                    : !isOwner
                      ? "Owner only"
                      : !currentSubscription && plan.id === "FREE"
                        ? "Start Free plan"
                        : plan.id === "FREE"
                          ? "Switch to Free"
                          : "Choose plan"}
                  {isPlanChangePending && pendingPlan === plan.id && (
                    <Spinner />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Payment history
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isOwner && (
            <p className="rounded-lg border p-4 text-sm text-muted-foreground">
              Payment history is available to organization owners only.
            </p>
          )}
          {isOwner && (
            <>
              {payments.isPending && (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
              {payments.isError && (
                <QueryError
                  label="Payment history"
                  onRetry={() => void payments.refetch()}
                />
              )}
              {!payments.isPending &&
                !payments.isError &&
                (paymentRecords.length ? (
                  <>
                    <div className="hidden overflow-hidden rounded-lg border md:block">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 font-medium">Plan</th>
                            <th className="px-4 py-3 font-medium">Amount</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 text-right font-medium">
                              Details
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {paymentRecords.map((payment) => (
                            <tr key={payment.id}>
                              <td className="px-4 py-3">
                                {payment.subscription?.plan ??
                                  (typeof payment.metadata?.plan === "string"
                                    ? payment.metadata.plan
                                    : "Payment")}
                              </td>
                              <td className="px-4 py-3">
                                {formatPaymentAmount(
                                  payment.amount,
                                  payment.currency,
                                )}
                              </td>
                              <td className="px-4 py-3">{payment.status}</td>
                              <td className="px-4 py-3">
                                {new Date(
                                  payment.createdAt,
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <Button
                                  nativeButton={false}
                                  variant="outline"
                                  render={
                                    <Link
                                      href={`/user/organizations/${encodeURIComponent(orgId)}/subscription/payments/${encodeURIComponent(payment.id)}`}
                                    />
                                  }
                                >
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="space-y-3 md:hidden">
                      {paymentRecords.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                        >
                          <div>
                            <p className="font-medium">
                              {payment.subscription?.plan ??
                                (typeof payment.metadata?.plan === "string"
                                  ? payment.metadata.plan
                                  : "Payment")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(payment.createdAt).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {payment.status}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-3 sm:justify-end">
                            <span className="font-semibold">
                              {formatPaymentAmount(
                                payment.amount,
                                payment.currency,
                              )}
                            </span>
                            <Button
                              nativeButton={false}
                              variant="outline"
                              render={
                                <Link
                                  href={`/user/organizations/${encodeURIComponent(orgId)}/subscription/payments/${encodeURIComponent(payment.id)}`}
                                />
                              }
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="rounded-lg border p-4 text-sm text-muted-foreground">
                    No payments have been made for this organization yet.
                  </p>
                ))}
              {!payments.isPending &&
                !payments.isError &&
                (payments.data?.meta.totalPages ?? 1) > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={paymentPage <= 1 || payments.isPlaceholderData}
                      onClick={() =>
                        setPaymentPage((page) => Math.max(1, page - 1))
                      }
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {paymentPage} of {payments.data?.meta.totalPages}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={
                        paymentPage >= (payments.data?.meta.totalPages ?? 1) ||
                        payments.isPlaceholderData
                      }
                      onClick={() => setPaymentPage((page) => page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={pendingPlan !== null}
        onOpenChange={(open) => {
          if (!open && !isPlanChangePending) setPendingPlan(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm plan change</DialogTitle>
            <DialogDescription>
              {pendingPlan === "FREE" && currentSubscription
                ? "Switching to Free takes effect immediately and applies the Free plan limits."
                : pendingPlan === "FREE"
                  ? "The Free plan will be activated for this organization."
                  : `Continue to bKash to pay ${pricingPlans.find((plan) => plan.id === pendingPlan)?.price ?? ""} per month. The paid plan is activated only after payment confirmation.`}
            </DialogDescription>
          </DialogHeader>
          {checkoutNeedsReview && (
            <p
              role="alert"
              className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
            >
              Checkout could not be verified. Check payment history before
              attempting another payment.
            </p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPlanChangePending}
              onClick={() => setPendingPlan(null)}
            >
              Keep current plan
            </Button>
            <Button
              type="button"
              disabled={
                isPlanChangePending || !pendingPlan || checkoutNeedsReview
              }
              onClick={() => void confirmPlanChange()}
            >
              {isPlanChangePending ? (
                <>
                  <Spinner /> Processing…
                </>
              ) : pendingPlan === "FREE" ? (
                "Confirm change"
              ) : (
                "Continue to payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={cancelDialogOpen}
        onOpenChange={(open) => {
          if (!cancel.isPending) setCancelDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this subscription?</AlertDialogTitle>
            <AlertDialogDescription>
              Cancellation will be scheduled for the end of the current billing
              period. The plan remains active until then
              {currentSubscription?.currentPeriodEnd
                ? ` (${new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()})`
                : ""}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancel.isPending}>
              Keep subscription
            </AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={cancel.isPending}
              onClick={() => void confirmCancellation()}
            >
              {cancel.isPending ? (
                <>
                  <Spinner /> Cancelling…
                </>
              ) : (
                "Schedule cancellation"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
