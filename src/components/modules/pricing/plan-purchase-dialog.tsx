"use client";

import { Building2, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import {
  useCreateCheckout,
  useCreateSubscription,
  useGetMe,
  useOrganizations,
  useSubscription,
  useUpdateSubscription,
} from "@/hooks";
import { getBkashCheckoutUrl } from "@/lib/billing.utils";
import type { Organization, SubscriptionPlan } from "@/types";
import { pricingPlans } from "./pricing-plans";

function getInternalPlanPath(plan: SubscriptionPlan) {
  return `/pricing?plan=${encodeURIComponent(plan)}`;
}

function isSubscriptionNotFound(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const responseError = error as {
    status?: unknown;
    statusCode?: unknown;
    message?: unknown;
    data?: { message?: unknown };
  };
  const status = responseError.statusCode ?? responseError.status;
  const message =
    typeof responseError.data?.message === "string"
      ? responseError.data.message
      : typeof responseError.message === "string"
        ? responseError.message
        : "";

  return status === 404 && /^subscription not found\.?$/i.test(message.trim());
}

export function PlanPurchaseDialog({
  planId,
  open,
  onOpenChange,
}: {
  planId: SubscriptionPlan;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { data: userData, isPending: isUserPending } = useGetMe();
  const user = userData?.data;
  const [organizationPage, setOrganizationPage] = useState(1);
  const {
    data: organizationData,
    isPending: isOrganizationsPending,
    isError: organizationsError,
    isPlaceholderData: isOrganizationsPlaceholder,
    refetch: refetchOrganizations,
  } = useOrganizations(
    { page: organizationPage, limit: 10 },
    Boolean(user) && open,
  );
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const [checkoutUrlError, setCheckoutUrlError] = useState(false);
  const [checkoutResponse, setCheckoutResponse] = useState<{
    paymentId: string;
    paymentUrl: string | null;
  } | null>(null);
  const {
    data: subscriptionData,
    isPending: isSubscriptionPending,
    isError: subscriptionError,
    error: subscriptionQueryError,
    refetch: refetchSubscription,
  } = useSubscription(selectedOrganization?.id ?? "");
  const createSubscription = useCreateSubscription(
    selectedOrganization?.id ?? "",
  );
  const updateSubscription = useUpdateSubscription(
    selectedOrganization?.id ?? "",
  );
  const createCheckout = useCreateCheckout(selectedOrganization?.id ?? "");
  const plan = pricingPlans.find(({ id }) => id === planId);
  const organizations = organizationData?.data.data ?? [];
  const organizationPages = organizationData?.data.meta.totalPages ?? 1;
  const subscriptionNotFound =
    subscriptionError && isSubscriptionNotFound(subscriptionQueryError);
  const isSubmitting =
    createSubscription.isPending ||
    updateSubscription.isPending ||
    createCheckout.isPending;
  const subscriptionRecord = subscriptionData?.success
    ? subscriptionData.data
    : null;
  const hasCurrentSubscription = Boolean(subscriptionRecord);
  const canStartPurchase =
    subscriptionNotFound ||
    (!subscriptionError && subscriptionData?.success === true);

  useEffect(() => {
    if (!open || isUserPending || user) {
      return;
    }

    const next = getInternalPlanPath(planId);
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [isUserPending, open, planId, router, user]);

  const resetAndClose = (nextOpen: boolean) => {
    if (!nextOpen && isSubmitting) {
      return;
    }
    if (!nextOpen) {
      setSelectedOrganization(null);
      setOrganizationPage(1);
      setCheckoutUrlError(false);
      setCheckoutResponse(null);
    }
    onOpenChange(nextOpen);
  };

  const submitPurchase = async () => {
    if (!selectedOrganization || !plan || !canStartPurchase) {
      return;
    }

    try {
      if (plan.id === "FREE") {
        if (hasCurrentSubscription) {
          await updateSubscription.mutateAsync({
            plan: plan.id,
            cancelAtPeriodEnd: false,
          });
        } else {
          await createSubscription.mutateAsync({ plan: plan.id });
        }
        toast.add({
          title: "Free plan active",
          description: `${selectedOrganization.name} is now on the Free plan.`,
          type: "success",
        });
      } else {
        const response = await createCheckout.mutateAsync({ plan: plan.id });
        const checkoutData = response.data;
        const paymentId =
          typeof checkoutData?.paymentId === "string"
            ? checkoutData.paymentId
            : "";
        const paymentUrl =
          typeof checkoutData?.paymentUrl === "string"
            ? checkoutData.paymentUrl
            : null;
        const checkoutUrl = getBkashCheckoutUrl(paymentUrl);
        setCheckoutResponse({ paymentId, paymentUrl });

        if (!paymentId || !checkoutUrl) {
          setCheckoutUrlError(true);
          return;
        }

        window.location.assign(checkoutUrl);
      }
    } catch {
      if (plan.id !== "FREE") {
        setCheckoutUrlError(true);
        toast.add({
          title: "Checkout outcome is unknown",
          description:
            "Check billing history before trying again to avoid duplicate payments.",
          type: "error",
        });
      } else {
        toast.add({
          title: "Unable to change your plan",
          description: "The plan was not confirmed. Please retry.",
          type: "error",
        });
      }
    }
  };

  const showConfirmation =
    selectedOrganization !== null && !isSubscriptionPending && canStartPurchase;
  const selectedPlanAlreadyActive =
    subscriptionRecord?.status === "ACTIVE" &&
    subscriptionRecord.plan === plan?.id;
  const subscriptionCannotChangePlan =
    subscriptionRecord?.status === "CANCELLED" ||
    subscriptionRecord?.status === "EXPIRED";
  const freePlanActivated =
    plan?.id === "FREE" &&
    (createSubscription.data?.data?.status === "ACTIVE" ||
      updateSubscription.data?.data?.status === "ACTIVE");

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {selectedOrganization
              ? "Confirm your plan"
              : "Choose an organization"}
          </DialogTitle>
          <DialogDescription>
            {selectedOrganization
              ? "Billing is managed by the organization owner."
              : `Select which organization should use the ${plan?.name ?? "selected"} plan.`}
          </DialogDescription>
        </DialogHeader>

        {isUserPending && (
          <div className="flex items-center gap-3 rounded-lg border p-4 text-sm text-muted-foreground">
            <Spinner /> Checking your sign-in…
          </div>
        )}

        {user && !selectedOrganization && (
          <div className="space-y-3">
            {isOrganizationsPending && (
              <div className="flex items-center gap-3 rounded-lg border p-4 text-sm text-muted-foreground">
                <Spinner /> Loading your organizations…
              </div>
            )}
            {organizationsError && (
              <div className="space-y-3 rounded-lg border border-destructive/30 p-4">
                <p className="text-sm text-destructive">
                  Organizations could not be loaded. Please retry.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void refetchOrganizations()}
                >
                  Retry
                </Button>
              </div>
            )}
            {!isOrganizationsPending &&
              !organizationsError &&
              organizations.length === 0 && (
                <div className="space-y-3 rounded-lg border p-4 text-sm">
                  <p>You need an organization before you can choose a plan.</p>
                  <Button
                    nativeButton={false}
                    render={<Link href="/user/organizations" />}
                  >
                    Create an organization
                  </Button>
                </div>
              )}
            {organizations.map((organization) => {
              const isOwner = organization.role === "OWNER";

              return (
                <div
                  key={organization.id}
                  className="flex items-center justify-between gap-4 rounded-lg border p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Building2 className="size-5 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {organization.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your role: {organization.role}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant={isOwner ? "default" : "outline"}
                    disabled={!isOwner || isOrganizationsPlaceholder}
                    onClick={() => setSelectedOrganization(organization)}
                  >
                    {isOwner ? "Select" : "Owner only"}
                  </Button>
                </div>
              );
            })}
            {organizationPages > 1 && (
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  disabled={
                    organizationPage <= 1 ||
                    isOrganizationsPending ||
                    isOrganizationsPlaceholder
                  }
                  onClick={() => setOrganizationPage((page) => page - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {organizationPage} of {organizationPages}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  disabled={
                    organizationPage >= organizationPages ||
                    isOrganizationsPending ||
                    isOrganizationsPlaceholder
                  }
                  onClick={() => setOrganizationPage((page) => page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
            {organizations.some(({ role }) => role !== "OWNER") && (
              <p className="text-sm text-muted-foreground">
                Organization members cannot manage billing. Ask an owner to
                choose or change a plan.
              </p>
            )}
          </div>
        )}

        {selectedOrganization && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Organization</p>
              <p className="font-medium">{selectedOrganization.name}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Selected plan
              </p>
              <p className="font-medium">
                {plan?.name} · {plan?.price}
                {plan?.period}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Prices are shown in BDT with monthly billing. The payment
                service must confirm the final amount before payment.
              </p>
            </div>

            {isSubscriptionPending && (
              <div className="flex items-center gap-3 rounded-lg border p-4 text-sm text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" />
                Checking the current subscription…
              </div>
            )}

            {subscriptionNotFound && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
                No subscription is currently set up for this organization. You
                can continue with the selected plan.
              </div>
            )}

            {subscriptionError && !subscriptionNotFound && (
              <div className="space-y-3 rounded-lg border border-destructive/30 p-4">
                <p className="text-sm text-destructive">
                  The current subscription could not be verified. No purchase
                  has been started.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void refetchSubscription()}
                >
                  Retry
                </Button>
              </div>
            )}

            {subscriptionRecord && (
              <div className="rounded-lg border p-4 text-sm">
                Current plan:{" "}
                <span className="font-semibold">
                  {subscriptionRecord.plan} · {subscriptionRecord.status}
                </span>
              </div>
            )}

            {selectedPlanAlreadyActive && (
              <p className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
                This plan is already active for this organization.
              </p>
            )}

            {subscriptionCannotChangePlan && (
              <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
                This subscription is {subscriptionRecord.status.toLowerCase()}.
                Contact support to reactivate the organization plan.
              </p>
            )}

            {checkoutUrlError && (
              <div
                role="alert"
                className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
              >
                Checkout could not be verified, so no redirect was made. A
                payment may already exist; check billing history before trying
                again.
                {checkoutResponse?.paymentId && (
                  <p className="break-all font-medium">
                    Payment reference: {checkoutResponse.paymentId}
                  </p>
                )}
                <Button
                  nativeButton={false}
                  variant="outline"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  render={
                    <Link
                      href={`/user/organizations/${encodeURIComponent(selectedOrganization.id)}/subscription`}
                    />
                  }
                >
                  View billing history
                </Button>
              </div>
            )}

            {freePlanActivated && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
                Your Free plan is active for this organization.
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {selectedOrganization && (
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => {
                setSelectedOrganization(null);
                setCheckoutUrlError(false);
                setCheckoutResponse(null);
              }}
            >
              Back
            </Button>
          )}
          {showConfirmation && (
            <Button
              type="button"
              disabled={
                isSubmitting ||
                freePlanActivated ||
                checkoutUrlError ||
                selectedPlanAlreadyActive ||
                subscriptionCannotChangePlan
              }
              onClick={() => void submitPurchase()}
            >
              {isSubmitting ? (
                <>
                  <Spinner /> Starting…
                </>
              ) : plan?.id === "FREE" ? (
                "Request Free plan"
              ) : (
                "Continue to checkout"
              )}
            </Button>
          )}
          {selectedOrganization && !showConfirmation && (
            <Button
              type="button"
              variant="outline"
              onClick={() => resetAndClose(false)}
            >
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
