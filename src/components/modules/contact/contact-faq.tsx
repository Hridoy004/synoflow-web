import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

type Faq = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

const FAQS: Faq[] = [
  {
    question: "How do I create an organization in Synoflow?",
    answer:
      "Create a free account, then set up your organization from your dashboard. Once it exists, you can add projects and bring your team in.",
    link: { href: "/register", label: "Create an account" },
  },
  {
    question: "How can I invite team members?",
    answer:
      "Open your organization's member settings and send invitations from there. Invited people can join after they accept.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Use the password reset option on the login page. If you still can't sign in, send us a message with the form above.",
    link: { href: "/login", label: "Go to login" },
  },
  {
    question: "How can I manage my subscription?",
    answer:
      "Subscription options are available in your account settings. You can compare plans on the pricing page.",
    link: { href: "/pricing", label: "View pricing" },
  },
  {
    question: "How do I report a technical issue?",
    answer:
      "Choose Technical Support or Bug Report in the form above, and describe the steps that lead to the problem, what you expected, and what actually happened.",
  },
];

export function ContactFaq() {
  return (
    <section id="faq" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Quick answers to common questions about getting started.
          </p>
        </div>

        <Accordion className="mt-10 rounded-2xl border bg-card px-5 sm:mt-12 sm:px-7">
          {FAQS.map(({ question, answer, link }) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger className="py-5 text-left text-base font-semibold">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-7 text-muted-foreground">
                <p>{answer}</p>
                {link && (
                  <Link
                    href={link.href}
                    className="mt-3 inline-block rounded-sm text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
