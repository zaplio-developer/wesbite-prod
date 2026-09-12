import type { Industry } from "../types";

export const publicSector: Industry = {
  slug: "public-sector",
  name: "Public Sector",
  eyebrow: "Public Sector",
  title: "Infrastructure built for accountability and continuity of service.",
  description:
    "Public sector organizations need infrastructure that's secure, auditable and reliable for the services citizens depend on. We design and operate infrastructure with those constraints in mind.",
  challenges: [
    { title: "Constrained budgets", description: "Infrastructure investment has to be justified and used efficiently." },
    { title: "Legacy systems", description: "Aging infrastructure often underpins critical public services." },
    { title: "Accountability requirements", description: "Infrastructure and spending decisions face public and regulatory scrutiny." },
    { title: "Service continuity", description: "Downtime affects public services citizens rely on." },
  ],
  priorities: [
    { title: "Cost efficiency", description: "Infrastructure sized and managed to make the most of constrained budgets." },
    { title: "Modernization without disruption", description: "Upgrading legacy systems without interrupting public services." },
    { title: "Security & resilience", description: "Infrastructure protected against disruption and misuse." },
    { title: "Transparent operations", description: "Infrastructure decisions and spend that can be clearly documented." },
  ],
  relatedServiceSlugs: ["managed-it-services", "cybersecurity-services", "cloud-data-center-services"],
  compliance: [
    {
      title: "Auditable infrastructure decisions",
      description: "Infrastructure and operating processes documented for public accountability.",
    },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Can you work within existing procurement and budget cycles?",
      answer:
        "Yes. We scope infrastructure recommendations and phasing around your budget cycle and procurement process.",
    },
  ],
  seo: {
    title: "Infrastructure for Public Sector",
    description:
      "Enterprise IT infrastructure for public sector organizations — built for accountability, security and service continuity.",
  },
};
