import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Zaplio collects, uses and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Privacy Policy", href: "/privacy-policy" }]}
        />
      </Section>

      <Section className="pt-6">
        <Heading as="h1" size="xl" className="max-w-3xl">
          Privacy Policy
        </Heading>
        <p className="mt-6 max-w-2xl text-muted">
          This page is a placeholder. The published privacy policy must be drafted and reviewed
          by Zaplio&apos;s legal team — covering what data is collected, how it&apos;s used,
          third-party processors, retention, and user rights — before this page goes live. It is
          not generated here.
        </p>
      </Section>
    </>
  );
}
