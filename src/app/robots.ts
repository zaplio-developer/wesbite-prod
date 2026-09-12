import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : undefined,
      disallow: isProduction ? undefined : "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
