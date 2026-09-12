Yes. I audited the live Zaplio site and mapped the publicly discoverable structure, content, functionality, SEO needs, and a sensible Vercel/Next.js architecture for rebuilding it from scratch.

The important point is that **this should not be treated as a visual redesign only**. Zaplio currently has a fairly substantial content and conversion system: the main marketing site, six service lines, industry pages, partner ecosystem, leadership/about content, contact flows, PRAXIS, long-form articles, an interactive cloud migration calculator, and an on-site AI assistant. ([Zaplio][1])

## 1. What I found on the existing Zaplio site

### Core positioning

The current positioning is:

> **Enterprise IT Infrastructure Partner**

The central proposition is that Zaplio combines cloud, data center, cybersecurity, networking, workplace and managed IT into a single accountable partner. The site repeatedly contrasts this with multiple disconnected specialist vendors. ([Zaplio][1])

The homepage follows this narrative:

**Problem → Zaplio approach → Services → Integrated-partner advantage → Outcomes → Target customers → Technology partners → Testimonials → FAQ → Consultation CTA.** ([Zaplio][2])

That overall storytelling is worth retaining.

### Main navigation / information architecture

The currently confirmed public sections are:

| Section                    | Route / status                                                           |
| -------------------------- | ------------------------------------------------------------------------ |
| Home                       | `/`                                                                      |
| Services overview          | `/services/`                                                             |
| Cybersecurity              | `/cybersecurity-services/`                                               |
| Cloud & Data Center        | `/cloud-data-center-services/`                                           |
| Managed IT Services        | `/managed-it-services/`                                                  |
| Network Transformation     | service advertised; detail route should be recovered from current source |
| Digital Workplace          | service advertised; detail route should be recovered from current source |
| Professional Services      | service advertised; detail route should be recovered from current source |
| Industries                 | `/industries/`                                                           |
| About                      | `/about/`                                                                |
| Partners                   | `/our-partners/`                                                         |
| Contact                    | `/contact/`                                                              |
| PRAXIS                     | `/praxis/`                                                               |
| Cloud migration calculator | `/cloud-migration-cost-calculator/`                                      |
| Privacy                    | `/privacy-policy/`                                                       |
| Long-form articles         | individual SEO-friendly slugs                                            |

The service overview explicitly presents six service lines. ([Zaplio][3])

### Services

The six-service structure is one of the strongest components and should become reusable data-driven pages rather than six independently coded pages.

Current service categories are:

**Cybersecurity Services** — SOC, threat intelligence, vulnerability management, IAM, endpoint/network security, compliance and incident response. ([Zaplio][4])

**Cloud & Data Center** — cloud migration, hybrid/multi-cloud, virtualization, containers, backup/DR, cost optimization and data-center modernization. ([Zaplio][5])

**Managed IT Services** — 24/7 NOC, helpdesk, monitoring, patching, infrastructure management, asset lifecycle management and optimization. ([Zaplio][6])

**Network Transformation** — SD-WAN, secure Wi-Fi, campus/edge networking and connectivity.

**Digital Workplace** — device lifecycle, collaboration tooling, endpoint security, mobility and productivity.

**Professional Services** — consulting, architecture, migration and project delivery.

The existing site uses a common page pattern for service pages:

**Hero → overview → four value propositions → capabilities → 4-step approach → measurable outcomes → FAQ → CTA.**

That is ideal for a reusable Next.js component system. ([Zaplio][4])

---

## 2. Content architecture I recommend

Don't reproduce the current site as a collection of hard-coded pages.

Build this:

```text
Site
├── Marketing pages
├── Service pages
├── Industry pages
├── Partner pages
├── Resource / Blog system
├── Tools
│   └── Cloud Migration Calculator
├── PRAXIS
├── Contact / lead capture
└── Global assistant / WhatsApp
```

Then make each content type structured.

For example:

```ts
Service {
  slug
  name
  eyebrow
  title
  description
  heroImage
  benefits[]
  capabilities[]
  process[]
  outcomes[]
  faqs[]
  cta
  seo
}
```

And:

```ts
Article {
  slug
  title
  excerpt
  category
  author
  publishedAt
  updatedAt
  featuredImage
  content
  relatedArticles[]
  relatedServices[]
  seo
}
```

This is much easier for Claude to develop and maintain than manually building every page.

---

# 3. The blog is particularly important

The current site has genuine long-form SEO content rather than simply a corporate "news" section.

Examples I confirmed include:

**How Infrastructure Modernization Reduces Long-Term Cloud Costs** — February 7, 2026, by Vinodh V. ([Zaplio][7])

**How to Build an AI Roadmap That Actually Ships** — June 11, 2026, by Vinodh V. ([Zaplio][8])

**Cloud Migration Cost Calculator: How to Estimate Your Enterprise Migration Budget** — June 7, 2026, by Harish Thyagarajan. ([Zaplio][9])

**Why IT Leaders Are Ditching Best-of-Breed Vendor Stacks** — July 2, 2026, by Zaplio Marketing. ([Zaplio][10])

**24/7 Managed IT Services: What's Actually Included in an SLA** — July 26, 2026, by Vinodh V. ([Zaplio][11])

There are also embedded tools inside some content. For example, the cloud migration article contains the full cloud migration cost calculator and its five-category cost model. ([Zaplio][9])

