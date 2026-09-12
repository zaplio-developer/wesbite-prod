import { execSync, spawn } from "node:child_process";
import { validateRoutes } from "./validate-routes";
import { validateSeo } from "./validate-seo";
import { validateLinks } from "./validate-links";

const PORT = 4499;
const BASE_URL = `http://localhost:${PORT}`;
const READY_TIMEOUT_MS = 60_000;

function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const response = await fetch(url);
        if (response.status < 500) {
          resolve();
          return;
        }
      } catch {
        // server not up yet
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Server did not become ready within ${timeoutMs}ms`));
        return;
      }

      setTimeout(attempt, 500);
    };

    attempt();
  });
}

async function main() {
  console.log("validate-site: building...");
  execSync("npm run build", { stdio: "inherit" });

  console.log(`validate-site: starting server on port ${PORT}...`);
  const nextBin = require.resolve("next/dist/bin/next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    stdio: "ignore",
  });

  let exitCode = 0;

  try {
    await waitForServer(BASE_URL, READY_TIMEOUT_MS);

    console.log("validate-site: checking routes...");
    const routeFailures = await validateRoutes(BASE_URL);

    console.log("validate-site: checking SEO...");
    const seoFailures = await validateSeo(BASE_URL);

    console.log("validate-site: checking internal links...");
    const linkFailures = await validateLinks(BASE_URL);

    const totalFailures = routeFailures.length + seoFailures.length + linkFailures.length;

    if (totalFailures === 0) {
      console.log("validate-site: all checks passed");
    } else {
      exitCode = 1;
      console.error(`\nvalidate-site: ${totalFailures} total failure(s)`);
      for (const f of routeFailures) console.error(`  [routes] ${f.path}: ${f.issue}`);
      for (const f of seoFailures) console.error(`  [seo] ${f.path}: ${f.issue}`);
      for (const f of linkFailures) console.error(`  [links] ${f.onPage} -> ${f.href}: ${f.issue}`);
    }
  } catch (error) {
    exitCode = 1;
    console.error("validate-site: error running checks:", error);
  } finally {
    server.kill();
  }

  process.exit(exitCode);
}

main();
