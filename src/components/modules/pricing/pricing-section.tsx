import {
  ArrowRight,
  Check,
  CircleHelp,
  Crown,
  FolderKanban,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const plans = [
  {
    name: "Free",
    description: "Everything you need to get started.",
    price: "$0",
    period: "/month",
    icon: Layers3,
    popular: false,
    buttonText: "Get Started Free",
    features: [
      "Up to 5 members",
      "2 teams",
      "3 projects",
      "100 tasks per project",
      "500 MB storage",
      "5 MB maximum file size",
    ],
  },
  {
    name: "Pro",
    description: "More power for growing teams.",
    price: "$49",
    period: "/month",
    icon: Zap,
    popular: true,
    buttonText: "Choose Pro",
    features: [
      "Up to 25 members",
      "10 teams",
      "15 projects",
      "1,000 tasks per project",
      "10 GB storage",
      "25 MB maximum file size",
    ],
  },
  {
    name: "Business",
    description: "Scale projects across your organization.",
    price: "$99",
    period: "/month",
    icon: Crown,
    popular: false,
    buttonText: "Choose Business",
    features: [
      "Up to 100 members",
      "30 teams",
      "50 projects",
      "5,000 tasks per project",
      "50 GB storage",
      "100 MB maximum file size",
    ],
  },
];

const comparisonFeatures = [
  {
    category: "Project Management",
    icon: FolderKanban,
    features: [
      { name: "Projects", free: "3", pro: "15", business: "50" },
      {
        name: "Tasks per project",
        free: "100",
        pro: "1,000",
        business: "5,000",
      },
      { name: "Task priorities", free: true, pro: true, business: true },
      { name: "Subtasks", free: true, pro: true, business: true },
    ],
  },
  {
    category: "Team & Workspace",
    icon: Users,
    features: [
      { name: "Team members", free: "5", pro: "25", business: "100" },
      { name: "Teams", free: "2", pro: "10", business: "30" },
      { name: "Organization workspace", free: true, pro: true, business: true },
      { name: "Role-based access", free: true, pro: true, business: true },
    ],
  },
  {
    category: "Storage & Files",
    icon: ShieldCheck,
    features: [
      { name: "Storage", free: "500 MB", pro: "10 GB", business: "50 GB" },
      {
        name: "Maximum file size",
        free: "5 MB",
        pro: "25 MB",
        business: "100 MB",
      },
    ],
  },
];

const faqs = [
  {
    question: "Which Synoflow plan should I choose?",
    answer:
      "Start with Free if you are exploring Synoflow or managing a small workspace. Pro and Business offer higher resource limits for larger teams.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "You can choose a different plan as your team's needs change. Subscription upgrade behavior will be connected when billing functionality is implemented.",
  },
  {
    question: "What happens when I reach a plan limit?",
    answer:
      "Each plan has defined limits for members, teams, projects, tasks, and storage. The application can provide appropriate guidance when plan limit enforcement is implemented.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Subscription cancellation will be available according to the billing rules configured for your account once subscription management is connected.",
  },
];

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check
        className="mx-auto size-5 text-emerald-600"
        aria-label="Included"
      />
    ) : (
      <X
        className="mx-auto size-5 text-muted-foreground/50"
        aria-label="Not included"
      />
    );
  }

  return <span className="text-sm font-medium text-foreground">{value}</span>;
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px] bg-gradient-to-b from-indigo-50/80 via-white to-white"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-5 gap-2 rounded-full border-indigo-200 bg-indigo-50 px-4 py-1.5 text-indigo-700"
          >
            <Sparkles className="size-3.5" />
            SIMPLE & TRANSPARENT PRICING
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-[#10156F] sm:text-4xl lg:text-5xl">
            The right plan for
            <span className="mt-2 block text-[#4852F5]">
              your next big idea.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Start for free, find your flow, and choose a plan that grows with
            your team. No unnecessary complexity.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <Card
                key={plan.name}
                className={`relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                  plan.popular
                    ? "border-2 border-[#4852F5] shadow-xl shadow-indigo-100/70"
                    : "border-slate-200 shadow-sm hover:border-indigo-200"
                }`}
              >
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
                    ? "Free plan"
                    : "Pricing shown for design preview"}
                </p>

                <Button
                  type="button"
                  variant={plan.popular ? "default" : "outline"}
                  className={`mt-6 h-12 w-full rounded-xl font-semibold ${
                    plan.popular
                      ? "bg-[#4852F5] text-white shadow-md shadow-indigo-200 hover:bg-[#3A43D6]"
                      : "border-slate-200 text-[#10156F] hover:border-indigo-300 hover:bg-indigo-50 hover:text-[#4852F5]"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 size-4" />
                </Button>

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
              </Card>
            );
          })}
        </div>

        {/* Trust note */}
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

        {/* FAQ */}
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

          <Accordion type="single" collapsible className="mt-8 w-full">
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
    </section>
  );
}
