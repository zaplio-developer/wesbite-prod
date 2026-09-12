import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import {
  homeChallenges,
  homeApproachPoints,
  homeApproachFeatures,
  homeComparisonRows,
  homeAudiences,
  homeAiReadiness,
  homeStats,
  homeTestimonials,
  homeFaqs,
} from "@/content/pages/home";
import { getAllArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ComparisonTable } from "@/components/mdx/ComparisonTable";
import { CountUp } from "@/components/ui/CountUp";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ArticleCard } from "@/components/cards/ArticleCard";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name}, ${siteConfig.eyebrow}`,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  const latestArticles = getAllArticles().slice(0, 3);

  return (
    <>
      <Section
        className="pt-24 sm:pt-32"
        containerClassName="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <Eyebrow>{siteConfig.eyebrow}</Eyebrow>
          <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
            Accelerating your next-gen digital infrastructure
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            From cloud and security to modern workspaces and managed operations, we power the IT
            that lets enterprise teams move faster, stay secure and lead their markets.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href={siteConfig.primaryCta.href}>
              {siteConfig.primaryCta.label}
            </LinkButton>
            <LinkButton href={siteConfig.secondaryCta.href} variant="secondary">
              {siteConfig.secondaryCta.label}
            </LinkButton>
          </div>
        </div>
        <ImagePlaceholder label="Homepage hero image" aspect="video" />
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>The challenge</Eyebrow>
        <Heading as="h2" size="md" className="mt-4">
          Is IT complexity holding your business back?
        </Heading>
        <p className="mt-4 max-w-2xl text-muted">
          Modern enterprises face mounting infrastructure challenges that drain budgets, expose
          risk and slow growth. Sound familiar?
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeChallenges.map((challenge) => (
            <Card key={challenge.title}>
              <h3 className="text-base font-semibold text-foreground">{challenge.title}</h3>
              <p className="mt-2 text-sm text-muted">{challenge.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>The Zaplio approach</Eyebrow>
        <Heading as="h2" size="md" className="mt-4">
          Transform IT from a cost center into a strategic asset
        </Heading>
        <p className="mt-4 max-w-2xl text-muted">
          We don&apos;t just solve isolated problems, we architect complete solutions that work
          seamlessly together. Your cloud, network, security and workplace technologies are
          designed, delivered and managed as one integrated solution by a single accountable
          partner.
        </p>
        <ul className="mt-6 max-w-2xl space-y-2 text-sm text-foreground">
          {homeApproachPoints.map((point) => (
            <li key={point} className="flex gap-2">
              <span aria-hidden className="text-accent">
                &bull;
              </span>
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <LinkButton href="/services" variant="secondary">
            Explore our services
          </LinkButton>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeApproachFeatures.map((feature) => (
            <Card key={feature.title}>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>What we do</Eyebrow>
        <Heading as="h2" size="md" className="mt-4">
          Comprehensive IT infrastructure services
        </Heading>
        <p className="mt-4 max-w-2xl text-muted">
          From strategy to execution to ongoing management, covered end to end by certified
          specialists.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Why integrated wins</Eyebrow>
        <Heading as="h2" size="md" className="mt-4">
          Point solutions vs. one integrated partner
        </Heading>
        <p className="mt-4 max-w-2xl text-muted">
          Disconnected vendors create silos, complexity and integration headaches. Here&apos;s
          what changes when one partner owns the whole stack.
        </p>
        <div className="mt-8">
          <ComparisonTable
            headers={["Zaplio as your partner", "Multiple point vendors"]}
            rows={homeComparisonRows}
          />
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Who we serve</Eyebrow>
        <Heading as="h2" size="md" className="mt-4">
          Tailored solutions for every stage of growth
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {homeAudiences.map((audience) => (
            <Card key={audience.title}>
              <h3 className="text-base font-semibold text-foreground">{audience.title}</h3>
              <p className="mt-2 text-sm text-muted">{audience.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>{homeAiReadiness.eyebrow}</Eyebrow>
        <Heading as="h2" size="md" className="mt-4 max-w-2xl">
          {homeAiReadiness.heading}
        </Heading>
        <p className="mt-4 max-w-2xl text-muted">{homeAiReadiness.description}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {homeAiReadiness.pillars.map((pillar) => (
            <Card key={pillar.title}>
              <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted">{pillar.description}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <LinkButton href={homeAiReadiness.ctaHref} variant="secondary">
            {homeAiReadiness.ctaLabel}
          </LinkButton>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Outcomes that move the business forward.
        </Heading>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {homeStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-foreground sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
          <div>
            <p className="text-3xl font-semibold text-foreground sm:text-4xl">24/7</p>
            <p className="mt-1 text-sm text-muted">NOC &amp; SOC monitoring</p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Built on trust, expertise and results.
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {homeTestimonials.map((testimonial) => (
            <Card key={testimonial.role}>
              <p className="text-sm text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-foreground">{testimonial.role}</p>
              <p className="text-sm text-muted">{testimonial.industry}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Questions, answered.
        </Heading>
        <div className="mt-8 max-w-3xl">
          <Accordion items={homeFaqs} />
        </div>
      </Section>

      {latestArticles.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Latest from Zaplio
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-border">
        <Card className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Eyebrow>No obligation, just insights</Eyebrow>
            <Heading as="h2" size="sm" className="mt-2">
              Ready to transform your infrastructure?
            </Heading>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Schedule a free consultation with our infrastructure experts. We&apos;ll assess
              where you are and map a clear path to a faster, more secure, lower-cost IT
              foundation.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <LinkButton href={siteConfig.primaryCta.href}>Schedule free consultation</LinkButton>
            <LinkButton href={siteConfig.secondaryCta.href} variant="secondary">
              Explore Services
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}
