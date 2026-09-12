export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items?: NavItem[];
};

export const siteConfig = {
  name: "Zaplio",
  eyebrow: "Enterprise IT Infrastructure Partner",
  description:
    "Cloud, cybersecurity, networking and managed IT — designed, delivered and operated as one integrated infrastructure platform.",
  // TODO: confirm production URL before launch.
  url: "https://zaplio.io",
  primaryCta: {
    label: "Talk to an Expert",
    href: "/contact",
  },
  secondaryCta: {
    label: "Explore Services",
    href: "/services",
  },
} as const;

export const mainNav: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "Cybersecurity Services", href: "/cybersecurity-services" },
      { label: "Cloud & Data Center", href: "/cloud-data-center-services" },
      { label: "Network Transformation", href: "/network-transformation" },
      { label: "Digital Workplace", href: "/digital-workplace" },
      { label: "Managed IT Services", href: "/managed-it-services" },
      { label: "Professional Services", href: "/professional-services" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Retail & E-commerce", href: "/industries/retail-ecommerce" },
      { label: "Technology & SaaS", href: "/industries/technology-saas" },
      { label: "Public Sector", href: "/industries/public-sector" },
    ],
  },
  { label: "Partners", href: "/our-partners" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "PRAXIS", href: "/praxis" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavGroup[] = [
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "Cybersecurity Services", href: "/cybersecurity-services" },
      { label: "Cloud & Data Center", href: "/cloud-data-center-services" },
      { label: "Network Transformation", href: "/network-transformation" },
      { label: "Digital Workplace", href: "/digital-workplace" },
      { label: "Managed IT Services", href: "/managed-it-services" },
      { label: "Professional Services", href: "/professional-services" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    items: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/our-partners" },
      { label: "PRAXIS", href: "/praxis" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Insights", href: "/resources" },
      { label: "Cloud Migration Calculator", href: "/cloud-migration-cost-calculator" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];
