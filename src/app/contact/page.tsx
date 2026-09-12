import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Talk to the Zaplio team about your infrastructure needs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />
      </Section>

      <Section className="pt-6">
        <Eyebrow>Get in touch</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          Talk to an expert about your infrastructure.
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Tell us a bit about what you&apos;re working on and we&apos;ll get back to you.
        </p>
      </Section>

      <Section className="border-t border-border">
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