### Therefore, the blog should NOT be a static "blog page"

I recommend:

```text
/resources
/resources/[slug]

or, for preserving existing URLs exactly:

/[existing-article-slug]
```

The latter is preferable for SEO because the existing articles already have established URLs.

Each article should have:

* title
* category
* author
* published date
* modified date
* hero image
* reading time
* table of contents
* rich MDX/HTML content
* tables
* diagrams
* callout blocks
* related articles
* related services
* CTA
* author profile
* Article structured data
* Open Graph image
* canonical URL
* breadcrumbs

---

# 4. Very important: preserve the existing URLs

For migration, **URL preservation is one of the highest priorities**.

Do not decide that:

```text
/cloud-migration-cost-calculator/
```

should suddenly become:

```text
/tools/cloud-migration-calculator
```

unless you have a compelling reason.

Likewise, existing article URLs should remain exactly the same.

For anything that does change:

```text
old URL → 301 → new URL
```

Maintain an explicit redirect map:

```ts
const redirects = [
  {
    source: "/old-page",
    destination: "/new-page",
    permanent: true
  }
]
```

Vercel/Next.js supports this kind of routing, and Vercel's current guidance also emphasizes production-aware sitemap/robots/canonical handling for Next.js sites. ([Vercel][12])

---

# 5. Recommended technical stack

For this particular site I would use:

### Frontend

**Next.js + App Router + TypeScript**

This fits the site extremely well because most pages are content-oriented and can be prerendered, while forms, calculators, AI chat and other interactive pieces can remain dynamic. Next.js officially supports static/dynamic rendering and Vercel provides first-class Next.js deployment. ([Vercel][13])

### Styling

**Tailwind CSS**

Plus a small internal design system rather than dumping everything into global CSS.

### Content

I recommend starting with:

**MDX + local content repository**

rather than immediately introducing a complicated CMS.

Why?

The blog is primarily editorial content. MDX lets Claude easily create and edit:

```text
/content
  /articles
  /authors
  /services
  /industries
  /partners
```

Later, if the marketing team needs a browser-based editor, move the content layer to Sanity/Contentful/another headless CMS without redesigning the frontend.

### Forms

Use server-side API routes/actions.

For example:

```text
/contact
/api/contact
/api/newsletter
/api/praxis-application
```

Connect those to the actual CRM/email infrastructure rather than keeping submissions inside the browser.

### Hosting

**GitHub → Vercel**

Recommended structure:

```text
GitHub repository
      ↓
Vercel
      ↓
Production domain
zaplio.io
```

Preview deployments should remain non-indexed while production is indexed. Vercel's current SEO starter guidance specifically recommends production-aware indexing, sitemap, robots, canonical metadata and production URL configuration. ([Vercel][12])

---

# 6. Recommended project structure

I'd give Claude something close to:

```text
zaplio/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── cybersecurity-services/
│   │   ├── cloud-data-center-services/
│   │   ├── managed-it-services/
│   │   ├── network-transformation/
│   │   ├── digital-workplace/
│   │   ├── professional-services/
│   │   ├── industries/
│   │   ├── about/
│   │   ├── our-partners/
│   │   ├── contact/
│   │   ├── praxis/
│   │   ├── cloud-migration-cost-calculator/
│   │   ├── privacy-policy/
│   │   ├── [article-slug]/
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── navigation/
│   │   ├── footer/
│   │   ├── hero/
│   │   ├── sections/
│   │   ├── cards/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   ├── blog/
│   │   ├── calculator/
│   │   ├── forms/
│   │   └── assistant/
│   │
│   ├── content/
│   │   ├── articles/
│   │   ├── authors/
│   │   ├── services/
│   │   ├── industries/
│   │   ├── partners/
│   │   └── pages/
│   │
│   ├── lib/
│   │   ├── seo.ts
│   │   ├── content.ts
│   │   ├── redirects.ts
│   │   ├── analytics.ts
│   │   ├── email.ts
│   │   └── schema.ts
│   │
│   └── styles/
│
├── public/
│   ├── images/
│   ├── logos/
│   ├── icons/
│   └── fonts/
│
├── scripts/
│   ├── migrate-content.ts
│   ├── validate-links.ts
│   ├── validate-seo.ts
│   └── generate-redirect-map.ts
│
├── next.config.ts
├── package.json
└── README.md
```

---

# 7. Design direction

I would **not copy the current site pixel-for-pixel**.

The current messaging is solid, but the new build should feel more like a premium enterprise infrastructure company.

The visual direction should be:

**Dark enterprise technology + restrained electric accent + large typography + generous whitespace + technical visual language.**

Think:

```text
Deep dark base
     +
white/very-light typography
     +
electric blue accent
     +
subtle gradients
     +
thin borders
     +
technical diagrams
     +
large numbers
     +
clean cards
```

Avoid:

* generic "IT company" stock photos
* excessive glowing effects
* overly rounded SaaS-card interfaces
* excessive animation
* giant walls of text
* meaningless animated dashboards

The **infrastructure itself should be the visual metaphor**.

Use network topology, cloud architecture, data flows, security layers, system nodes, abstract infrastructure grids and controlled motion.

---

# 8. Homepage redesign structure

I would improve the current homepage into:

### 01 — Hero

**Eyebrow**

`ENTERPRISE IT INFRASTRUCTURE PARTNER`

**Headline**

