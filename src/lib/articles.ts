import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, ArticleFrontmatter } from "@/content/types";

const ARTICLES_DIR = path.join(process.cwd(), "src", "content", "articles");

let cachedArticles: Article[] | null = null;

function loadArticles(): Article[] {
  if (cachedArticles) return cachedArticles;

  const files = fs.existsSync(ARTICLES_DIR)
    ? fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith(".mdx"))
    : [];

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as ArticleFrontmatter;

    return {
      ...frontmatter,
      slug,
      content,
      readingTimeMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
    } satisfies Article;
  });

  articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  cachedArticles = articles;
  return articles;
}

export function getAllArticles(): Article[] {
  return loadArticles();
}

export function getArticleBySlug(slug: string): Article | undefined {
  return loadArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return loadArticles().filter(
    (article) => article.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getAllCategories(): string[] {
  const categories = new Set(loadArticles().map((article) => article.category));
  return Array.from(categories);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const explicit = (article.relatedArticleSlugs ?? [])
    .map((slug) => getArticleBySlug(slug))
    .filter((related): related is Article => Boolean(related));

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const sameCategory = loadArticles().filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      candidate.category === article.category &&
      !explicit.some((e) => e.slug === candidate.slug),
  );

  return [...explicit, ...sameCategory].slice(0, limit);
}
