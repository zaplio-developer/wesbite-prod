import { execSync } from "node:child_process";

// Runs as part of `next build` so schema changes ship with the deploy that
// needs them. Skips (instead of failing the build) when POSTGRES_URL isn't
// set yet, e.g. before Postgres is provisioned, or in local/CI builds that
// never intend to touch the database.
if (!process.env.POSTGRES_URL) {
  console.log("[migrate-deploy] POSTGRES_URL not set, skipping prisma migrate deploy");
  process.exit(0);
}

execSync("prisma migrate deploy", { stdio: "inherit" });