`Infrastructure that moves your business forward.`

**Subheadline**

A sharper version of the current proposition:

> Cloud, cybersecurity, networking and managed IT — designed, delivered and operated as one integrated infrastructure platform.

Buttons:

`Talk to an Expert`

`Explore Services`

Right side:

An elegant animated infrastructure visualization.

---

### 02 — Trust / proof strip

Immediately show:

```text
24/7 Operations
Enterprise Infrastructure
Security First
Vendor Neutral
India + Global Delivery
```

---

### 03 — The problem

Keep the current four problems:

**Rising costs**
**Security exposure**
**Legacy infrastructure**
**Overloaded IT teams**

But make the visual presentation much stronger.

---

### 04 — The Zaplio model

Central proposition:

> **One infrastructure partner. One accountable team.**

Then show:

```text
Cloud
   ↓
Network
   ↓
Security
   ↓
Workplace
   ↓
Operations
```

All connected.

---

### 05 — Six services

Large six-card service architecture.

Each service gets:

Icon
Short description
3 capabilities
"Explore service →"

---

### 06 — Why Zaplio

Instead of just copying the current comparison table, make it an interactive visual:

```text
Multiple Vendors

Cloud ─┐
SOC ───┤
Network ─┤── Coordination ── IT Team
Helpdesk ─┘


Zaplio

Cloud
Network
Security
Workplace
Operations

      ↓

ONE ACCOUNTABLE TEAM
```

---

### 07 — Outcomes

Only show verified metrics.

The current site displays several `0` values for metrics such as uptime, TCO reduction and years of experience, which looks like an unfinished data-binding state. ([Zaplio][2])

**Do not migrate those zeros.**

Create configurable metric data:

```ts
{
  value: "99.9%",
  label: "Managed infrastructure uptime"
}
```

and populate it only after Zaplio confirms the actual figures.

The same applies to claims such as 25–35%/30–40% TCO reductions. These are prominent claims on the existing site, so they should be verified by the business before publication. ([Zaplio][2])

---

### 08 — Industries

Use six sectors:

Financial Services
Healthcare
Manufacturing
Retail & E-commerce
Technology & SaaS
Public Sector

These already exist in the current information architecture. ([Zaplio][14])

---

### 09 — Technology ecosystem

Rather than a wall of logos, build:

```text
Cloud
Security
Networking
Data Center
IT Operations
Workplace
```

and then strategic partner highlights.

The existing partner page particularly emphasizes the Motadata alliance and unified IT operations/observability. ([Zaplio][15])

---

### 10 — Thought leadership

Feature the latest three articles dynamically.

```text
Latest from Zaplio

Cloud
Article
Article
Article
```

This makes the homepage automatically change as new posts are published.

---

### 11 — CTA

End with something substantially better than a generic:

> Ready to transform your infrastructure?

Use:

**Know where you need to go. Not sure what needs to change?**

> Start with an infrastructure assessment. We'll help you identify the highest-impact changes across cost, security, performance and operations.

`Start an Assessment`

---

# 9. About page

The current About page has a strong structure that should largely be retained:

**Who we are → mission → model → promise → numbers → operating model → leadership → CTA.** ([Zaplio][16])

Current leadership includes Vinodh Veeraraghavan and Raghavendra Gurumurthy. ([Zaplio][16])

But the new design should make the people considerably more prominent.

Especially:

```text
What we believe
How we work
Why Zaplio exists
Leadership
Experience
```

This matters because an enterprise infrastructure buyer is not buying a consumer SaaS product—they are trusting Zaplio with infrastructure and operations.

---

# 10. Industries should become SEO landing pages

Instead of a single `/industries/` page only, create:

```text
/industries/
/industries/financial-services/
/industries/healthcare/
/industries/manufacturing/
/industries/retail-ecommerce/
/industries/technology-saas/
/industries/public-sector/
```

Each industry page:

```text
Industry-specific hero
↓
Industry risks
↓
Infrastructure requirements
↓
Relevant Zaplio services
↓
Architecture / approach
↓
Compliance considerations
↓
Outcomes
↓
FAQ
↓
CTA
```

This is much stronger for search and paid campaigns.

---

# 11. Services should also cross-link heavily

For example:

```text
Cybersecurity
    ↓
Healthcare
    ↓
SOC 2
    ↓
Managed IT
    ↓
Incident response
    ↓
Related articles
```

The current articles already cover topics such as SOC 2, managed IT SLAs, cloud modernization, AI roadmaps and vendor consolidation. ([Zaplio][17])

That should become an intentional content graph rather than isolated blog posts.

---

# 12. Calculator

The cloud migration calculator is an important lead-generation asset and should remain.

The current calculator considers:

```text
Annual on-prem infrastructure spend
Applications in scope
Migration timeline

Refactoring %
Replatforming %
Lift-and-shift/retire %

Parallel-run period
```

and generates five cost categories:

```text
Infrastructure & compute
Application remediation
Tooling & professional services
Operational readiness
Post-migration optimization
```

([Zaplio][9])

Rebuild it as a proper React component with typed calculation functions:

```text
/components/calculator/
  calculator.tsx
  calculator-inputs.tsx
  calculator-results.tsx
  calculator-chart.tsx
  calculation-engine.ts
```

Most importantly:

**Keep the calculation engine independent from the UI.**

That makes future formula changes easy.

