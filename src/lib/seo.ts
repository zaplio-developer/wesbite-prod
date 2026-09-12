import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const isProduction = process.env.VERCEL_ENV === "production";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Vercel preview deployments must not be indexed — only production is. Applied
 * globally in the root layout's metadata.
 */
export const robotsDefault: Metadata["robots"] = isProduction
  ? { index: true, follow: true }
  : { index: false, follow: false };
