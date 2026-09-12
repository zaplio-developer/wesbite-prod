import type { Service } from "../types";

export const digitalWorkplace: Service = {
  slug: "digital-workplace",
  name: "Digital Workplace",
  eyebrow: "Digital Workplace",
  title: "A workplace built for how people actually work.",
  description:
    "Device lifecycle, collaboration tooling and endpoint security designed for a secure, productive workplace — wherever your people are.",
  benefits: [
    {
      title: "Secure by default",
      description: "Endpoint security built into every device from deployment onward.",
    },
    {
      title: "Less device management overhead",
      description: "Device lifecycle managed end to end, from procurement to retirement.",
    },
    {
      title: "Better collaboration",
      description: "Tooling designed around how teams actually communicate and work together.",
    },
    {
      title: "Supports hybrid and mobile work",
      description: "Infrastructure that works the same whether people are in-office or remote.",
    },
  ],
  capabilities: [
    { title: "Device lifecycle", description: "Procurement, deployment, support and retirement of end-user devices." },
    { title: "Collaboration tooling", description: "Deployment and support of the platforms teams use to communicate and work." },
    { title: "Endpoint security", description: "Security controls applied consistently across all managed devices." },
    { title: "Mobility & productivity", description: "Infrastructure that supports secure work from any location." },
  ],
  process: [
    { number: "01", title: "Assess", description: "Review current device fleet, tooling and workplace requirements." },
    { number: "02", title: "Architect", description: "Design the target digital workplace environment." },
    { number: "03", title: "Migrate", description: "Roll out devices, tooling and security controls." },
    { number: "04", title: "Optimize", description: "Refine based on usage patterns and evolving workplace needs." },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Does this cover remote and hybrid employees?",
      answer:
        "Yes. The digital workplace approach is designed to work consistently whether employees are on-site, remote or hybrid.",
    },
  ],
  seo: {
    title: "Digital Workplace Services",
    description:
      "Device lifecycle, collaboration tooling, endpoint security and mobility — delivered as part of one integrated infrastructure partnership.",
  },
};
