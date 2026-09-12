import { getAllArticles } from "../src/lib/articles";
import { prisma } from "../src/lib/prisma";

async function main() {
  const articles = getAllArticles();

  for (const article of articles) {
    await prisma.post.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        author: article.author,
        content: article.content,
        status: "PUBLISHED",
        publishedAt: new Date(article.publishedAt),
        relatedServiceSlugs: article.relatedServiceSlugs ?? [],
        relatedArticleSlugs: article.relatedArticleSlugs ?? [],
        seoTitle: article.seoTitle ?? null,
        seoDescription: article.seoDescription ?? null,
      },
    });
    console.log(`Seeded: ${article.slug}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
