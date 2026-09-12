import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Calculator } from "@/components/calculator/calculator";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cloud Migration Cost Calculator",
  description:
    "Estimate your enterprise cloud migration budget across infrastructure, application remediation, tooling, operational readiness and post-migration optimization.",
  path: "/cloud-migration-cost-calculator",
});

export default function CloudMigrationCostCalculatorPage() {
  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cloud Migration Cost Calculator", href: "/cloud-migration-cost-calculator" },
          ]}
        />
      </Section>

      <Section className="pt-6">
        <Eyebrow>Tools</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          Cloud Migration Cost Calculator
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Estimate your enterprise cloud migration budget across infrastructure, application
          remediation, tooling, operational readiness and post-migration optimization.
        </p>
      </Section>

      <Section className="border-t border-border">
        <Calculator />
        <p className="mt-8 max-w-3xl text-sm text-muted">
          This calculator is indicative only. Actual migration costs vary based on application
          complexity, data volume, architecture, tooling, partner selection and organizational
          readiness.
        </p>
      </Section>
    </>
  );
}
