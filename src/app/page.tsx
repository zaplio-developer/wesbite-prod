import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/Button";

export default function Home() {
  return (
    <Section className="pt-24 sm:pt-32">
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
    </Section>
  );
}
