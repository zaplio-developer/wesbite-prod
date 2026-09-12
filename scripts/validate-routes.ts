import { getExpectedRoutes } from "./lib/expected-routes";

export type RouteFailure = { path: string; issue: string };

export async function validateRoutes(baseUrl: string): Promise<RouteFailure[]> {
  const failures: RouteFailure[] = [];
  const routes = getExpectedRoutes();

  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route.path}`);
    if (response.status !== 200) {
      failures.push({ path: route.path, issue: `expected 200, got ${response.status}` });
    }
  }

  // Sanity check: an unknown path must 404, not silently succeed.
  const notFoundPath = "/this-route-should-not-exist-zaplio-check";
  const notFoundResponse = await fetch(`${baseUrl}${notFoundPath}`);
  if (notFoundResponse.status !== 404) {
    failures.push({
      path: notFoundPath,
      issue: `expected 404 for unknown route, got ${notFoundResponse.status}`,
    });
  }

  return failures;
}

if (require.main === module) {
  const baseUrl = process.argv[2] ?? "http://localhost:4477";
  validateRoutes(baseUrl).then((failures) => {
    if (failures.length === 0) {
      console.log(`validate-routes: OK (${getExpectedRoutes().length} routes checked)`);
      process.exit(0);
    }
    console.error(`validate-routes: ${failures.length} failure(s)`);
    for (const failure of failures) {
      console.error(`  ${failure.path}: ${failure.issue}`);
    }
    process.exit(1);
  });
}
