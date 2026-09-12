import type { Service } from "../types";

export const networkTransformation: Service = {
  slug: "network-transformation",
  name: "Network Transformation",
  eyebrow: "Network Transformation",
  title: "Networking built for how the business actually works.",
  description:
    "SD-WAN, secure Wi-Fi and campus/edge networking designed for reliable, secure connectivity across every location.",
  benefits: [
    {
      title: "Reliable connectivity",
      description: "Network architecture designed around how your locations and users actually connect.",
    },
    {
      title: "Built-in security",
      description: "Secure Wi-Fi and network segmentation as part of the design, not an add-on.",
    },
    {
      title: "Simplified management",
      description: "SD-WAN reduces the operational overhead of managing distributed connectivity.",
    },
    {
      title: "Scales with the business",
      description: "Campus and edge networking designed to extend as locations and users grow.",
    },
  ],
  capabilities: [
    { title: "SD-WAN", description: "Software-defined wide area networking for centralized, flexible connectivity." },
    { title: "Secure Wi-Fi", description: "Wireless network design with security built in from the start." },
    { title: "Campus & edge networking", description: "Network architecture for offices, campuses and edge locations." },
    { title: "Connectivity", description: "End-to-end design and management of network connectivity." },
  ],
  process: [
    { number: "01", title: "Assess", description: "Review current network architecture and connectivity requirements." },
    { number: "02", title: "Architect", description: "Design the target network topology, including SD-WAN and Wi-Fi." },
    { number: "03", title: "Migrate", description: "Roll out the new network in phases to minimize disruption." },
    { number: "04", title: "Optimize", description: "Monitor and tune network performance post-deployment." },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Can this be rolled out across multiple locations without downtime?",
      answer:
        "Network transformation is typically phased by location or site, so connectivity is validated before cutover at each location.",
    },
  ],
  seo: {
    title: "Network Transformation",
    description:
      "SD-WAN, secure Wi-Fi and campus/edge networking designed and delivered as part of one integrated infrastructure partnership.",
  },
};
