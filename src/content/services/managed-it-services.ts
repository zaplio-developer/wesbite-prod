import type { Service } from "../types";

export const managedItServices: Service = {
  slug: "managed-it-services",
  name: "Managed IT Services",
  eyebrow: "Managed IT",
  title: "IT operations, managed end to end.",
  description:
    "24/7 monitoring, helpdesk, patching and infrastructure management, so your infrastructure runs reliably without consuming your internal team's time.",
  benefits: [
    {
      title: "Always-on coverage",
      description: "24/7 NOC and helpdesk instead of business-hours-only support.",
    },
    {
      title: "Fewer surprises",
      description: "Proactive monitoring and patching catches issues before they become outages.",
    },
    {
      title: "Predictable operations",
      description: "Structured processes for infrastructure management and asset lifecycle.",
    },
    {
      title: "Freed-up internal team",
      description: "Your IT staff focus on strategic work instead of day-to-day firefighting.",
    },
  ],
  capabilities: [
    { title: "24/7 NOC", description: "Continuous monitoring of infrastructure health and performance." },
    { title: "Helpdesk", description: "A single point of contact for end-user and infrastructure issues." },
    { title: "Proactive monitoring & patching", description: "Ongoing patch management to reduce exposure and downtime." },
    { title: "Infrastructure management", description: "Day-to-day operation of servers, network and infrastructure." },
    { title: "Asset lifecycle management", description: "Tracking hardware and software from deployment through retirement." },
    { title: "Reporting & optimization", description: "Regular reporting to inform ongoing infrastructure decisions." },
  ],
  process: [
    { number: "01", title: "Assess", description: "Review current IT operations, tooling and pain points." },
    { number: "02", title: "Architect", description: "Design the managed services model, fully managed or co-managed." },
    { number: "03", title: "Migrate", description: "Onboard monitoring, helpdesk and management processes into your environment." },
    { number: "04", title: "Optimize", description: "Continuously refine based on reporting and evolving needs." },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Fully managed or co-managed, which is right for us?",
      answer:
        "It depends on the size and maturity of your internal IT team. We can take full operational ownership, or work alongside your existing team on specific functions.",
    },
    {
      question: "How is support structured?",
      answer:
        "Support is delivered through a 24/7 NOC and helpdesk, with defined escalation paths for infrastructure issues.",
    },
  ],
  seo: {
    title: "Managed IT Services",
    description:
      "24/7 NOC, helpdesk, proactive monitoring, patch management, infrastructure management and asset lifecycle, delivered as one accountable managed IT service.",
  },
};
