import type { Metadata } from "next";
import { industries } from "@/content/industries";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { IndustryCard } from "@/components/cards/IndustryCard";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Enterprise infrastructure for financial services, healthcare, manufacturing, retail & e-commerce, technology & SaaS, and public sector organizations.",
};

export default function IndustriesPage() {
  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }]} />
      </Section>
      <Section className="pt-6">
        <Eyebrow>Who we serve</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          Infrastructure built around the demands of your industry.
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Different sectors carry different infrastructure priorities. We design and operate
          around what actually matters in yours.
        </p>
      </Section>
      <Section className="border-t border-border">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </Section>
    </>
  );
}