---

# 13. PRAXIS

PRAXIS is a separate audience and should not feel like another enterprise-services page.

It currently targets final-year students and fresh graduates interested in B2B sales, business development and solution consulting. ([Zaplio][18])

I would give it a distinctly different visual system while retaining Zaplio branding:

```text
/pr​axis

Hero
↓
What PRAXIS is
↓
Why it is different
↓
Six pillars
↓
Three-phase journey
↓
Rewards
↓
Who can apply
↓
Career outcomes
↓
Selection process
↓
Application form
```

---

# 14. Lead-generation system

Every important page needs a consistent conversion strategy.

Primary CTA:

**Talk to an Expert**

Secondary contextual CTAs:

```text
Get a Security Assessment
Plan Your Migration
Get a Managed IT Quote
Start an Infrastructure Assessment
Apply to PRAXIS
```

But don't make every button open an enormous form.

Use progressive forms.

### First interaction

```text
Name
Work email
Company
What can we help with?
```

### Optional step

```text
Phone
Company size
Current infrastructure
Timeline
Message
```

This should feed into whichever CRM/email workflow Zaplio actually uses.

---

# 15. SEO architecture

This is one of the most important areas of the rebuild.

Every route should get:

```text
title
description
canonical
robots
Open Graph
Twitter/X image
structured data
breadcrumb
```

Next.js's Metadata APIs are designed for exactly this, and Vercel's current SEO starter pattern includes route-specific metadata, canonical URLs, sitemap, robots and dynamically generated social images. ([Vercel][12])

Generate:

```text
/sitemap.xml
/robots.txt
```

automatically.

Structured data:

```text
Organization
WebSite
BreadcrumbList
Article
FAQPage
Person
Service
```

where appropriate.

---

# 16. Blog SEO

Each article should automatically produce:

```html
Article schema
Breadcrumb schema
OpenGraph metadata
canonical
author
published date
modified date
```

The blog listing should support:

```text
All
Cybersecurity
Cloud
Managed IT
Infrastructure
AI
Leadership / Strategy
```

And search/filtering can be added later.

Don't duplicate article content into JSON and MDX separately.

There should be **one source of truth**.

---

# 17. Images

Do not simply hotlink the existing website images.

Create an asset migration process:

```text
Current site
   ↓
asset inventory
   ↓
download originals
   ↓
rename systematically
   ↓
optimize
   ↓
/public/images
```

Use `next/image` for responsive delivery.

For articles, store:

```text
/public/images/articles/[slug]/
```

For service pages:

```text
/public/images/services/
```

For people:

```text
/public/images/team/
```

---

# 18. AI assistant

The current site contains a "Zap — Zaplio AI" assistant that describes itself as a Zaplio AI assistant and invites questions about IT infrastructure services, SLAs and PRAXIS. ([Zaplio][2])

Don't initially make the assistant responsible for everything.

Create a clean abstraction:

```text
Assistant UI
      ↓
/api/chat
      ↓
Knowledge retrieval
      ↓
LLM
```

Knowledge sources should eventually include:

```text
Services
Industries
Partners
PRAXIS
Blog
FAQs
Company information
```

And establish clear guardrails:

> Don't invent pricing, SLAs, certifications, guarantees, customer results or technical capabilities.

That is particularly important because the website contains many numerical and performance claims.

---

# 19. Content migration process

This should be handled as a separate phase from visual development.

### Phase A — inventory

Export / capture:

```text
URL
Page title
H1
Meta title
Meta description
Canonical
Content
Images
Internal links
External links
Published date
Modified date
Author
Category
Redirect destination
```

### Phase B — URL map

Create:

```text
migration-map.csv
```

with:

```text
old_url,new_url,status,redirect
```

### Phase C — content cleanup

Don't blindly copy everything.

Flag:

```text
Duplicate
Outdated
Placeholder
Unsupported claim
Broken image
Broken link
Missing metadata
Needs rewrite
Keep as-is
```

### Phase D — import

Convert approved content into MDX/content objects.

### Phase E — validation

Run a crawler against both versions and compare:

```text
URLs
titles
H1s
status codes
canonical
links
images
sitemap
structured data
```

---

# 20. What Claude should NOT do

This is important.

Tell Claude:

**Do not:**

* invent customer logos
* invent statistics
* invent certifications
* invent case studies
* invent partner relationships
* invent addresses
* invent phone numbers
* make up employee biographies
* replace real article content with summaries
* delete old URLs without redirects
* hard-code blog posts directly into page components
* use placeholder `0%` metrics in production
* put API keys in frontend code
* rely on client-side rendering for SEO-critical content
* create an enormous dependency stack unnecessarily

---

# 21. Development phases

### Phase 1 — Foundation

Set up:

```text
Next.js
TypeScript
Tailwind
ESLint
Prettier
GitHub
Vercel
```

Then create design tokens and global components.

### Phase 2 — Core shell

Build:

```text
Header
Navigation
Mobile navigation
Footer
CTA system
Breadcrumbs
Typography
Buttons
Cards
Forms
```

### Phase 3 — Main pages

Build:

```text
Home
Services
About
Industries
Partners
Contact
```

### Phase 4 — Service templates

Build the reusable service template and populate all six services.

### Phase 5 — Industry templates

Build industry template and populate all industries.

### Phase 6 — Blog engine

