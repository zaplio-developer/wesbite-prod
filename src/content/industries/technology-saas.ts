import type { Industry } from "../types";

export const technologySaas: Industry = {
  slug: "technology-saas",
  name: "Technology & SaaS",
  eyebrow: "Technology & SaaS",
  title: "Infrastructure that scales with product velocity.",
  description:
    "Technology and SaaS companies need infrastructure that keeps pace with fast-moving product development without sacrificing security or reliability.",
  challenges: [
    { title: "Rapid product iteration", description: "Infrastructure needs to keep up with frequent releases and changing requirements." },
    { title: "Multi-tenant security", description: "Customer data needs strong isolation and protection in shared environments." },
    { title: "Cost at scale", description: "Cloud spend can grow faster than revenue without active management." },
    { title: "Lean internal teams", description: "Engineering teams are focused on product, not infrastructure operations." },
  ],
  priorities: [
    { title: "Scalable cloud architecture", description: "Infrastructure that scales with usage without manual intervention." },
    { title: "Tenant isolation", description: "Strong security boundaries between customers in shared environments." },
    { title: "Cost visibility", description: "Ongoing tracking of cloud spend against usage and growth." },
    { title: "Operational offload", description: "Infrastructure operations handled so engineering can focus on product." },
  ],
  relatedServiceSlugs: ["cloud-data-center-services", "cybersecurity-services", "managed-it-services"],
  compliance: [
    {
      title: "Customer data isolation",
      description: "Architecture designed around strong tenant boundaries in shared infrastructure.",
    },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Do you work with cloud-native and multi-cloud environments?",
      answer:
        "Yes. We design and operate infrastructure across single-cloud, multi-cloud and hybrid environments depending on what fits your product and constraints.",
    },
  ],
  seo: {
    title: "Infrastructure for Technology & SaaS",
    description:
      "Enterprise IT infrastructure for technology and SaaS companies — scalable, secure, and built to keep pace with product velocity.",
  },
};
