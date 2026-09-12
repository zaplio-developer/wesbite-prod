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

**Why:** Vercel deployment requires commits authored by the GitHub account connected to the Vercel project (`zaplio-devloper`) — otherwise deployment is blocked ("commit author did not have contributing access").

## Vercel deployment

The Vercel project connected to this repo lives under the `zaplio-devloper` Vercel account — manage it (env vars, domains, deployment protection) directly in that Vercel dashboard. Pushes to `main` auto-deploy to production; other branches/PRs get preview deployments (unindexed — see `robots.ts`).

Environment variables: see `.env.example` for what's read and what's still unwired. Set real values in the Vercel dashboard, never commit them.

## Local development

```
npm run dev    # http://localhost:4477
npm run build
npm run lint
```

Dev/start are pinned to port 4477 (see `CLAUDE.md`).
