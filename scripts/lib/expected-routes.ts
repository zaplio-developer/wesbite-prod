import { services } from "../../src/content/services";
import { industries } from "../../src/content/industries";
import { getAllArticles } from "../../src/lib/articles";

export type ExpectedRoute = {
  path: string;
  category: "static" | "service" | "industry" | "article";
};

const staticRoutes: string[] = [
  "/",
  "/services",
  "/industries",
  "/our-partners",
  "/about",
  "/resources",
  "/praxis",
  "/contact",
  "/cloud-migration-cost-calculator",
  "/privacy-policy",
];

export function getExpectedRoutes(): ExpectedRoute[] {
  const staticEntries: ExpectedRoute[] = staticRoutes.map((path) => ({
    path,
    category: "static",
  }));

  const serviceEntries: ExpectedRoute[] = services.map((service) => ({
    path: `/${service.slug}`,
    category: "service",
  }));

  const industryEntries: ExpectedRoute[] = industries.map((industry) => ({
    path: `/industries/${industry.slug}`,
    category: "industry",
  }));

  const articleEntries: ExpectedRoute[] = getAllArticles().map((article) => ({
    path: `/${article.slug}`,
    category: "article",
  }));

  return [...staticEntries, ...serviceEntries, ...industryEntries, ...articleEntries];
}
