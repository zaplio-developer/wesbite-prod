export type Seo = {
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Outcome = {
  value: string;
  label: string;
};

export type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  benefits: { title: string; description: string }[];
  capabilities: { title: string; description: string }[];
  process: ProcessStep[];
  outcomes: Outcome[];
  faqs: Faq[];
  seo: Seo;
};

export type ArticleFrontmatter = {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: string;
  relatedServiceSlugs?: string[];
  relatedArticleSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
  readingTimeMinutes: number;
};

export type Industry = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  challenges: { title: string; description: string }[];
  priorities: { title: string; description: string }[];
  relatedServiceSlugs: string[];
  compliance: { title: string; description: string }[];
  outcomes: Outcome[];
  faqs: Faq[];
  seo: Seo;
};
