import type { Industry } from "../types";

export const healthcare: Industry = {
  slug: "healthcare",
  name: "Healthcare",
  eyebrow: "Healthcare",
  title: "Infrastructure that protects patient data and stays available.",
  description:
    "Healthcare infrastructure has to protect sensitive patient data while staying available for care delivery around the clock. We build and manage infrastructure with both requirements as first-class priorities.",
  challenges: [
    { title: "Sensitive data protection", description: "Patient data requires strong, consistently enforced access controls." },
    { title: "Uptime for care delivery", description: "Clinical and operational systems need to stay available continuously." },
    { title: "Connected medical devices", description: "Networked devices expand the infrastructure surface that needs to be secured." },
    { title: "Distributed care sites", description: "Multiple facilities need consistent infrastructure and security posture." },
  ],
  priorities: [
    { title: "Data protection", description: "Access controls and monitoring built around sensitive patient data." },
    { title: "High availability", description: "Infrastructure designed to minimize disruption to care delivery." },
    { title: "Network segmentation", description: "Isolating clinical, administrative and device networks appropriately." },
    { title: "Consistent multi-site operations", description: "The same infrastructure standards applied across every facility." },
  ],
  relatedServiceSlugs: ["cybersecurity-services", "managed-it-services", "network-transformation"],
  compliance: [
    {
      title: "Patient data access controls",
      description: "Infrastructure designed around strict, auditable access to sensitive health data.",
    },
    {
      title: "Network segmentation",
      description: "Clinical systems, administrative systems and medical devices isolated appropriately.",
    },
  ],
  outcomes: [],
  faqs: [
    {
      question: "How do you handle connected medical devices on the network?",
      answer:
        "We assess device connectivity as part of the network architecture and apply segmentation appropriate to the risk each device category presents.",
    },
  ],
  seo: {
    title: "Infrastructure for Healthcare",
    description:
      "Enterprise IT infrastructure for healthcare organizations — built for data protection and continuous availability.",
  },
};
