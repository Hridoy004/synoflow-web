"use client";

import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SubscriptionPlan } from "@/types";
import { PlanPurchaseDialog } from "./plan-purchase-dialog";
import { isSubscriptionPlan, pricingPlans } from "./pricing-plans";

const faqs = [
  {
    question: "Which plan is right for my team?",
    answer:
      "Start with Free for small projects, choose Pro when you need more workspace capacity, or use Business for larger teams and organizations.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can upgrade or change the subscription from the billing settings of the organization that owns the workspace.",
  },
  {
    question: "How are paid plans activated?",
    answer:
      "After checkout, the paid plan is activated only when the payment provider confirms successful payment.",
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const requestedPlan = new URLSearchParams(window.location.search).get(
      "plan",
    );
    if (isSubscriptionPlan(requestedPlan)) {
      setSelectedPlan(requestedPlan);
      setDialogOpen(true);
    }
  }, []);

  const choosePlan = (planId: SubscriptionPlan) => {
    setSelectedPlan(planId);
    setDialogOpen(true);
  };

  return (
    <>
      <section className="relative isolate -mt-16 overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background pt-16">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
        />
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 text-center sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
          <Badge
            variant="outline"
            className="mt-8 gap-1.5 rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-primary"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            Simple, transparent pricing
          </Badge>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            A plan for every stage of your work
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Start free, then upgrade only when your team needs more capacity.
            No setup fees or hidden charges.
          </p>
        </div>
      </section>

      <section id="pricing" className="border-b py-10 sm:py-14">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-gradient-to-br via-card to-card p-5 shadow-none transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md lg:p-6 ${
                  plan.popular
                    ? "border-primary/40 from-primary/10 shadow-md shadow-primary/5"
                    : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-5 rounded-full px-3 py-1">
                    Most popular
                  </Badge>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="text-lg font-semibold leading-snug text-foreground">{plan.name}</h2>
                </div>
                <p className="mt-5 min-h-12 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-bold text-[#10156F]">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-slate-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">BDT · billed monthly</p>
                <Button
                  className="mt-7 h-11 w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => choosePlan(plan.id)}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <ul className="mt-8 space-y-3 border-t pt-7">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-6 text-slate-700"
                    >
                      <Check className="mt-1 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-3xl sm:mt-20">
          <h2 className="text-center text-balance text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <Accordion className="mt-10 rounded-2xl border bg-card px-5 sm:mt-12 sm:px-7">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <PlanPurchaseDialog
          planId={selectedPlan}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
}
