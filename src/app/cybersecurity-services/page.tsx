import type { Metadata } from "next";
import { getServiceBySlug } from "@/content/services";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { pageMetadata } from "@/lib/seo";

const service = getServiceBySlug("cybersecurity-services")!;

export const metadata: Metadata = pageMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: `/${service.slug}`,
});

export default function CybersecurityServicesPage() {
  return <ServicePageTemplate service={service} />;
}
