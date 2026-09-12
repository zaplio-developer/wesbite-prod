import type { Metadata } from "next";
import { getAllArticles, getAllCategories } from "@/lib/articles";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ArticleCard } from "@/components/cards/ArticleCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description: "Insights on cloud, cybersecurity, managed IT and infrastructure strategy from Zaplio.",
};

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allArticles = getAllArticles();
  const categories = getAllCategories();
  const articles = category
    ? allArticles.filter((article) => article.category.toLowerCase() === category.toLowerCase())
    : allArticles;

  return (
    <>
      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }]} />
      </Section>

      <Section className="pt-6">
        <Eyebrow>Insights</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          Practical thinking on cloud, security and infrastructure strategy.
        </Heading>
      </Section>

      <Section className="border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Link href="/resources">
            <Badge className={!category ? "border-accent text-foreground" : undefined}>All</Badge>
          </Link>
          {categories.map((item) => (
            <Link key={item} href={`/resources?category=${encodeURIComponent(item)}`}>
              <Badge
                className={
                  category?.toLowerCase() === item.toLowerCase()
                    ? "border-accent text-foreground"
                    : undefined
                }
              >
                {item}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
          {articles.length === 0 && (
            <p className="text-sm text-muted">No articles in this category yet.</p>
          )}
        </div>
      </Section>
    </>
  );
}
