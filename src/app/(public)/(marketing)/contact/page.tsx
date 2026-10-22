import type { Metadata } from "next";
import ContactForm from "@/components/form/contact-form";
import { ContactFaq } from "@/components/modules/contact/contact-faq";
import { ContactHero } from "@/components/modules/contact/contact-hero";
import { ContactInfoCards } from "@/components/modules/contact/contact-info-cards";
import {
  type InquiryType,
  isInquiryType,
} from "@/validation/contact.validation";

const description =
  "Have a question, need support, or want to explore Synoflow? Get in touch with our team.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  openGraph: { title: "Contact Synoflow", description },
};

type ContactPageProps = {
  searchParams: Promise<{ inquiry?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { inquiry } = await searchParams;
  const requested = Array.isArray(inquiry) ? inquiry[0] : inquiry;
  const defaultInquiry: InquiryType | undefined = isInquiryType(requested)
    ? requested
    : undefined;

  return (
    <main className="overflow-x-clip bg-background text-foreground antialiased">
      <ContactHero />
      <ContactInfoCards />

      <section
        id="contact-form"
        className="scroll-mt-24 border-y bg-muted/50 py-16 sm:py-24"
      >
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <ContactForm
            key={defaultInquiry ?? "default"}
            defaultInquiry={defaultInquiry}
          />
        </div>
      </section>

      <ContactFaq />
      {/* <ContactCta /> */}
    </main>
  );
}
