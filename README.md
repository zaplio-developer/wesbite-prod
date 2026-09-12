# Zaplio Website (Rebuild)

Rebuild of zaplio.io as a production Next.js + TypeScript + Tailwind site, deployed on Vercel.

See [DESIGN_PLAN.md](./DESIGN_PLAN.md) for the validated design/build plan, and [CONTEXT_CHATGPT.md](./CONTEXT_CHATGPT.md) for the original site audit it's based on.

## Git identity (required)

All commits in this repo MUST use the `zaplio-developer` GitHub identity:

```
user.name  = zaplio-developer
user.email = 306695144+zaplio-devloper@users.noreply.github.com
```

Set locally in `.git/config` (not global). Restore with:

```
git config user.name "zaplio-developer"
git config user.email "306695144+zaplio-devloper@users.noreply.github.com"
```

**Why:** Vercel deployment requires commits authored by the GitHub account connected to the Vercel project (`zaplio-devloper`), otherwise deployment is blocked ("commit author did not have contributing access").

## Vercel deployment

The Vercel project connected to this repo lives under the `zaplio-devloper` Vercel account, manage it (env vars, domains, deployment protection) directly in that Vercel dashboard. Pushes to `main` auto-deploy to production; other branches/PRs get preview deployments (unindexed, see `robots.ts`).

Environment variables: see `.env.example` for what's read and what's still unwired. Set real values in the Vercel dashboard, never commit them.

## Database (Prisma + Postgres)

The admin panel and contact/PRAXIS form submissions are backed by Postgres via Prisma. To connect it:

1. In the Vercel dashboard (zaplio-devloper account), add a Postgres database to this project (Storage tab). Vercel sets `POSTGRES_PRISMA_URL` (pooled) and `POSTGRES_URL_NON_POOLING` (direct) automatically.
2. Locally, copy those same two values into a `.env` file (not committed).
3. Run `npm run db:migrate` to create the tables, then `npm run db:seed` to migrate the 3 existing MDX articles into the `Post` table.

Until those env vars are set, `/api/contact` and `/api/praxis-application` fall back to logging submissions to the console instead of persisting them, so the forms still work end-to-end without a database.

**Note:** the public blog (`/resources`, `/[slug]`) still reads from the MDX files in `src/content/articles/` today, not the `Post` table. The admin panel manages `Post` rows in Postgres as a forward-looking system; switching the public article pages to read from Postgres (with the MDX files as a one-time seed) is the next step once the database is live and this has been tested end-to-end. Do this deliberately, not as a silent side effect of a build.

## Admin panel

`/admin` manages blog posts and views Contact/PRAXIS form submissions. Set `ADMIN_PASSWORD` (a single shared password, no user accounts) in Vercel and locally in `.env`. Sign in at `/admin/login`; `src/proxy.ts` (Next.js 16's replacement for `middleware.ts`) gates everything else under `/admin`.

## Local development

```
npm run dev    # http://localhost:4477
npm run build
npm run lint
```

Dev/start are pinned to port 4477 (see `CLAUDE.md`).
