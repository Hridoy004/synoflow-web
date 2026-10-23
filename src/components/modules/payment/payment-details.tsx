"use client";

import { ArrowLeft, RotateCw } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayment } from "@/hooks/billing.hook";
import { useOrganization } from "@/hooks/organization.hook";

function formatAmount(amount: string | number, currency: string) {
  const value = Number(amount);
  return Number.isFinite(value)
    ? new Intl.NumberFormat("en-BD", { style: "currency", currency }).format(
        value,
      )
    : `${amount} ${currency}`;
}

export function PaymentDetails({
  orgId,
  paymentId,
}: {
  orgId: string;
  paymentId: string;
}) {
  const organization = useOrganization(orgId);
  const canViewPayment =
    organization.isSuccess && organization.data.data.role === "OWNER";
  const payment = usePayment(paymentId, canViewPayment);
  const paymentBelongsToOrganization =
    payment.data?.data.organizationId === orgId;

  if (!paymentId.trim()) {
    return (
      <p role="alert" className="rounded-lg border p-4 text-sm">
        A payment ID is required.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <Button
        variant="ghost"
        nativeButton={false}
        render={
          <Link
            href={`/user/organizations/${encodeURIComponent(orgId)}/subscription`}
          />
        }
      >
        <ArrowLeft /> Back to billing
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Payment details</CardTitle>
          <p className="break-all text-sm text-muted-foreground">
            Reference: {paymentId}
          </p>
        </CardHeader>
        <CardContent>
          {organization.isPending && (
            <Skeleton className="h-28 w-full rounded-lg" />
          )}
          {organization.isError && (
            <p role="alert" className="rounded-lg border p-4 text-sm">
              Organization could not be loaded. Verify the organization URL and
              try again.
            </p>
          )}
          {organization.isSuccess && !canViewPayment && (
            <p role="alert" className="rounded-lg border p-4 text-sm">
              Only organization owners can view billing payment details.
            </p>
          )}
          {canViewPayment && payment.isPending && (
            <Skeleton className="h-28 w-full rounded-lg" />
          )}
          {canViewPayment && payment.isError && (
            <div
              role="alert"
              className="space-y-3 rounded-lg border border-destructive/30 p-4"
            >
              <p className="text-sm text-destructive">
                Payment details could not be loaded. Check the payment reference
                and your organization access, then retry.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => void payment.refetch()}
              >
                <RotateCw /> Retry
              </Button>
            </div>
          )}
          {canViewPayment &&
            !payment.isPending &&
            !payment.isError &&
            payment.data?.data &&
            (paymentBelongsToOrganization ? (
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="mt-1">
                    <Badge
                      variant={
                        payment.data.data.status === "SUCCESS"
                          ? "default"
                          : payment.data.data.status === "FAILED"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {payment.data.data.status}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Amount</dt>
                  <dd className="mt-1 font-semibold">
                    {formatAmount(
                      payment.data.data.amount,
                      payment.data.data.currency,
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">
                    Payment method
                  </dt>
                  <dd className="mt-1">{payment.data.data.provider}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Created</dt>
                  <dd className="mt-1">
                    {new Date(payment.data.data.createdAt).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Paid at</dt>
                  <dd className="mt-1">
                    {payment.data.data.paidAt
                      ? new Date(payment.data.data.paidAt).toLocaleString()
                      : "Not paid"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">
                    Transaction reference
                  </dt>
                  <dd className="mt-1 break-all">
                    {payment.data.data.providerTransactionId ??
                      payment.data.data.transactionId}
                  </dd>
                </div>
              </dl>
            ) : (
              <p role="alert" className="rounded-lg border p-4 text-sm">
                This payment does not belong to the selected organization.
              </p>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
