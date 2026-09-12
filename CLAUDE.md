@AGENTS.md

## Dev server port

Always run on port 4477 (fixed, not the Next.js default 3000): avoids collisions with other local projects. `npm run dev` / `npm run start` already pin this via `-p 4477`.

## Copy style

No em-dashes anywhere in site copy or content files. Use a comma, colon, period, or semicolon instead, whichever reads most naturally in context.

## Planning docs

All planning/audit/upgrade docs live in `docs/` (see `docs/README.md` for what each one is and the order they were produced in), not the repo root. Read `docs/UPGRADE_PLAN.md` first, it's the most current and reflects what's actually been built vs. deliberately deferred (e.g. the public blog still reads from MDX files, not the Prisma `Post` table). When starting a new planning doc for future work, add it to `docs/` and link it from `docs/README.md`, don't drop it at the repo root.
