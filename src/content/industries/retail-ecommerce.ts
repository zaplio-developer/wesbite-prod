import type { Industry } from "../types";

export const retailEcommerce: Industry = {
  slug: "retail-ecommerce",
  name: "Retail & E-commerce",
  eyebrow: "Retail & E-commerce",
  title: "Infrastructure that holds up under peak demand.",
  description:
    "Retail and e-commerce infrastructure has to handle unpredictable, spiky demand while protecting customer and payment data. We design for both scale and security together.",
  challenges: [
    { title: "Demand spikes", description: "Traffic and transaction volume can spike well beyond baseline without warning." },
    { title: "Payment data security", description: "Payment and customer data require strong, consistently enforced protection." },
    { title: "Omnichannel complexity", description: "In-store, online and mobile systems all need to work together reliably." },
    { title: "Distributed store locations", description: "Store networks need consistent connectivity and security." },
  ],
  priorities: [
    { title: "Elastic capacity", description: "Infrastructure that scales up for peak periods without overpaying the rest of the year." },
    { title: "Payment security", description: "Strong controls around payment and customer data." },
    { title: "Omnichannel reliability", description: "Consistent performance across online, mobile and in-store systems." },
    { title: "Store connectivity", description: "Reliable, secure networking across every location." },
  ],
  relatedServiceSlugs: ["cloud-data-center-services", "cybersecurity-services", "network-transformation"],
  compliance: [
    {
      title: "Payment data handling",
      description: "Infrastructure architecture accounts for the sensitivity of payment and customer data.",
    },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Can infrastructure scale for seasonal peaks?",
      answer:
        "Yes. Cloud and hybrid architecture is designed to scale up for peak periods, like seasonal sales events, and back down afterward.",
    },
  ],
  seo: {
    title: "Infrastructure for Retail & E-commerce",
    description:
      "Enterprise IT infrastructure for retail and e-commerce, built to scale for peak demand and protect payment data.",
  },
};
