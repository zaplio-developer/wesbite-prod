import type { Industry } from "../types";
import { financialServices } from "./financial-services";
import { healthcare } from "./healthcare";
import { manufacturing } from "./manufacturing";
import { retailEcommerce } from "./retail-ecommerce";
import { technologySaas } from "./technology-saas";
import { publicSector } from "./public-sector";

export const industries: Industry[] = [
  financialServices,
  healthcare,
  manufacturing,
  retailEcommerce,
  technologySaas,
  publicSector,
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
