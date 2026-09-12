import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { ArticlePageTemplate } from "@/components/blog/ArticlePageTemplate";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
  };
}

export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return <ArticlePageTemplate article={article} />;
}
