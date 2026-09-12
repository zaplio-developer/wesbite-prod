import type { Service } from "../types";

export const cybersecurityServices: Service = {
  slug: "cybersecurity-services",
  name: "Cybersecurity Services",
  eyebrow: "Cybersecurity",
  title: "Security operations built for enterprise infrastructure.",
  description:
    "24/7 security operations, threat intelligence and compliance support designed to protect enterprise infrastructure end to end — not just the perimeter.",
  benefits: [
    {
      title: "Continuous visibility",
      description: "24/7 SOC monitoring across your infrastructure, not business-hours coverage.",
    },
    {
      title: "Proactive risk reduction",
      description: "Ongoing vulnerability management instead of periodic point-in-time scans.",
    },
    {
      title: "Faster response",
      description: "A dedicated incident response process so threats are contained, not just detected.",
    },
    {
      title: "One accountable partner",
      description: "Security delivered as part of your infrastructure, not a bolted-on specialist vendor.",
    },
  ],
  capabilities: [
    { title: "24/7 SOC", description: "Round-the-clock security operations center monitoring and alerting." },
    { title: "Threat intelligence", description: "Ongoing tracking of emerging threats relevant to your environment." },
    { title: "Vulnerability management", description: "Continuous scanning, prioritization and remediation guidance." },
    { title: "Identity & access management", description: "Governance over who can access what, and why." },
    { title: "Endpoint & network security", description: "Protection across devices and network boundaries." },
    { title: "Compliance & incident response", description: "Support for compliance requirements and a structured response process when incidents occur." },
  ],
  process: [
    { number: "01", title: "Assess", description: "Review your current security posture and identify priority risks." },
    { number: "02", title: "Architect", description: "Design a security approach aligned to your infrastructure and risk profile." },
    { number: "03", title: "Migrate", description: "Implement monitoring, controls and processes into your environment." },
    { number: "04", title: "Optimize", description: "Continuously tune detection and response as your environment evolves." },
  ],
  outcomes: [],
  faqs: [
    {
      question: "How do you approach a new security engagement?",
      answer:
        "We start with an assessment of your current environment — infrastructure, identity, endpoints and existing controls — to identify the highest-priority risks before recommending an approach.",
    },
    {
      question: "Does this replace our internal IT/security team?",
      answer:
        "No. We work alongside internal teams, taking on the operational load of continuous monitoring and response so your team can focus on higher-value work.",
    },
  ],
  seo: {
    title: "Cybersecurity Services",
    description:
      "24/7 SOC, threat intelligence, vulnerability management, IAM, endpoint security, compliance and incident response — delivered as part of one integrated infrastructure partnership.",
  },
};
