import { defineConfig, env } from "prisma/config";

// Used by the Prisma CLI (migrate, studio, db push). Migrate needs a direct,
// non-pooled connection: Vercel Postgres's pgbouncer pooler doesn't support
// the advisory locks Prisma Migrate uses.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("POSTGRES_URL_NON_POOLING"),
  },
});
