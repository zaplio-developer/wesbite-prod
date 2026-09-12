import type { Service } from "../types";

export const cloudDataCenterServices: Service = {
  slug: "cloud-data-center-services",
  name: "Cloud & Data Center",
  eyebrow: "Cloud & Data Center",
  title: "Cloud and data center infrastructure, modernized.",
  description:
    "Migration, hybrid and multi-cloud architecture, and data-center modernization, planned and operated as one program, not a series of disconnected projects.",
  benefits: [
    {
      title: "Lower long-term cost",
      description: "Infrastructure sized and architected for actual workload needs, not overprovisioned defaults.",
    },
    {
      title: "Flexibility",
      description: "Hybrid and multi-cloud architecture that avoids single-vendor lock-in.",
    },
    {
      title: "Resilience",
      description: "Backup and disaster recovery built into the architecture from the start.",
    },
    {
      title: "Modernized foundation",
      description: "Legacy data center infrastructure brought up to a current, supportable standard.",
    },
  ],
  capabilities: [
    { title: "Cloud migration", description: "Planning and executing moves from on-prem to cloud with minimal disruption." },
    { title: "Hybrid & multi-cloud", description: "Architecture that spans on-prem and multiple cloud providers where it makes sense." },
    { title: "Virtualization & containers", description: "Modern compute platforms for flexibility and portability." },
    { title: "Backup & disaster recovery", description: "Recovery planning built into the infrastructure, not an afterthought." },
    { title: "Cost optimization", description: "Ongoing review of cloud spend against actual usage." },
    { title: "Data-center modernization", description: "Upgrading legacy on-prem infrastructure where cloud migration isn't the right fit." },
  ],
  process: [
    { number: "01", title: "Assess", description: "Inventory current infrastructure, workloads and dependencies." },
    { number: "02", title: "Architect", description: "Design the target cloud, hybrid or data-center architecture." },
    { number: "03", title: "Migrate", description: "Execute the migration in planned phases to minimize disruption." },
    { number: "04", title: "Optimize", description: "Tune performance and cost once workloads are running in production." },
  ],
  outcomes: [],
  faqs: [
    {
      question: "Do we need to migrate everything to the cloud?",
      answer:
        "No. We assess each workload on its own merits, some are strong candidates for cloud migration, others are better served by modernizing on-prem infrastructure or a hybrid approach.",
    },
    {
      question: "How do you minimize downtime during migration?",
      answer:
        "Migrations are planned in phases with a defined parallel-run period, so workloads are validated in the new environment before cutover.",
    },
  ],
  seo: {
    title: "Cloud & Data Center Services",
    description:
      "Cloud migration, hybrid and multi-cloud architecture, virtualization, backup/DR, cost optimization and data-center modernization from one integrated infrastructure partner.",
  },
};
