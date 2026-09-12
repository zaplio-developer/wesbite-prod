import type { Service } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/structured-data";

export function ServicePageTemplate({ service }: { service: Service }) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name, href: `/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={serviceSchema(service)} />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}

      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={breadcrumbItems} />
      </Section>

      <Section className="grid items-center gap-10 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>{service.eyebrow}</Eyebrow>
          <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
            {service.title}
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-muted">{service.description}</p>
          <div className="mt-8">
            <LinkButton href={siteConfig.primaryCta.href}>
              {siteConfig.primaryCta.label}
            </LinkButton>
          </div>
        </div>
        <ImagePlaceholder label={`${service.name} hero image`} aspect="video" />
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Why this matters
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {service.benefits.map((benefit) => (
            <Card key={benefit.title}>
              <h3 className="text-base font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Capabilities
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((capability) => (
            <div key={capability.title}>
              <h3 className="text-sm font-semibold text-foreground">{capability.title}</h3>
              <p className="mt-2 text-sm text-muted">{capability.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Our approach
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step) => (
            <div key={step.number}>
              <p className="text-sm font-semibold text-accent">{step.number}</p>
              <h3 className="mt-2 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {service.outcomes.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Outcomes
          </Heading>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {service.outcomes.map((outcome) => (
              <Metric key={outcome.label} value={outcome.value} label={outcome.label} />
            ))}
          </div>
        </Section>
      )}

      {service.faqs.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Frequently asked questions
          </Heading>
          <div className="mt-8 max-w-3xl">
            <Accordion items={service.faqs} />
          </div>
        </Section>
      )}

      <Section className="border-t border-border">
        <Card className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Heading as="h2" size="sm">
              Ready to talk through your {service.name.toLowerCase()} needs?
            </Heading>
            <p className="mt-2 text-sm text-muted">
              Start with an infrastructure assessment tailored to your environment.
            </p>
          </div>
          <LinkButton href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </LinkButton>
        </Card>
      </Section>
    </>
  );
}
