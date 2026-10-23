"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { SubscriptionPlan } from "@/types";
import { PlanPurchaseDialog } from "./plan-purchase-dialog";
import { isSubscriptionPlan, pricingPlans } from "./pricing-plans";

const faqs = [
  {
    question: "Which Synoflow plan should I choose?",
    answer:
      "Start with Free if you are exploring Synoflow or managing a small workspace. Pro and Business offer higher resource limits for larger teams.",
  },
  {
    question: "Are these prices available for checkout?",
    answer:
      "You can request a plan from this page, but the billing service's checkout response and payment confirmation contracts are not yet documented. Prices and billing terms remain a preview until those details are confirmed.",
  },
  {
    question: "How do I compare the plans?",
    answer:
      "Compare the member, team, project, task, and storage limits listed on each plan to find the best fit for your workspace.",
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null,
  );
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedPlan = params.get("plan");

    if (isSubscriptionPlan(requestedPlan)) {
      setSelectedPlan(requestedPlan);
      setPurchaseDialogOpen(true);
    }
  }, []);

  return (
    <section
      id="pricing"
      className="relative isolate -mt-16 overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-0 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mt-8 mb-5 gap-2 rounded-full border-primary/20 bg-primary/10 px-4 py-1.5 text-primary"
          >
            <Sparkles className="size-3.5" />
            SIMPLE & TRANSPARENT PRICING
          </Badge>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-[#10156F] sm:text-4xl lg:text-5xl">
            The right plan for
            <span className="mt-2 block text-[#4852F5]">
              your next big idea.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
            Start for free, find your flow, and choose a plan that grows with
            your team. No unnecessary complexity.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-stretch gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;

            return (
              <button
                type="button"
                key={plan.name}
                aria-pressed={selectedPlan === plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative flex h-full w-full cursor-pointer flex-col rounded-2xl border bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4852F5]/25 sm:p-8 ${
                  selectedPlan === plan.id
                    ? "border-2 border-[#4852F5] bg-indigo-50/50 shadow-xl shadow-indigo-100/70 ring-2 ring-[#4852F5]/20"
                    : plan.popular
                      ? "border-2 border-indigo-200 shadow-lg shadow-indigo-100/50 hover:border-[#4852F5]/60"
                      : "border-slate-200 shadow-sm hover:border-indigo-300"
                }`}
              >
                {selectedPlan === plan.id && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#4852F5] px-2.5 py-1 text-xs font-semibold text-white">
                    <CheckCircle2 aria-hidden="true" className="size-3.5" />
                    SELECTED
                  </span>
                )}

                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="rounded-full border-0 bg-[#4852F5] px-4 py-1.5 text-white shadow-md shadow-indigo-200">
                      <Sparkles className="mr-1.5 size-3.5" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${
                      plan.popular
                        ? "bg-indigo-100 text-[#4852F5]"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Icon className="size-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#10156F]">
                      {plan.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {plan.name === "Free"
                        ? "Start exploring"
                        : plan.name === "Pro"
                          ? "Grow together"
                          : "Scale with confidence"}
                    </p>
                  </div>
                </div>

                <p className="mt-5 min-h-12 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-[#10156F] sm:text-5xl">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-500">{plan.period}</span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {plan.name === "Free"
                    ? "Free plan · ৳0"
                    : "BDT · billed monthly"}
                </p>

                <span
                  className={`mt-6 flex h-12 w-full items-center justify-center rounded-xl border font-semibold transition-colors ${
                    selectedPlan === plan.id || plan.popular
                      ? "border-[#4852F5] bg-[#4852F5] text-white shadow-md shadow-indigo-200"
                      : "border-indigo-200 bg-white text-[#10156F]"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected plan" : plan.buttonText}
                  <ArrowRight className="ml-2 size-4" />
                </span>

                <Separator className="my-7" />

                <div>
                  <p className="mb-4 text-sm font-semibold text-[#10156F]">
                    What&apos;s included
                  </p>

                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                          <Check className="size-3.5 text-emerald-600" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-auto pt-7 text-xs leading-5 text-slate-400">
                  {plan.name === "Free"
                    ? "A simple way to get your workspace started."
                    : `Designed for teams that need ${plan.name === "Pro" ? "more room to grow." : "more room to scale."}`}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm text-slate-600" aria-live="polite">
            {selectedPlan
              ? `${pricingPlans.find((plan) => plan.id === selectedPlan)?.name} plan selected`
              : "Select a plan to continue"}
          </p>
          <Button
            type="button"
            disabled={!selectedPlan}
            onClick={() => setPurchaseDialogOpen(true)}
            className="h-11 min-w-56 rounded-xl bg-[#4852F5] px-6 font-semibold text-white shadow-md shadow-indigo-200 hover:bg-[#3A43D6]"
          >
            Continue with selected plan
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <Check className="size-4 text-emerald-600" />
            Clear plan limits
          </span>
          <span className="flex items-center gap-2">
            <Check className="size-4 text-emerald-600" />
            Flexible workspace options
          </span>
          <span className="flex items-center gap-2">
            <Check className="size-4 text-emerald-600" />
            Transparent pricing
          </span>
        </div>

        <div className="mx-auto mt-24 max-w-3xl sm:mt-28">
          <div className="text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#4852F5]">
              <CircleHelp className="size-6" />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-[#10156F] sm:text-3xl">
              Frequently asked questions
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Everything you need to know about Synoflow pricing.
            </p>
          </div>

          <Accordion className="mt-8 w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-b border-slate-200 py-2"
              >
                <AccordionTrigger className="gap-4 text-left text-sm font-semibold text-slate-800 hover:text-[#4852F5] hover:no-underline sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl text-sm leading-7 text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      {selectedPlan && purchaseDialogOpen && (
        <PlanPurchaseDialog
          planId={selectedPlan}
          open={purchaseDialogOpen}
          onOpenChange={(open) => {
            setPurchaseDialogOpen(open);
          }}
        />
      )}
    </section>
  );
}
