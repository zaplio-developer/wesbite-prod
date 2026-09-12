import type { Metadata } from "next";
import { partnersContent } from "@/content/pages/partners";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Our Partners",
  description: partnersContent.description,
  path: "/our-partners",
});

export default function PartnersPage() {
  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partners", href: "/our-partners" }]} />
      </Section>

      <Section className="pt-6">
        <Eyebrow>{partnersContent.eyebrow}</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          {partnersContent.title}
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted">{partnersContent.description}</p>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Technology categories
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partnersContent.categories.map((category) => (
            <Card key={category.name}>
              <h3 className="text-base font-semibold text-foreground">{category.name}</h3>
              <p className="mt-2 text-sm text-muted">{category.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {partnersContent.strategicPartners.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Strategic partners
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {partnersContent.strategicPartners.map((partner) => (
              <Card key={partner.name}>
                <h3 className="text-base font-semibold text-foreground">{partner.name}</h3>
                <p className="mt-2 text-sm text-muted">{partner.description}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-border">
        <Card className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Heading as="h2" size="sm">
              Want to know which partners fit your environment?
            </Heading>
          </div>
          <LinkButton href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </LinkButton>
        </Card>
      </Section>
    </>
  );
}
