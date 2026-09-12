import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { getAllArticles } from "@/lib/articles";

const staticRoutes = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/${service.slug}`,
    lastModified: now,
  }));

  const industryEntries: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${siteConfig.url}/industries/${industry.slug}`,
    lastModified: now,
  }));

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${siteConfig.url}/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
  }));

  return [...staticEntries, ...serviceEntries, ...industryEntries, ...articleEntries];
}
