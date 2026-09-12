import type { Service } from "../types";
import { cybersecurityServices } from "./cybersecurity-services";
import { cloudDataCenterServices } from "./cloud-data-center-services";
import { managedItServices } from "./managed-it-services";
import { networkTransformation } from "./network-transformation";
import { digitalWorkplace } from "./digital-workplace";
import { professionalServices } from "./professional-services";

export const services: Service[] = [
  cybersecurityServices,
  cloudDataCenterServices,
  networkTransformation,
  digitalWorkplace,
  managedItServices,
  professionalServices,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
