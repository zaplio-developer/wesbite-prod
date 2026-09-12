import type { Service } from "../types";

export const professionalServices: Service = {
  slug: "professional-services",
  name: "Professional Services",
  eyebrow: "Professional Services",
  title: "Consulting and delivery for complex infrastructure projects.",
  description:
    "Consulting, architecture and project delivery for infrastructure initiatives that need dedicated expertise beyond day-to-day operations.",
  benefits: [
    {
      title: "Specialist expertise on demand",
      description: "Access to architecture and delivery expertise for projects outside routine operations.",
    },
    {
      title: "Structured delivery",
      description: "Projects run with defined scope, milestones and accountability.",
    },
    {
      title: "Aligned to your infrastructure",
      description: "Recommendations grounded in your existing environment, not generic best practice.",
    },
    {
      title: "One partner across the project",
      description: "The same team that advises can also execute, avoiding handoff gaps.",
    },
  ],
  capabilities: [
    { title: "Consulting", description: "Advisory support for infrastructure strategy and decision-making." },
    { title: "Architecture", description: "Designing target-state infrastructure for specific initiatives." },
    { title: "Migration", description: "Planning and executing infrastructure migration projects." },
    { title: "Project delivery", description: "End-to-end delivery of scoped infrastructure projects." },
  ],
  process: [
    { number: "01", title: "Assess", description: "Understand project goals, constraints and current environment." },
    { number: "02", title: "Architect", description: "Design the recommended approach and target architecture." },
    { number: "03", title: "Migrate", description: "Execute the project plan in defined phases." },
    { number: "04", title: "Optimize", description: "Validate outcomes and hand off with documentation." },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Is this only for one-off projects?",
      answer:
        "Professional Services engagements are typically scoped projects, but can also feed into ongoing managed services once delivered.",
    },
  ],
  seo: {
    title: "Professional Services",
    description:
      "Consulting, architecture, migration and project delivery for enterprise infrastructure initiatives.",
  },
};
