import type { Metadata } from "next";
import ContactForm from "@/components/form/contact-form";
import { ContactFaq } from "@/components/modules/contact/contact-faq";
import { ContactHero } from "@/components/modules/contact/contact-hero";
import { ContactInfoCards } from "@/components/modules/contact/contact-info-cards";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Synoflow for product questions, technical support, partnerships, and billing help.",
};

export default function ContactPage() {
  return (
    <main className="overflow-x-clip bg-background text-foreground antialiased">
      <ContactHero />
      <ContactInfoCards />
      <section
        id="contact-form"
        className="scroll-mt-24 border-y bg-muted/50 py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border bg-card px-5 py-7 shadow-sm shadow-slate-900/5 sm:px-8 sm:py-8 lg:px-10">
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactFaq />
    </main>
  );
}
