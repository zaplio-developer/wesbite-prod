import { defineConfig } from "prisma/config";

// Used by the Prisma CLI (migrate, studio, db push). Migrate needs a direct,
// non-pooled connection: Vercel Postgres's pgbouncer pooler doesn't support
// the advisory locks Prisma Migrate uses.
//
// `prisma generate` (run from postinstall on every `npm install`, including
// Vercel builds before Postgres is provisioned) also loads this file but
// never touches the URL, so fall back to a placeholder instead of the
// strict `env()` helper, which throws immediately if the var is unset.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.POSTGRES_URL_NON_POOLING ?? "postgresql://placeholder",
  },
});