Implement:

```text
listing
article
author
category
related posts
search/filter
SEO
RSS/optional
```

### Phase 7 — Tools

Implement the cloud migration calculator.

### Phase 8 — PRAXIS

Build the separate PRAXIS experience and application flow.

### Phase 9 — AI/chat + forms

Integrate the actual providers.

### Phase 10 — Migration

Import real content and assets.

### Phase 11 — SEO validation

Run:

```text
crawl
broken-link audit
redirect audit
metadata audit
schema audit
sitemap audit
robots audit
image audit
Core Web Vitals testing
```

### Phase 12 — Launch

```text
Vercel preview
↓
stakeholder approval
↓
production deployment
↓
DNS
↓
SSL
↓
analytics
↓
Search Console
↓
monitoring
```

---

# 22. Vercel production architecture

A sensible final setup is:

```text
GitHub
   │
   ▼
Vercel
   │
   ├── Next.js
   │     ├── Static marketing pages
   │     ├── Blog
   │     ├── Dynamic calculator
   │     └── API routes
   │
   ├── CDN / image optimization
   │
   ├── Environment variables
   │
   └── Analytics / monitoring
```

Next.js on Vercel supports static generation, server rendering, API routes and ISR, so you don't need to create separate infrastructure for the marketing pages and the dynamic pieces. ([Vercel][13])

---

# 23. My recommended content strategy after migration

The current blog is already moving in a good direction: practical decision-making content rather than generic "What is cloud?" articles.

Continue with four pillars:

### Cloud & Infrastructure

```text
Cloud migration
Cloud economics
Infrastructure modernization
Hybrid cloud
Data centers
DR
FinOps
```

### Cybersecurity

```text
SOC
Zero Trust
SOC 2
ISO 27001
Incident response
IAM
Vulnerability management
```

### Managed IT

```text
MSP selection
SLA
NOC
IT operations
Vendor consolidation
IT cost optimization
```

### Executive / strategic technology

```text
AI infrastructure
Technology strategy
CIO decision-making
Digital transformation
Infrastructure ROI
Technology risk
```

The existing articles already demonstrate that Zaplio can produce substantial framework-oriented content in these areas. ([Zaplio][8])

---

# 24. The exact Claude prompt I would use

Below is the part I'd actually hand to Claude Code. It is deliberately specific so Claude doesn't start by blindly generating a generic corporate template.

# Zaplio Website Rebuild — Development Specification

You are a senior product designer, UX engineer, Next.js engineer and technical SEO specialist.

Your task is to rebuild the Zaplio Technologies website from scratch as a production-quality enterprise IT infrastructure website.

