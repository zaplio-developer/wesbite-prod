# Zaplio Website — Upgrade Plan (Design, Content Accuracy, Admin + DB)

## Context

The site built so far (Phases 1–7 of `DESIGN_PLAN.md`) is functionally complete — all pages, the blog engine, calculator, PRAXIS, SEO layer, and a validation/test/a11y-audit pipeline — but user review flagged it as reading generically ("too AI-generated"): no light/dark mode, hand-rolled components instead of a modern accessible component system, em-dashes throughout the copy, no animation, no image strategy, and unverified against the real site's actual current content. Separately, the site needs an admin panel for managing blog posts and viewing contact/PRAXIS leads, backed by a real database instead of static MDX files and console-logged form submissions.

This plan covers both: a visual/content upgrade pass, and new admin + database infrastructure. It was written after directly fetching the live zaplio.io site (not relying solely on the earlier ChatGPT audit) — real copy, leadership titles, PRAXIS program specifics, contact details, testimonials, and FAQ answers were captured verbatim and are ready to migrate in, closing several TODOs that were previously left blank to avoid inventing facts.

## Decisions locked in (from user)

- **Database**: user will provision Postgres in the Vercel dashboard (zaplio-devloper account) and hand me the `POSTGRES_URL`. I build the full schema/code now; migrations run once I have the connection string.
- **Admin scope v1**: blog posts (CRUD) + read-only view of Contact/PRAXIS submissions. Services/industries/about/partners stay as code-based content files — they change rarely and aren't part of this ask.
- **Admin auth**: single shared password via a Vercel env var, gated by middleware (no user table, no Auth.js). Simplest option, matches a one-team internal tool.
- **Typography**: keep Geist Sans only. Fix the generic feel through layout, type scale, and editorial detail — not a new font.

## Part A — Real content now available (from live zaplio.io)

Verified directly, safe to migrate in as genuine content (not invented):

