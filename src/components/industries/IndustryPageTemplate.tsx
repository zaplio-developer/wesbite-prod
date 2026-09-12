import type { Industry } from "@/content/types";
import { getServiceBySlug } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function IndustryPageTemplate({ industry }: { industry: Industry }) {
  const relatedServices = industry.relatedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries" },
            { label: industry.name, href: `/industries/${industry.slug}` },
          ]}
        />
      </Section>

      <Section className="pt-6">
        <Eyebrow>{industry.eyebrow}</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          {industry.title}
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted">{industry.description}</p>
        <div className="mt-8">
          <LinkButton href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </LinkButton>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Industry challenges
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {industry.challenges.map((challenge) => (
            <Card key={challenge.title}>
              <h3 className="text-base font-semibold text-foreground">{challenge.title}</h3>
              <p className="mt-2 text-sm text-muted">{challenge.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Infrastructure priorities
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industry.priorities.map((priority) => (
            <div key={priority.title}>
              <h3 className="text-sm font-semibold text-foreground">{priority.title}</h3>
              <p className="mt-2 text-sm text-muted">{priority.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {relatedServices.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Relevant services
          </Heading>
          <div className="mt-8 flex flex-wrap gap-3">
            {relatedServices.map((service) => (
              <LinkButton key={service.slug} href={`/${service.slug}`} variant="secondary">
                {service.name}
              </LinkButton>
            ))}
          </div>
        </Section>
      )}

      {industry.compliance.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Security & compliance considerations
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {industry.compliance.map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {industry.outcomes.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Outcomes
          </Heading>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {industry.outcomes.map((outcome) => (
              <Metric key={outcome.label} value={outcome.value} label={outcome.label} />
            ))}
          </div>
        </Section>
      )}

      {industry.faqs.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Frequently asked questions
          </Heading>
          <div className="mt-8 max-w-3xl">
            <Accordion items={industry.faqs} />
          </div>
        </Section>
      )}

      <Section className="border-t border-border">
        <Card className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Heading as="h2" size="sm">
              Ready to talk through your infrastructure needs?
            </Heading>
            <p className="mt-2 text-sm text-muted">
              Start with an infrastructure assessment tailored to {industry.name.toLowerCase()}.
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
