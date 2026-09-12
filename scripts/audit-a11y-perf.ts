import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { buildSite, startProductionServer, waitForServer } from "./lib/server";

const PORT = 4498;
const BASE_URL = `http://localhost:${PORT}`;
const READY_TIMEOUT_MS = 60_000;
const REPORTS_DIR = path.join(process.cwd(), ".audit");

// A representative sample covering every page template type (marketing, service,
// industry, article, tool, form) — not every route, to keep this fast to run.
const ROUTES_TO_AUDIT = [
  "/",
  "/cybersecurity-services",
  "/industries/healthcare",
  "/how-infrastructure-modernization-reduces-long-term-cloud-costs",
  "/cloud-migration-cost-calculator",
  "/contact",
  "/praxis",
];

// Blocking: any critical/serious axe violation fails the audit. Moderate/minor are
// reported but don't fail the run — they're worth fixing, not launch-blocking.
const BLOCKING_IMPACTS = new Set(["critical", "serious"]);

function findChromeExecutable(): string {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates =
    process.platform === "win32"
      ? [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
        ]
      : process.platform === "darwin"
        ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
        : ["/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/usr/bin/chromium"];

  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error(
      "No Chrome/Chromium install found. Set CHROME_PATH to a browser executable to run this audit.",
    );
  }
  return found;
}

type AxeViolation = {
  id: string;
  impact: string | null;
  description: string;
  help: string;
  nodes: number;
};

type RouteReport = {
  route: string;
  timing: { ttfbMs: number; domContentLoadedMs: number; loadMs: number; transferBytes: number };
  violations: AxeViolation[];
};

async function auditRoute(page: import("puppeteer-core").Page, axeSource: string, route: string): Promise<RouteReport> {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "load", timeout: 30_000 });

  const timing = await page.evaluate(() => {
    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    return {
      ttfbMs: Math.round(nav.responseStart - nav.startTime),
      domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      loadMs: Math.round(nav.loadEventEnd - nav.startTime),
      transferBytes: Math.round(nav.transferSize),
    };
  });

  await page.evaluate(axeSource);
  const axeResults = (await page.evaluate(() => {
    // @ts-expect-error injected global from axe-core source
    return window.axe.run();
  })) as { violations: AxeViolation[] };

  const violations = axeResults.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    nodes: (v as unknown as { nodes: unknown[] }).nodes.length,
  }));

  return { route, timing, violations };
}

async function main() {
  console.log("audit: building...");
  buildSite();

  console.log(`audit: starting server on port ${PORT}...`);
  const server = startProductionServer(PORT);

  let browser: import("puppeteer-core").Browser | undefined;
  let exitCode = 0;

  try {
    await waitForServer(BASE_URL, READY_TIMEOUT_MS);

    const executablePath = findChromeExecutable();
    console.log(`audit: launching browser (${executablePath})...`);
    browser = await puppeteer.launch({ executablePath, headless: true });
    const page = await browser.newPage();

    const axeSource = fs.readFileSync(
      require.resolve("axe-core/axe.min.js"),
      "utf8",
    );

    const reports: RouteReport[] = [];
    for (const route of ROUTES_TO_AUDIT) {
      console.log(`audit: checking ${route}...`);
      reports.push(await auditRoute(page, axeSource, route));
    }

    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    fs.writeFileSync(path.join(REPORTS_DIR, "report.json"), JSON.stringify(reports, null, 2));

    console.log(
      "\n" + "Route".padEnd(58) + "TTFB   DCL    Load   Size",
    );
    let hasBlockingViolation = false;

    for (const { route, timing, violations } of reports) {
      const sizeKb = Math.round(timing.transferBytes / 1024);
      console.log(
        route.padEnd(58) +
          `${timing.ttfbMs}ms`.padStart(6) +
          `${timing.domContentLoadedMs}ms`.padStart(7) +
          `${timing.loadMs}ms`.padStart(7) +
          `${sizeKb}KB`.padStart(7),
      );

      if (violations.length === 0) {
        console.log("    a11y: no violations");
        continue;
      }

      for (const v of violations) {
        const blocking = v.impact !== null && BLOCKING_IMPACTS.has(v.impact);
        if (blocking) hasBlockingViolation = true;
        console.log(
          `    a11y ${blocking ? "FAIL" : "warn"} [${v.impact}] ${v.id}: ${v.help} (${v.nodes} node(s))`,
        );
      }
    }

    console.log(`\nFull reports written to ${REPORTS_DIR}/report.json`);
    console.log(
      "Timing figures are indicative on this local machine, not a production benchmark —",
      "measure real Core Web Vitals against the deployed Vercel site (e.g. PageSpeed Insights).",
    );

    exitCode = hasBlockingViolation ? 1 : 0;
  } catch (error) {
    exitCode = 1;
    console.error("audit: error running audit:", error);
  } finally {
    await browser?.close();
    server.kill();
  }

  process.exit(exitCode);
}

main();
