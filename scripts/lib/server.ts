import { execSync, spawn, type ChildProcess } from "node:child_process";

export function buildSite(): void {
  execSync("npm run build", { stdio: "inherit" });
}

export function startProductionServer(port: number): ChildProcess {
  const nextBin = require.resolve("next/dist/bin/next");
  return spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    stdio: "ignore",
  });
}

export function waitForServer(url: string, timeoutMs: number): Promise<void> {
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
