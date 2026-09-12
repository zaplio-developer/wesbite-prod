import type { Industry } from "../types";

export const manufacturing: Industry = {
  slug: "manufacturing",
  name: "Manufacturing",
  eyebrow: "Manufacturing",
  title: "Infrastructure that connects plant floor and enterprise systems.",
  description:
    "Manufacturing environments span plant-floor operational technology and enterprise IT. We design infrastructure that connects both securely, without treating them as separate problems.",
  challenges: [
    { title: "IT/OT convergence", description: "Operational technology and enterprise IT need to work together securely." },
    { title: "Legacy plant systems", description: "Older equipment and control systems are difficult to secure and modernize." },
    { title: "Distributed sites", description: "Multiple plants and facilities need consistent connectivity and management." },
    { title: "Production continuity", description: "Infrastructure changes have to avoid disrupting production." },
  ],
  priorities: [
    { title: "Secure IT/OT connectivity", description: "Network architecture that connects plant and enterprise systems without unnecessary exposure." },
    { title: "Site standardization", description: "Consistent infrastructure and security posture across every facility." },
    { title: "Minimal-disruption change", description: "Infrastructure changes planned around production schedules." },
    { title: "Visibility", description: "Monitoring across both IT and OT environments." },
  ],
  relatedServiceSlugs: ["network-transformation", "cybersecurity-services", "managed-it-services"],
  compliance: [
    {
      title: "OT network segmentation",
      description: "Operational technology networks isolated from general enterprise IT where appropriate.",
    },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Can infrastructure changes be scheduled around production?",
      answer:
        "Yes. Changes to plant-connected infrastructure are planned around production schedules and maintenance windows to avoid disruption.",
    },
  ],
  seo: {
    title: "Infrastructure for Manufacturing",
    description:
      "Enterprise IT infrastructure for manufacturing, connecting plant-floor and enterprise systems securely.",
  },
};