The existing website is [https://zaplio.io/](https://zaplio.io/)

Do NOT simply copy the existing HTML/CSS.

Use the existing website as the source of truth for:

* information architecture
* services
* public company information
* existing article URLs
* existing messaging
* existing functionality
* public partner information
* PRAXIS content
* calculator behavior
* existing CTA strategy

The objective is to create a significantly better technical implementation, user experience and visual system while preserving SEO equity and important existing URLs.

---

## 1. Technology requirements

Use:

* Next.js
* App Router
* TypeScript
* Tailwind CSS
* React
* MDX for editorial content initially
* Vercel as production hosting
* GitHub as source control

Use server components by default.

Use client components only when interactivity requires them.

Do not introduce unnecessary frameworks or dependencies.

Prioritize:

* performance
* accessibility
* SEO
* clean component architecture
* maintainability
* responsive design
* security

---

## 2. Brand positioning

Zaplio is positioned as:

ENTERPRISE IT INFRASTRUCTURE PARTNER

Core proposition:

Zaplio combines cloud, data center, cybersecurity, networking, digital workplace and managed IT into one integrated infrastructure partnership.

The central message should be:

ONE ACCOUNTABLE PARTNER FOR MODERN ENTERPRISE INFRASTRUCTURE.

Tone:

* enterprise
* confident
* technically credible
* practical
* direct
* sophisticated
* outcome-oriented

Avoid generic technology-company copy.

Avoid excessive buzzwords.

Do not claim anything that is not supported by approved Zaplio content.

---

## 3. Visual direction

Create a premium enterprise technology visual language.

Use:

* dark enterprise foundation
* strong white/near-white typography
* restrained electric-blue accent
* subtle gradients
* fine technical borders
* large editorial typography
* infrastructure-inspired visualizations
* network topology
* cloud architecture motifs
* system diagrams
* controlled animation
* generous spacing
* strong visual hierarchy

Do NOT use:

* generic stock-photo-heavy layouts
* cheesy cybersecurity imagery
* excessive neon
* excessive glassmorphism
* excessive rounded cards
* meaningless animations
* cluttered dashboards

The website should feel like a serious infrastructure company serving CIOs, CTOs, CISOs and enterprise IT leaders.

---

## 4. Global navigation

Create:

Home

Services

* Cybersecurity Services
* Cloud & Data Center
* Network Transformation
* Digital Workplace
* Managed IT Services
* Professional Services

Industries

* Financial Services
* Healthcare
* Manufacturing
* Retail & E-commerce
* Technology & SaaS
* Public Sector

Partners

About

Resources / Insights

PRAXIS

Contact

Primary global CTA:

Talk to an Expert

---

## 5. Core routes

Implement these routes:

/

/services/

/cybersecurity-services/
/cloud-data-center-services/
/network-transformation/
/digital-workplace/
/managed-it-services/
/professional-services/

/industries/
/industries/financial-services/
/industries/healthcare/
/industries/manufacturing/
/industries/retail-ecommerce/
/industries/technology-saas/
/industries/public-sector/

/our-partners/
/about/
/contact/
/praxis/

/cloud-migration-cost-calculator/

/privacy-policy/

Also support existing article URLs.

DO NOT change an existing article slug just for architectural convenience.

---

## 6. Homepage architecture

Build the homepage using reusable sections.

Section 1:
Enterprise IT Infrastructure Partner

Headline direction:

Infrastructure that moves your business forward.

Subheadline:

Cloud, cybersecurity, networking and managed IT — designed, delivered and operated as one integrated infrastructure platform.

CTA:
Talk to an Expert

Secondary:
Explore Services

Section 2:
Infrastructure complexity problem

Show:

* rising operational costs
* security/compliance risk
* outdated infrastructure
* overloaded IT teams

Section 3:
Zaplio approach

Headline:

One infrastructure partner. One accountable team.

Explain the integrated model.

Section 4:
Six service lines.

Each service card must contain:

* name
* concise description
* top capabilities
* CTA

Section 5:
Why integrated infrastructure wins.

Create a visually strong comparison between:
Multiple specialist vendors
versus
One integrated Zaplio partner.

Section 6:
Outcomes.

All statistics must be data-driven.

Never display placeholder 0 values.

Do not invent actual statistics.

Section 7:
Who we serve.

Industries and business profiles.

Section 8:
Technology partners.

Show partner ecosystem without creating fake logos or relationships.

Section 9:
Customer proof.

Only use approved customer testimonials.

Do not invent names, logos or company identities.

Section 10:
Latest insights.

Dynamically pull three latest articles.

Section 11:
FAQ.

Section 12:
Final infrastructure assessment CTA.

---

## 7. Service page architecture

Create ONE reusable service-page component/template.

Data-driven service object:

```ts
type Service = {
  slug: string
  name: string
  eyebrow: string
  title: string
  description: string
  heroImage?: string
  benefits: {
    title: string
    description: string
  }[]
  capabilities: {
    title: string
    description: string
  }[]
  process: {
    number: string
    title: string
    description: string
  }[]
  outcomes: {
    value: string
    label: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}
```

Template structure:

Hero
Overview
Four key benefits
Capabilities
Approach
Outcomes
FAQ
CTA

Populate:

Cybersecurity Services

Cloud & Data Center

Network Transformation

Digital Workplace

Managed IT Services

Professional Services

Do not duplicate page components.

---

## 8. Cybersecurity content

Use the existing Zaplio positioning around:

* 24/7 SOC
* threat intelligence
* vulnerability management
* IAM
* endpoint security
* network security
* zero trust
* compliance
* incident response

Create strong enterprise-focused information architecture.

Do not invent certifications.

---

## 9. Cloud & Data Center content

Include:

* cloud migration
* hybrid cloud
* multi-cloud
* virtualization
* containers
* backup
* disaster recovery
* cost optimization
* data-center modernization

Preserve the existing page's four-step delivery model:

Assess
Architect
Migrate
Optimize

---

## 10. Managed IT content

Include:

* 24/7 NOC
* helpdesk
* proactive monitoring
* patch management
* infrastructure management
* asset lifecycle
* reporting and optimization
* co-managed IT
* fully managed IT

Preserve the current concept of measurable SLA-backed service.

---

## 11. Industries

Create reusable industry-page template.

Each page must contain:

Hero
Industry challenges
Infrastructure priorities
Relevant Zaplio services
Security/compliance considerations
Delivery approach
Outcomes
FAQ
CTA

Industries:

Financial Services
Healthcare
Manufacturing
Retail & E-commerce
Technology & SaaS
Public Sector

---

## 12. About page

Include:

Who we are
Mission
Model
Promise
Leadership
How we work
Company numbers
CTA

Leadership profiles must use approved Zaplio content only.

Do not invent credentials or career histories.

---

## 13. Partner page

Create:

/our-partners/

Sections:

Why partnerships matter
Technology categories
Cloud
Security
Networking
Data center
IT operations
Workplace
Strategic partners
Motadata alliance
CTA

Partner names/logos must be based on approved Zaplio information.

Never infer a partnership simply because a technology is mentioned.

---

## 14. PRAXIS

Create a separate branded experience for:

/praxis/

Content architecture:

Hero
What PRAXIS is
Why it is different
Six pillars
Three phases
Rewards
Who it's for
Career outcomes
Selection process
Application CTA

Do not mix PRAXIS messaging into normal enterprise service messaging.

---

## 15. Blog / Resources architecture

Build the blog as a real content system.

Use MDX.

Directory:

/src/content/articles/

Every article must support:

slug
title
excerpt
category
author
publishedAt
updatedAt
featuredImage
content
relatedArticles
relatedServices
seoTitle
seoDescription

Article page must include:

* breadcrumbs
* title
* author
* publication date
* updated date
* reading time
* featured image
* table of contents
* rich content
* tables
* diagrams
* callouts
* related articles
* related service CTA
* final consultation CTA

Support MDX components:

<Callout />
<InfoCard />
<ComparisonTable />
<Stat />
<Quote />
<Diagram />
<CTA />

Do not flatten rich article content into plain text.

---

## 16. Existing content migration

Before replacing the existing site, create an inventory.

For every existing URL record:

* old URL
* new URL
* HTTP status
* title
* meta title
* meta description
* H1
* content
* canonical
* images
* author
* publication date
* internal links
* redirect destination

Never intentionally drop an indexed page without a redirect or an explicit migration decision.

Preserve existing blog URLs wherever practical.

Create a redirect map.

---

## 17. SEO

Create centralized SEO utilities.

Every page must support:

* title
* description
* canonical
* Open Graph
* Twitter/X metadata
* robots
* structured data

Implement:

/sitemap.xml

/robots.txt

Use Next.js metadata APIs.

Generate Article schema for articles.

Generate Organization and WebSite structured data globally where appropriate.

Generate BreadcrumbList for internal pages.

Generate FAQ schema where appropriate and valid.

Do not keyword-stuff.

Do not create duplicate metadata.

---

## 18. Dynamic sitemap

The sitemap should include:

* core pages
* service pages
* industry pages
* articles

Do not hard-code the sitemap manually if content is data-driven.

---

## 19. Calculator

Rebuild:

/cloud-migration-cost-calculator/

Architecture:

/src/components/calculator/

Files:

calculator.tsx
calculator-inputs.tsx
calculator-results.tsx
calculator-chart.tsx
calculation-engine.ts

Keep all formulas in calculation-engine.ts.

Do not put business logic directly into UI components.

Inputs include:

* annual on-prem infrastructure spend
* applications in scope
* migration timeline
* refactoring percentage
* replatforming percentage
* lift-and-shift/retire percentage
* parallel-run duration
* currency

Outputs include:

* total migration investment
* low estimate
* mid estimate
* high estimate
* migration-to-OPEX ratio
* contingency buffer
* monthly run rate
* cost per application

Clearly display:

"This calculator is indicative only. Actual migration costs vary based on application complexity, data volume, architecture, tooling, partner selection and organisational readiness."

Do not present estimates as guaranteed pricing.

---

## 20. Contact system

Create reusable lead form.

Fields:

Name
Work email
Company
Phone optional
Service interest
Message

Use server-side handling.

Do not expose email/CRM API secrets in client-side JavaScript.

Show:
success state
error state
validation
loading state
spam protection

---

## 21. WhatsApp

Preserve the existing WhatsApp CTA.

Make the number configurable through environment/configuration rather than hard-coded in multiple components.

---

## 22. AI assistant

Create an abstraction:

UI
→ /api/chat
→ knowledge layer
→ model

Do not expose model API keys.

Initial knowledge base:

* services
* industries
* company
* partners
* PRAXIS
* FAQs
* articles

The assistant must not invent:

* pricing
* SLAs
* certifications
* statistics
* customer claims
* partner relationships
* guarantees

If information is unavailable, it should say so.

---

## 23. Design system

Create reusable components:

Button
LinkButton
Container
Section
Eyebrow
Heading
Card
Badge
Metric
Accordion
Breadcrumbs
CTA
LogoCloud
ArticleCard
ServiceCard
IndustryCard
PartnerCard
FormField
Modal
Tooltip
Callout

Avoid building one-off versions of the same component.

---

## 24. Accessibility

Target WCAG-friendly implementation.

Requirements:

* semantic HTML
* keyboard navigation
* visible focus states
* sufficient contrast
* accessible accordions
* accessible dialogs
* meaningful alt text
* reduced-motion support
* proper form labels
* screen-reader support

Do not rely on color alone.

---

## 25. Responsive behavior

Design for:

* mobile
* tablet
* laptop
* large desktop

Do not simply shrink desktop layouts.

Navigation must have a dedicated mobile architecture.

Tables must become scrollable or transform appropriately on small screens.

---

## 26. Performance

Optimize:

* image sizes
* fonts
* JS bundles
* client-side components
* third-party scripts
* animation
* lazy loading

Use Next.js image optimization.

Avoid loading heavy libraries for simple interactions.

Critical marketing content should render quickly and be indexable.

---

## 27. Analytics

Build analytics abstraction rather than embedding a vendor throughout the code.

Support:

page views
CTA clicks
form submissions
calculator interactions
calculator completion
article engagement

Use environment variables/configuration for analytics providers.

---

## 28. Testing

Create automated checks for:

* TypeScript
* lint
* build
* routes
* broken internal links
* missing metadata
* canonical URLs
* sitemap
* robots
* redirects
* 404
* image availability

Create scripts:

scripts/validate-links.ts
scripts/validate-seo.ts
scripts/validate-routes.ts

Before production:

* crawl all routes
* verify every old URL
* verify redirects
* verify sitemap
* verify metadata
* verify structured data
* test mobile
* test forms
* test calculator
* test assistant
* test accessibility
* test performance

---

## 29. Vercel deployment

Production:

GitHub → Vercel → zaplio.io

Create environment variables through Vercel.

Never commit secrets.

Preview deployments must not be indexable.

Production sitemap and canonical URLs must point to:

[https://zaplio.io](https://zaplio.io)

Use Vercel's standard Next.js deployment behavior.

---

## 30. Required configuration

Create a central:

src/config/site.ts

containing:

site name
production URL
description
social links
contact email
phone
navigation
company information
CTA configuration

Do not scatter these values across components.

---

## 31. Content source of truth

For the initial implementation:

src/content/

must be the source of truth for marketing/editorial content.

Components must not contain large blocks of marketing copy.

Example:

BAD:

```tsx
<h1>
  Long marketing copy directly embedded in component
</h1>
```

GOOD:

```tsx
<ServiceHero
  title={service.title}
  description={service.description}
/>
```

---

## 32. Development process

Do not generate the entire project in one huge uncontrolled implementation.

Build in this order:

1. repository and tooling
2. design tokens
3. global layout
4. navigation/footer
5. component library
6. homepage
7. service template
8. six services
9. industries
10. About
11. Partners
12. Contact
13. blog engine
14. article migration
15. calculator
16. PRAXIS
17. AI assistant
18. SEO
19. redirects
20. automated tests
21. Vercel deployment configuration

At the end of every major phase:

* run build
* fix TypeScript
* fix lint
* verify routes
* do not leave broken placeholders

---

## 33. Important content rules

Do not invent:

* statistics
* certifications
* client names
* client logos
* partner status
* case studies
* customer results
* SLAs
* guarantees
* leadership credentials

Where current Zaplio content contains placeholder values such as "0%", do not reproduce them.

Use configurable data and leave the approved metric empty until confirmed.

---

## 34. Final acceptance criteria

The rebuild is complete only when:

* all major existing routes work
* important old URLs are preserved
* changed URLs redirect correctly
* blog articles are migrated
* images are migrated
* metadata exists for all indexable pages
* sitemap works
* robots works
* canonical URLs work
* structured data validates
* mobile experience works
* contact forms work
* calculator works
* PRAXIS works
* assistant works
* no secrets are exposed
* no TypeScript errors
* no build errors
* no critical accessibility errors
* no major broken links
* site deploys successfully on Vercel

First produce the architecture and file structure.

Then create the design system.

Then implement the homepage.

Do not start by generating every page at once.

---

## 25. One change I'd make beyond the current site

The current Zaplio website is already conceptually strong, but I'd make the rebuilt version **much more content-system driven**.

The desired relationship should be:

```text
                    ZAPLIO
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     SERVICES       INDUSTRIES      RESOURCES
        │              │              │
  Cloud/Security    Healthcare       Articles
  Network/etc.      Finance          Guides
                    Retail           Tools
                    SaaS             Calculators
        │              │              │
        └──────────────┼──────────────┘
                       │
                CONVERSION
                       │
               Infrastructure
                  Assessment
```

That will let you publish one article and automatically connect it to relevant services and industries instead of treating your blog as a separate silo.

### Bottom line

**Build with Next.js + TypeScript + Tailwind + MDX → deploy on Vercel → preserve existing URLs → migrate articles/assets → create reusable service/industry/article templates → make SEO a first-class part of the application → keep the calculator and AI assistant as proper application features.**

The biggest migration risks are **SEO loss, missing old URLs, broken article images, unverified metrics, and forms/assistant functionality being treated as an afterthought**. The existing site's content already gives you a very good foundation; the rebuild should primarily improve its architecture, visual sophistication, conversion flow and maintainability rather than throwing away the accumulated content. ([Zaplio][1])

[1]: https://zaplio.io/?utm_source=chatgpt.com "Zaplio"
[2]: https://zaplio.io/ "Zaplio"
[3]: https://zaplio.io/services/ "Services"
[4]: https://zaplio.io/cybersecurity-services "Cybersecurity Services"
[5]: https://zaplio.io/cloud-data-center-services/?utm_source=chatgpt.com "Cloud & Data Center Services"
[6]: https://zaplio.io/managed-it-services "Managed IT Services"
[7]: https://zaplio.io/how-infrastructure-modernization-reduces-long-term-cloud-costs/?utm_source=chatgpt.com "How Infrastructure Modernization Reduces Long-Term Cloud Costs"
[8]: https://zaplio.io/how-to-build-an-ai-roadmap-that-actually-ships/?utm_source=chatgpt.com "How to Build an AI Roadmap That Actually Ships"
[9]: https://zaplio.io/cloud-migration-cost-calculator/?utm_source=chatgpt.com "Cloud Migration Cost Estimator for Enterprise"
[10]: https://zaplio.io/vendor-consolidation-it-leaders/?utm_source=chatgpt.com "Vendor Consolidation for Enterprise IT: A Risk-Aware Guide"
[11]: https://zaplio.io/managed-it-services-sla-guide/?utm_source=chatgpt.com "Managed IT Services SLA: What's Actually Included | Zaplio"
[12]: https://vercel.com/templates/next.js/seo-starter?utm_source=chatgpt.com "SEO Starter - Vercel"
[13]: https://vercel.com/frameworks/nextjs?utm_source=chatgpt.com "Next.js on Vercel"
[14]: https://zaplio.io/industries/?utm_source=chatgpt.com "Industries"
[15]: https://zaplio.io/our-partners/?utm_source=chatgpt.com "Our Partners"
[16]: https://zaplio.io/about "About Us"
[17]: https://zaplio.io/soc-2-type-2-audit-preparation-checklist/?utm_source=chatgpt.com "SOC 2 Type 2 Audit Preparation Checklist Guide"
[18]: https://zaplio.io/praxis/?utm_source=chatgpt.com "PRAXIS"
