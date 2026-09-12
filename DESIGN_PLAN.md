# Zaplio Website Rebuild, Design Plan (Claude-validated)

Source: `CONTEXT_CHATGPT.md` (ChatGPT audit of live zaplio.io). This document validates that audit and turns it into an actionable build plan.

## Validation notes

- IA, service/article data schemas, and phased build order are sound for a Next.js + Vercel rebuild.
- Citations in the source doc reflect a point-in-time crawl of zaplio.io, re-verify exact copy, dates, authors, and numbers against the live site before migrating, don't trust them as final truth.
- Correctly flags placeholder `0%` metrics and unverified 25-40% TCO claims on the current site, do not carry these into production; leave metrics empty until Zaplio confirms real figures.
- No invented logos, certs, case studies, partner relationships, or bios, enforced throughout.

## Stack

Next.js (App Router) + TypeScript + Tailwind + MDX (content) + Vercel (host) + GitHub (source).
Server components default; client components only where interactive (calculator, forms, assistant, nav).

## URL preservation (critical)

All existing routes and article slugs carry over unchanged. Anything that must change goes through an explicit 301 redirect map in `next.config.ts` / `lib/redirects.ts`. No route disappears without a redirect decision logged.

Core routes to implement:
```
/
/services/  /cybersecurity-services/  /cloud-data-center-services/
/network-transformation/  /digital-workplace/  /managed-it-services/
/professional-services/
/industries/ (+ 6 sub-pages: financial-services, healthcare, manufacturing,
  retail-ecommerce, technology-saas, public-sector)
/our-partners/  /about/  /contact/  /praxis/
/cloud-migration-cost-calculator/
/privacy-policy/
/[article-slug]  (existing article URLs, unchanged)
```

## Content model (single source of truth, no duplication)

```ts
Service { slug, name, eyebrow, title, description, heroImage, benefits[], capabilities[], process[], outcomes[], faqs[], cta, seo }
Article { slug, title, excerpt, category, author, publishedAt, updatedAt, featuredImage, content, relatedArticles[], relatedServices[], seo }
Industry { slug, name, challenges[], priorities[], relatedServices[], compliance[], outcomes[], faqs[] }
```
Lives in `src/content/`. Components never hold raw marketing copy.

## Visual direction

Dark enterprise base, near-white type, restrained electric-blue accent, thin technical borders, generous whitespace, infrastructure-as-metaphor (network topology, system diagrams) instead of stock photography or glassmorphism/neon.

## Design system components (build once, reuse everywhere)

Button, LinkButton, Container, Section, Eyebrow, Heading, Card, Badge, Metric, Accordion, Breadcrumbs, CTA, LogoCloud, ArticleCard, ServiceCard, IndustryCard, PartnerCard, FormField, Modal, Tooltip, Callout.

## Calculator

Keep as a real feature. Calculation logic isolated in `calculation-engine.ts`, independent of UI, so formula changes don't touch components. Always show the "indicative only" disclaimer.

## AI assistant

`UI → /api/chat → knowledge layer (services/industries/partners/PRAXIS/blog/FAQs) → LLM`. No API keys client-side. Guardrail: never invent pricing, SLAs, certs, guarantees, or customer claims, say "I don't have that information" instead.

## SEO

Next.js Metadata API on every route: title, description, canonical, OG, Twitter card, robots, structured data (Organization, WebSite, BreadcrumbList, Article, FAQPage, Service). Auto-generated `/sitemap.xml` and `/robots.txt` from content data, not hand-maintained lists.

## Build order (don't generate everything at once)

1. Repo + tooling (Next.js/TS/Tailwind/ESLint/Prettier)
2. Design tokens + global layout (header/nav/footer/CTA system)
3. Component library
4. Homepage
5. Service template → 6 service pages
6. Industry template → 6 industry pages
7. About / Partners / Contact
8. Blog engine (MDX) + article migration
9. Calculator
10. PRAXIS (distinct visual system, same brand)
11. AI assistant + forms (server-side handling, no exposed secrets)
12. SEO pass + redirect map
13. Automated checks (broken links, metadata, sitemap, TS/lint/build) + Vercel deploy config

## Hard "don't invent" list

Statistics, certifications, client names/logos, partner status, case studies, customer results, SLAs, guarantees, leadership credentials, addresses, phone numbers. Placeholder `0%` values get left empty, not reproduced.

## Next step

Confirm this plan, then start Phase 1 (repo scaffold + tooling) in this repository.
