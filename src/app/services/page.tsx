import type { Metadata } from "next";
import { services } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Cybersecurity, cloud and data center, network transformation, digital workplace, managed IT and professional services, delivered as one integrated infrastructure partnership.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} />
      </Section>
      <Section className="pt-6">
        <Eyebrow>What we do</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          Six service lines. One accountable team.
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Cloud, cybersecurity, networking, workplace and managed IT, designed, delivered and
          operated together instead of as disconnected specialist engagements.
        </p>
      </Section>
      <Section className="border-t border-border">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>
    </>
  );
}
