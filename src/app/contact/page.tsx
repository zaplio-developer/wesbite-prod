import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

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

      <Section
        className="border-t border-border"
        containerClassName="grid gap-10 lg:grid-cols-[1fr_320px]"
      >
        <ContactForm />
        <div className="flex flex-col gap-6 text-sm">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-start gap-3 text-muted hover:text-foreground"
          >
            <Mail size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              {siteConfig.contact.email}
              <br />
              {siteConfig.contact.hours}
            </span>
          </a>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-start gap-3 text-muted hover:text-foreground"
          >
            <Phone size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            {siteConfig.contact.phone}
          </a>
          <div className="flex items-start gap-3 text-muted">
            <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-foreground">Registered Office</p>
              <p>{siteConfig.contact.registeredOffice}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-muted">
            <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-foreground">Corporate Office</p>
              <p>{siteConfig.contact.corporateOffice}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