- **Leadership**: Vinodh Veeraraghavan — Co-Founder & COO ("Two decades architecting and leading large-scale IT infrastructure and digital transformation programs for enterprises"); Raghavendra Gurumurthy — Co-Founder & CTO ("A technologist focused on cloud, cybersecurity and managed operations, turning complex requirements into resilient platforms").
- **Contact info**: info@zaplio.io, +91 76193 87022, Registered Office (Indiqube Opal, Indiranagar, Bangalore – 560038), Corporate Office (16th D Main, HAL II Stage, Indiranagar, Bangalore – 560008), Mon–Sat, one-business-day response.
- **Social URLs**: LinkedIn `in.linkedin.com/company/zaplio-technologies`, X `x.com/zaplioofficial`, Instagram `instagram.com/zaplio.official`, Facebook (profile.php?id=61591545602311).
- **PRAXIS full program**: name expands to "Professional Readiness via Applied eXperience & Industry Skills." Six pillars: Professional Exposure, Real-World Experience, Applied Learning, eXecution Skills, Industry Readiness, Sales & Solution Mindset. Three phases with exact week ranges (Weeks 1–2 Foundation, 3–8 Execution as "Sales Practitioner Associate", 9–12+ Growth). Rewards (guaranteed stipend + certificate; performance incentives; PPO/full-time/LOR for top performers). Selection criteria: Commitment, Communication, Accountability, Learning mindset, Ethics.
- **Homepage testimonials** (verbatim, anonymized by role — safe to reuse as-is, matching the source site's own anonymization): VP IT Operations (financial services), Head of Security (healthcare network), Director of Technology (multi-site retail) — full quotes captured, will drop straight into a new Testimonials section.
- **Homepage FAQ**: 5 real Q&As with full answer text, ready to replace generic FAQ content on relevant pages.
- **Partners**: real logo list from homepage — Microsoft, AWS, Palo Alto, Fortinet, Cohesity, Panasonic, Adobe, Zoho, Check Point (shown as their own public partner logos — safe to list by name, not logos/images yet, see Part B).
- **Contact form fields**: real site uses a Service Area dropdown (Cybersecurity / Cloud & Data Center / Managed IT / Network Transformation / Digital Workplace / Professional Services-Consulting / "Not sure yet") and "Project Description" instead of generic "Message" — will align.

**Still confirmed blank on the live site itself** (not just missing from our build): TCO %, uptime %, years-of-experience stats all render as `0%`/empty on zaplio.io right now. This validates the existing rule — these stay empty placeholders here too, not invented.

## Part B — Visual/design system overhaul

1. **Light + dark mode** — add `next-themes`. Define a real light palette in `globals.css` (not an inverted-gray hack) alongside the current dark palette; `.dark` class strategy. Add a theme toggle (sun/moon) in the header. PRAXIS's `.theme-praxis` accent override gets its own light/dark pair too.
2. **Modern, accessible components** — replace hand-rolled interactive pieces with Radix UI primitives (`@radix-ui/react-accordion`, `-dialog`, `-dropdown-menu`, `-tabs`, `-tooltip`, `-select`) wired up with `class-variance-authority` + `tailwind-merge` (the shadcn/ui pattern: copy-owned components, not a black-box library). Swap hand-drawn inline SVG icons for `lucide-react`. This directly addresses "not modern" and improves accessibility for free (Radix handles focus trapping, ARIA, keyboard nav).
3. **De-genericize layout** (typography unchanged per decision) — break the repeated "Section → centered Heading → card grid" formula: asymmetric two-column sections, pull-quote/stat callouts, sticky side-nav on long service/industry pages, a distinct homepage hero (large stacked headline + inline metric strip), editorial article layout (drop cap, pull quotes via existing `<Quote>` MDX component).
4. **Em-dash cleanup** — 51 occurrences across 28 files (content files, components, API routes, `DESIGN_PLAN.md`). Pass through each, replace with comma/colon/period/restructure per context. Add a one-line rule to `CLAUDE.md`/`AGENTS.md`: no em-dashes in copy, to prevent regressions.
5. **Minimal animation** — no animation library. A small `useInView` hook (IntersectionObserver) + CSS transition classes for fade/slide-up section entrances; respect `prefers-reduced-motion`. Keep existing hover/focus transitions, refine easing.
6. **Image placeholders** — a reusable `<ImagePlaceholder>` component (dashed border, lucide `ImageIcon`, label + dimensions, aspect-ratio prop, theme-aware) dropped into: homepage hero, every service/industry hero, article featured-image slot, About leadership headshots, Partners logo row, PRAXIS hero. Swappable for real `next/image` later without layout changes.
7. **Responsive pass** — systematic check at 375/390/768px across every page including the new theme toggle, Radix components, and calculator; not just the header (already covered).

## Part C — Content accuracy pass

Update existing content files with the real copy from Part A:
- `src/content/pages/about.ts` — real leadership titles/bios (remove TODO).
- `src/content/pages/praxis.ts` — full six pillars, three phases, rewards, selection criteria (remove all TODOs).
- `src/content/pages/partners.ts` — real partner logo names (still placeholder images, see Part B item 6).
- `src/config/site.ts` / footer — real contact info and social URLs.
- Homepage — new Testimonials section (real quotes) + real FAQ content.
- Contact form — Service Area dropdown + Project Description field, matching the live site.
- Service/industry page copy — light editorial polish against the real phrasing captured (e.g. cybersecurity hero: "Cybersecurity that protects your business around the clock").

## Part D — Admin panel + database

**Stack**: Prisma + Postgres (Vercel-provisioned, connection string pending from user).

**Schema** (`prisma/schema.prisma`):
- `Post` — id, slug, title, excerpt, category, author, content (markdown text), featuredImageUrl (nullable), status (DRAFT/PUBLISHED), publishedAt, updatedAt, relatedServiceSlugs (string[]), relatedArticleSlugs (string[]), seoTitle, seoDescription. Replaces the current `.mdx` files as the source of truth for articles; seed script migrates the 3 existing placeholder articles in.
- `ContactSubmission` — name, email, company, serviceArea, message, createdAt, handled (bool).
- `PraxisApplication` — name, email, phone, university, graduationYear, message, createdAt, handled (bool).

**Article rendering changes**: `src/app/[slug]/page.tsx` and `src/lib/articles.ts` move from `fs.readdirSync`/`gray-matter` to Prisma queries. Rendering still goes through `next-mdx-remote/rsc` (works fine on a DB string, not just a file). Pages switch from full SSG to ISR (time-based revalidate, or `revalidatePath` called from the admin panel on publish) so edits show up without a full redeploy.

**API routes**: `/api/contact` and `/api/praxis-application` write to their respective tables via Prisma (replacing the current `console.info` stub) — still no CRM/email integration unless separately requested.

**Admin panel** (`/admin` route group):
- `/admin/login` — single password field, checked against `ADMIN_PASSWORD` env var, sets an HTTP-only signed cookie.
- `middleware.ts` — gates everything under `/admin` (except `/admin/login`) on that cookie.
- `/admin/posts` — list, create, edit (markdown textarea + frontmatter fields), publish/draft toggle, delete.
- `/admin/leads` — read-only list of Contact + PRAXIS submissions, mark-as-handled toggle.

## Open dependency

Nothing in Part D can be migrated/tested end-to-end until the `POSTGRES_URL` exists. I'll build the schema, Prisma client setup, admin UI, and API route changes now; run `prisma migrate dev` and the article-seed script as soon as the connection string is provided. Everything else (Parts B and C) has no such blocker and can proceed immediately.

## Execution order

1. Theme system (light/dark) + Radix/cva/lucide component swap — foundational, touches every page.
2. Em-dash cleanup + content accuracy pass (Part C) — mostly data-file edits, low risk, fast.
3. Image placeholders + layout de-genericizing + minimal scroll animation.
4. Responsive re-audit (375/390/768px) across all pages with the new components.
5. Prisma schema + admin panel + API route changes (can start in parallel with 1–4; DB migration waits on the connection string).
6. Full re-run of `npm run validate`, `npm run test`, `npm run audit` (routes/SEO/links, unit tests, a11y/perf) before calling it done.

## Verification

- `npm run test` — existing + new tests (theme toggle, ImagePlaceholder, admin auth gate, Prisma-backed API routes via mocked client).
- `npm run validate` — full route/SEO/link check, unchanged pass bar (zero failures).
- `npm run audit` — axe-core a11y check must stay at zero critical/serious violations after the Radix component swap and theme change (light mode gets its own contrast check, not just dark).
- Manual: toggle light/dark on every page; resize to 375px/768px; run through `/admin` login → create/edit/publish a post → confirm it renders on the public site; submit contact/PRAXIS forms → confirm rows land in Postgres.
