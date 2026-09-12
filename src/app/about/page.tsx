import type { Metadata } from "next";
import { aboutContent } from "@/content/pages/about";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { services } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: aboutContent.whoWeAre,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
      </Section>

      <Section className="pt-6">
        <Eyebrow>{aboutContent.eyebrow}</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          {aboutContent.title}
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted">{aboutContent.whoWeAre}</p>
        <p className="mt-4 max-w-2xl text-sm text-muted">{aboutContent.reach}</p>
      </Section>

      <Section
        className="border-t border-border"
        containerClassName="grid gap-6 sm:grid-cols-3"
      >
        <Card>
          <h2 className="text-base font-semibold text-foreground">Mission</h2>
          <p className="mt-2 text-sm text-muted">{aboutContent.mission}</p>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-foreground">Model</h2>
          <p className="mt-2 text-sm text-muted">{aboutContent.model}</p>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-foreground">Promise</h2>
          <p className="mt-2 text-sm text-muted">{aboutContent.promise}</p>
        </Card>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-3xl font-semibold text-foreground sm:text-4xl">
                <CountUp value={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted">{metric.label}</p>
            </div>
          ))}
          <div>
            <p className="text-3xl font-semibold text-foreground sm:text-4xl">
              <CountUp value={services.length} />
            </p>
            <p className="mt-1 text-sm text-muted">Integrated service lines under one partner</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-foreground sm:text-4xl">24/7</p>
            <p className="mt-1 text-sm text-muted">Monitoring, response and support</p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          How we operate
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.operatingModel.map((step, index) => (
            <div key={step.title}>
              <p className="text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Leadership
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {aboutContent.leadership.map((person) => (
            <Card key={person.name} className="flex gap-4">
              <ImagePlaceholder
                label="Headshot"
                aspect="square"
                className="w-24 shrink-0"
              />
              <div>
                <h3 className="text-base font-semibold text-foreground">{person.name}</h3>
                <p className="mt-1 text-sm text-accent">{person.role}</p>
                <p className="mt-2 text-sm text-muted">{person.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Card className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Heading as="h2" size="sm">
              Want to talk to the team?
            </Heading>
            <p className="mt-2 text-sm text-muted">
              We&apos;ll start with an assessment of where things stand today.
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
