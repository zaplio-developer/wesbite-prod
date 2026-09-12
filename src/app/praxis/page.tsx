import type { Metadata } from "next";
import { praxisContent } from "@/content/pages/praxis";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PraxisApplicationForm } from "@/components/forms/PraxisApplicationForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "PRAXIS",
  description: praxisContent.description,
  path: "/praxis",
});

export default function PraxisPage() {
  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "PRAXIS", href: "/praxis" }]} />
      </Section>

      <Section className="pt-6">
        <Eyebrow>{praxisContent.eyebrow}</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          {praxisContent.title}
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted">{praxisContent.description}</p>
      </Section>

      <Section className="grid gap-6 border-t border-border sm:grid-cols-2">
        <Card>
          <h3 className="text-base font-semibold text-foreground">What PRAXIS is</h3>
          <p className="mt-2 text-sm text-muted">{praxisContent.whatItIs}</p>
        </Card>
        <Card>
          <h3 className="text-base font-semibold text-foreground">Why it&apos;s different</h3>
          <p className="mt-2 text-sm text-muted">{praxisContent.whyDifferent}</p>
        </Card>
      </Section>

      {praxisContent.pillars.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Six pillars
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {praxisContent.pillars.map((pillar) => (
              <Card key={pillar.title}>
                <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm text-muted">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {praxisContent.phases.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            The journey
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {praxisContent.phases.map((phase, index) => (
              <div key={phase.title}>
                <p className="text-sm font-semibold text-accent">
                  Phase {index + 1}
                </p>
                <h3 className="mt-2 text-base font-semibold text-foreground">{phase.title}</h3>
                <p className="mt-2 text-sm text-muted">{phase.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {praxisContent.rewards.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Rewards
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {praxisContent.rewards.map((reward) => (
              <div key={reward.title}>
                <h3 className="text-sm font-semibold text-foreground">{reward.title}</h3>
                <p className="mt-2 text-sm text-muted">{reward.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Who can apply
        </Heading>
        <p className="mt-4 max-w-2xl text-muted">{praxisContent.whoCanApply}</p>
      </Section>

      {praxisContent.careerOutcomes.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Career outcomes
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {praxisContent.careerOutcomes.map((outcome) => (
              <div key={outcome.title}>
                <h3 className="text-sm font-semibold text-foreground">{outcome.title}</h3>
                <p className="mt-2 text-sm text-muted">{outcome.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {praxisContent.selectionProcess.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Selection process
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {praxisContent.selectionProcess.map((step, index) => (
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
      )}

      <Section className="border-t border-border">
        <Heading as="h2" size="md">
          Apply to PRAXIS
        </Heading>
        <div className="mt-8 max-w-2xl">
          <PraxisApplicationForm />
        </div>
      </Section>
    </>
  );
}
