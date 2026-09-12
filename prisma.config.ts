import { defineConfig } from "prisma/config";

// Used by the Prisma CLI (migrate, studio, db push). Migrate needs a direct
// connection: POSTGRES_URL is the plain postgres:// string from Vercel's
// Prisma Postgres storage integration. DATABASE_URL/PRISMA_DATABASE_URL
// (also set by that integration) go through Accelerate and can't run
// Migrate's advisory locks, so they're not usable here.
//
// `prisma generate` (run from postinstall on every `npm install`, including
// Vercel builds before Postgres is provisioned) also loads this file but
// never touches the URL, so fall back to a placeholder instead of throwing
// when nothing is set yet.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url:
      process.env.POSTGRES_URL ??
      process.env.POSTGRES_URL_NON_POOLING ??
      "postgresql://placeholder",
  },
});
