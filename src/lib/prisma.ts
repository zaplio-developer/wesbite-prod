import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  // POSTGRES_URL: plain postgres:// connection from Vercel's Prisma Postgres
  // storage integration. DATABASE_URL/PRISMA_DATABASE_URL (also set by that
  // integration) are Accelerate's prisma+postgres:// protocol, which the
  // pg driver behind @prisma/adapter-pg can't parse, so they're not usable here.
  const connectionString = process.env.POSTGRES_URL ?? process.env.POSTGRES_PRISMA_URL;
  if (!connectionString) {
    throw new Error(
      "POSTGRES_URL is not set. Provision Postgres in the Vercel dashboard (or set it locally in .env) before using the database.",
    );
  }
  const adapter = new PrismaPg(connectionString);
  return new PrismaClient({ adapter });
}

// Lazy: constructing PrismaClient eagerly at module load would throw the moment
// any file imports this module, even ones that only touch `prisma` behind an
// `if (process.env.POSTGRES_PRISMA_URL)` guard. A Proxy defers construction
// until the first property access, so importing this module is always safe.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient();
    }
    return Reflect.get(globalForPrisma.prisma, prop, receiver);
  },
});
