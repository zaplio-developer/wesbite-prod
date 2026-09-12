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
