import type { Metadata } from "next";
import { getServiceBySlug } from "@/content/services";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

const service = getServiceBySlug("cloud-data-center-services")!;

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
};

export default function CloudDataCenterServicesPage() {
  return <ServicePageTemplate service={service} />;
}
