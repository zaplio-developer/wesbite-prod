import type { Metadata } from "next";
import { getServiceBySlug } from "@/content/services";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

const service = getServiceBySlug("digital-workplace")!;

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
};

export default function DigitalWorkplacePage() {
  return <ServicePageTemplate service={service} />;
}
