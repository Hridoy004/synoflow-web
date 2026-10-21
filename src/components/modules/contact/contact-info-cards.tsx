import {
  ArrowRight,
  Handshake,
  LifeBuoy,
  type LucideIcon,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { InquiryType } from "@/validation/contact.validation";

type ContactOption = {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
  inquiry: InquiryType;
};

const CONTACT_OPTIONS: ContactOption[] = [
  {
    icon: Mail,
    title: "General Inquiries",
    description: "Questions about Synoflow and its features.",
    action: "Send an inquiry",
    inquiry: "general",
  },
  {
    icon: LifeBuoy,
    title: "Technical Support",
    description: "Need help with your workspace or account?",
    action: "Get support",
    inquiry: "support",
  },
  {
    icon: Handshake,
    title: "Sales & Partnerships",
    description: "Discuss subscription plans and collaboration opportunities.",
    action: "Contact sales",
    inquiry: "partnership",
  },
];

export function ContactInfoCards() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {CONTACT_OPTIONS.map(
            ({ icon: Icon, title, description, action, inquiry }) => (
              <li key={inquiry}>
                <Card className="h-full gap-0 rounded-2xl py-0 shadow-none transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-5 lg:p-6">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="mt-5 text-lg leading-snug">
                      {title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm leading-6">
                      {description}
                    </CardDescription>
                    <Button
                      variant="link"
                      nativeButton={false}
                      render={
                        <Link
                          href={`/contact?inquiry=${inquiry}#contact-form`}
                        />
                      }
                      className="mt-4 h-auto self-start px-0 py-2 text-sm font-semibold"
                    >
                      {action}
                      <ArrowRight className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
