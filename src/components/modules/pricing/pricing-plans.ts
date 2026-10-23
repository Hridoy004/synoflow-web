import type { LucideIcon } from "lucide-react";
import { Crown, Layers3, Zap } from "lucide-react";
import type { SubscriptionPlan } from "@/types";

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  description: string;
  price: string;
  period: string;
  icon: LucideIcon;
  popular: boolean;
  buttonText: string;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "FREE",
    name: "Free",
    description: "Everything you need to get started.",
    price: "৳0",
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
    id: "PRO",
    name: "Pro",
    description: "More power for growing teams.",
    price: "৳49",
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
    id: "BUSINESS",
    name: "Business",
    description: "Scale projects across your organization.",
    price: "৳99",
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

export function isSubscriptionPlan(
  value: string | null,
): value is SubscriptionPlan {
  return pricingPlans.some((plan) => plan.id === value);
}
