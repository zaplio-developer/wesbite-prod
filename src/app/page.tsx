import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { homeTestimonials, homeFaqs } from "@/content/pages/home";
import { getAllArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ArticleCard } from "@/components/cards/ArticleCard";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name}, ${siteConfig.eyebrow}`,
  description: siteConfig.description,
  path: "/",
});

const problems = [
  {
    title: "Rising operational costs",
    description: "Infrastructure spend grows faster than the value it delivers.",
  },
  {
    title: "Security exposure",
    description: "Gaps open up across specialist vendors with no single owner accountable.",
  },
  {
    title: "Legacy infrastructure",
    description: "Aging systems slow the business down and limit what's possible.",
  },
  {
    title: "Overloaded IT teams",
    description: "Internal teams spend more time firefighting than driving strategy.",
  },
];

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
            Infrastructure that moves your business forward.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-muted">{siteConfig.description}</p>
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
        <Heading as="h2" size="md">
          Infrastructure complexity is the real cost center.
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <Card key={problem.title}>
              <h3 className="text-base font-semibold text-foreground">{problem.title}</h3>
              <p className="mt-2 text-sm text-muted">{problem.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>The Zaplio model</Eyebrow>
        <Heading as="h2" size="md" className="mt-4">
          One infrastructure partner. One accountable team.
        </Heading>
        <p className="mt-4 max-w-2xl text-muted">
          Cloud, network, security, workplace and operations, designed and run together, instead
          of coordinated across disconnected specialist vendors.
        </p>
      </Section>

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Six service lines.
        </Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
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
            <Heading as="h2" size="sm">
              Know where you need to go. Not sure what needs to change?
            </Heading>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Start with an infrastructure assessment. We&apos;ll help you identify the
              highest-impact changes across cost, security, performance and operations.
            </p>
          </div>
          <LinkButton href={siteConfig.primaryCta.href}>Start an Assessment</LinkButton>
        </Card>
      </Section>
    </>
  );
}
