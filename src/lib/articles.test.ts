import { describe, expect, it } from "vitest";
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getAllCategories,
  getRelatedArticles,
} from "./articles";

describe("articles", () => {
  it("loads at least the seeded articles", () => {
    const articles = getAllArticles();
    expect(articles.length).toBeGreaterThanOrEqual(3);
  });

  it("sorts articles by publish date, most recent first", () => {
    const articles = getAllArticles();
    for (let i = 1; i < articles.length; i++) {
      const prev = new Date(articles[i - 1].publishedAt).getTime();
      const curr = new Date(articles[i].publishedAt).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("every article has a positive reading time", () => {
    for (const article of getAllArticles()) {
      expect(article.readingTimeMinutes).toBeGreaterThanOrEqual(1);
    }
  });

  it("finds a known seeded article by slug", () => {
    const article = getArticleBySlug(
      "how-infrastructure-modernization-reduces-long-term-cloud-costs",
    );
    expect(article).toBeDefined();
    expect(article?.title).toContain("Infrastructure Modernization");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getArticleBySlug("does-not-exist")).toBeUndefined();
  });

  it("filters by category case-insensitively", () => {
    const categories = getAllCategories();
    expect(categories.length).toBeGreaterThan(0);
    const [firstCategory] = categories;
    const lower = getArticlesByCategory(firstCategory.toLowerCase());
    const upper = getArticlesByCategory(firstCategory.toUpperCase());
    expect(lower.length).toBe(upper.length);
    expect(lower.length).toBeGreaterThan(0);
  });

  it("related articles never include the source article itself", () => {
    const article = getArticleBySlug(
      "how-infrastructure-modernization-reduces-long-term-cloud-costs",
    )!;
    const related = getRelatedArticles(article);
    expect(related.every((r) => r.slug !== article.slug)).toBe(true);
  });
});
