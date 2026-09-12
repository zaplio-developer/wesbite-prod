import { getExpectedRoutes } from "./lib/expected-routes";

export type LinkFailure = { onPage: string; href: string; issue: string };

function extractInternalLinks(html: string): string[] {
  const hrefPattern = /href="([^"]+)"/g;
  const links = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = hrefPattern.exec(html)) !== null) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/api/")) continue;
    const withoutQuery = href.split("?")[0].split("#")[0];
    if (withoutQuery.length === 0) continue;
    links.add(withoutQuery);
  }

  return Array.from(links);
}

export async function validateLinks(baseUrl: string): Promise<LinkFailure[]> {
  const failures: LinkFailure[] = [];
  const routes = getExpectedRoutes();
  const checkedLinks = new Map<string, number>();

  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route.path}`);
    const html = await response.text();
    const links = extractInternalLinks(html);

    for (const href of links) {
      let status = checkedLinks.get(href);
      if (status === undefined) {
        const linkResponse = await fetch(`${baseUrl}${href}`, { method: "GET" });
        status = linkResponse.status;
        checkedLinks.set(href, status);
      }

      if (status >= 400) {
        failures.push({ onPage: route.path, href, issue: `broken link, status ${status}` });
      }
    }
  }

  return failures;
}

if (require.main === module) {
  const baseUrl = process.argv[2] ?? "http://localhost:4477";
  validateLinks(baseUrl).then((failures) => {
    if (failures.length === 0) {
      console.log("validate-links: OK");
      process.exit(0);
    }
    console.error(`validate-links: ${failures.length} failure(s)`);
    for (const failure of failures) {
      console.error(`  ${failure.onPage} -> ${failure.href}: ${failure.issue}`);
    }
    process.exit(1);
  });
}
