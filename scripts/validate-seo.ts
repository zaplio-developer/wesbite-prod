import { getExpectedRoutes } from "./lib/expected-routes";

export type SeoFailure = { path: string; issue: string };

function extractTag(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match ? match[1] : null;
}

export async function validateSeo(baseUrl: string): Promise<SeoFailure[]> {
  const failures: SeoFailure[] = [];
  const routes = getExpectedRoutes();

  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route.path}`);
    const html = await response.text();

    const title = extractTag(html, /<title>([^<]*)<\/title>/i);
    if (!title || title.trim().length === 0) {
      failures.push({ path: route.path, issue: "missing <title>" });
    }

    const description = extractTag(
      html,
      /<meta\s+name="description"\s+content="([^"]*)"/i,
    );
    if (!description || description.trim().length === 0) {
      failures.push({ path: route.path, issue: "missing meta description" });
    }

    const canonical = extractTag(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
    if (!canonical) {
      failures.push({ path: route.path, issue: "missing canonical link" });
    } else {
      // Next.js renders the root canonical without a trailing slash (matches metadataBase).
      const expectedSuffix = route.path === "/" ? "" : route.path;
      if (!canonical.endsWith(expectedSuffix)) {
        failures.push({ path: route.path, issue: `canonical mismatch: ${canonical}` });
      }
    }

    if ((route.category === "service" || route.category === "industry") && !html.includes('"@type":"BreadcrumbList"')) {
      failures.push({ path: route.path, issue: "missing BreadcrumbList structured data" });
    }

    if (route.category === "article" && !html.includes('"@type":"Article"')) {
      failures.push({ path: route.path, issue: "missing Article structured data" });
    }
  }

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
  if (sitemapResponse.status !== 200) {
    failures.push({ path: "/sitemap.xml", issue: `expected 200, got ${sitemapResponse.status}` });
  } else {
    const sitemapXml = await sitemapResponse.text();
    const locCount = (sitemapXml.match(/<loc>/g) ?? []).length;
    if (locCount < routes.length) {
      failures.push({
        path: "/sitemap.xml",
        issue: `only ${locCount} <loc> entries, expected at least ${routes.length}`,
      });
    }
  }

  const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
  if (robotsResponse.status !== 200) {
    failures.push({ path: "/robots.txt", issue: `expected 200, got ${robotsResponse.status}` });
  } else {
    const robotsTxt = await robotsResponse.text();
    if (!robotsTxt.includes("Sitemap:")) {
      failures.push({ path: "/robots.txt", issue: "missing Sitemap directive" });
    }
  }

  return failures;
}

if (require.main === module) {
  const baseUrl = process.argv[2] ?? "http://localhost:4477";
  validateSeo(baseUrl).then((failures) => {
    if (failures.length === 0) {
      console.log("validate-seo: OK");
      process.exit(0);
    }
    console.error(`validate-seo: ${failures.length} failure(s)`);
    for (const failure of failures) {
      console.error(`  ${failure.path}: ${failure.issue}`);
    }
    process.exit(1);
  });
}
