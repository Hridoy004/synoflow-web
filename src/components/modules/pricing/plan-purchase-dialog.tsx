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
import { useGetMe } from "@/hooks/auth.hook";
import {
  useCreateCheckout,
  useCreateSubscription,
  useSubscription,
  useUpdateSubscription,
} from "@/hooks/billing.hook";
import { useOrganizations } from "@/hooks/organization.hook";
import { getBkashCheckoutUrl } from "@/lib/billing.utils";
import type { Organization, SubscriptionPlan } from "@/types";
import { pricingPlans } from "./pricing-plans";

function isSubscriptionNotFound(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const details = error as { status?: number; statusCode?: number; message?: string };
  return (
    (details.status ?? details.statusCode) === 404 ||
    details.message?.toLowerCase().includes("subscription not found") === true
  );
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
  const { data: userData, isPending: userPending } = useGetMe();
  const user = userData?.data;
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const organizationsQuery = useOrganizations(
    { page: 1, limit: 20 },
    Boolean(user) && open,
  );
  const organizations = organizationsQuery.data?.data.data ?? [];
  const subscriptionQuery = useSubscription(selectedOrganization?.id ?? "", open);
  const createSubscription = useCreateSubscription(
    selectedOrganization?.id ?? "",
  );
  const updateSubscription = useUpdateSubscription(
    selectedOrganization?.id ?? "",
  );
  const createCheckout = useCreateCheckout(selectedOrganization?.id ?? "");
  const plan = pricingPlans.find((item) => item.id === planId);
  const subscriptionMissing =
    subscriptionQuery.isError &&
    isSubscriptionNotFound(subscriptionQuery.error);
  const currentSubscription = subscriptionQuery.data?.data ?? null;
  const pending =
    createSubscription.isPending ||
    updateSubscription.isPending ||
    createCheckout.isPending;

  useEffect(() => {
    if (!open || userPending || user) return;
    router.replace(`/login?next=${encodeURIComponent(`/pricing?plan=${planId}`)}`);
  }, [open, planId, router, user, userPending]);

  const close = (nextOpen: boolean) => {
    if (!nextOpen && pending) return;
    if (!nextOpen) setSelectedOrganization(null);
    onOpenChange(nextOpen);
  };

  const submit = async () => {
    if (!selectedOrganization || !plan) return;
    try {
      if (planId === "FREE") {
        if (currentSubscription) {
          await updateSubscription.mutateAsync({
            plan: "FREE",
            cancelAtPeriodEnd: false,
          });
        } else {
          await createSubscription.mutateAsync({ plan: "FREE" });
        }
        toast.add({
          title: "Free plan activated",
          description: `${selectedOrganization.name} is now on the Free plan.`,
          type: "success",
        });
        close(false);
        return;
      }

      const response = await createCheckout.mutateAsync({ plan: planId });
      const paymentUrl = getBkashCheckoutUrl(response.data.paymentUrl);
      if (!response.data.paymentId || !paymentUrl) {
        toast.add({
          title: "Checkout needs review",
          description:
            "A payment may have been created. Check billing before trying again.",
          type: "error",
        });
        return;
      }
      window.location.assign(paymentUrl);
    } catch {
      toast.add({
        title: planId === "FREE" ? "Plan activation failed" : "Checkout failed",
        description:
          planId === "FREE"
            ? "The plan was not changed. Please try again."
            : "Check payment history before retrying to avoid duplicate payments.",
        type: "error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {selectedOrganization ? `Activate ${plan?.name}` : "Choose an organization"}
          </DialogTitle>
          <DialogDescription>
            {selectedOrganization
              ? "Billing and subscription changes apply to the selected organization."
              : `Select an organization for the ${plan?.name ?? ""} plan.`}
          </DialogDescription>
        </DialogHeader>

        {!selectedOrganization ? (
          <div className="space-y-3">
            {organizationsQuery.isPending && (
              <div className="flex items-center gap-3 rounded-xl border p-4 text-sm text-slate-600">
                <Spinner /> Loading organizations…
              </div>
            )}
            {organizationsQuery.isError && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <p className="text-sm text-destructive">
                  Organizations could not be loaded.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => organizationsQuery.refetch()}
                >
                  Try again
                </Button>
              </div>
            )}
            {!organizationsQuery.isPending &&
              organizationsQuery.isSuccess &&
              organizations.length === 0 && (
                <div className="rounded-xl border p-5 text-center">
                  <Building2 className="mx-auto size-8 text-primary" />
                  <p className="mt-3 font-semibold">Create an organization first</p>
                  <Button className="mt-4" render={<Link href="/organizations" />}>
                    Create organization
                  </Button>
                </div>
              )}
            {organizations.map((organization) => (
              <button
                type="button"
                key={organization.id}
                className="flex w-full items-center justify-between rounded-xl border p-4 text-left transition hover:border-primary/50 hover:bg-primary/5"
                onClick={() => setSelectedOrganization(organization)}
              >
                <span>
                  <span className="block font-semibold">{organization.name}</span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {organization.role === "OWNER" ? "Owner" : "Member"}
                  </span>
                </span>
                {organization.role !== "OWNER" && (
                  <span className="text-xs text-slate-500">Owner access required</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {selectedOrganization.role !== "OWNER" ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                Only organization owners can manage subscriptions.
              </div>
            ) : subscriptionQuery.isPending ? (
              <div className="flex items-center gap-3 rounded-xl border p-4 text-sm">
                <Spinner /> Checking current subscription…
              </div>
            ) : subscriptionQuery.isError && !subscriptionMissing ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <p className="text-sm text-destructive">
                  Subscription details could not be loaded.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => subscriptionQuery.refetch()}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <>
                {currentSubscription?.status === "ACTIVE" &&
                  currentSubscription.plan === planId && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                      This organization already has the {plan?.name} plan.
                    </div>
                  )}
                <div className="rounded-xl border bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Organization</p>
                  <p className="mt-1 font-semibold">{selectedOrganization.name}</p>
                  <p className="mt-4 text-sm text-slate-500">Selected plan</p>
                  <p className="mt-1 font-semibold">
                    {plan?.name} · {plan?.price} {plan?.period}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <DialogFooter>
          {selectedOrganization && (
            <Button variant="ghost" onClick={() => setSelectedOrganization(null)}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={() => close(false)}>
            Cancel
          </Button>
          {selectedOrganization?.role === "OWNER" &&
            (!subscriptionQuery.isError ||
              subscriptionMissing ||
              subscriptionQuery.isSuccess) && (
              <Button onClick={submit} disabled={pending}>
                {pending && <LoaderCircle className="size-4 animate-spin" />}
                {planId === "FREE" ? "Activate free plan" : `Continue to checkout`}
              </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
