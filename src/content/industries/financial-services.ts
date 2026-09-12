import type { Industry } from "../types";

export const financialServices: Industry = {
  slug: "financial-services",
  name: "Financial Services",
  eyebrow: "Financial Services",
  title: "Infrastructure built for regulated, high-availability operations.",
  description:
    "Financial services organizations run on infrastructure that has to be secure, available and auditable at the same time. We design and operate infrastructure with those constraints built in from the start.",
  challenges: [
    { title: "Regulatory scrutiny", description: "Infrastructure decisions need to hold up under audit and regulatory review." },
    { title: "Always-on expectations", description: "Downtime has direct financial and reputational cost." },
    { title: "Expanding attack surface", description: "Digital channels and third-party integrations widen the security perimeter." },
    { title: "Legacy core systems", description: "Core platforms are often difficult to modernize without disrupting operations." },
  ],
  priorities: [
    { title: "Resilience", description: "Infrastructure designed for high availability and fast recovery." },
    { title: "Security & access control", description: "Strong identity and access management across systems and data." },
    { title: "Auditability", description: "Infrastructure and processes that can be clearly documented for regulators." },
    { title: "Controlled modernization", description: "Modernizing legacy systems without introducing operational risk." },
  ],
  relatedServiceSlugs: ["cybersecurity-services", "cloud-data-center-services", "managed-it-services"],
  compliance: [
    {
      title: "Data residency and access control",
      description: "Infrastructure architecture accounts for where data lives and who can access it.",
    },
    {
      title: "Audit-ready documentation",
      description: "Operational processes designed to be clearly documented for internal and external audit.",
    },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Can you work within our existing compliance framework?",
      answer:
        "We design infrastructure and operating processes around your specific compliance and regulatory requirements, rather than a generic template.",
    },
  ],
  seo: {
    title: "Infrastructure for Financial Services",
    description:
      "Enterprise IT infrastructure for financial services, built for resilience, security and auditability.",
  },
};
