import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Article } from "@/content/types";
import { getServiceBySlug } from "@/content/services";
import { getRelatedArticles } from "@/lib/articles";
import { extractToc } from "@/lib/toc";
import { formatDate } from "@/lib/format-date";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { mdxComponents } from "@/components/mdx";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, articleSchema } from "@/lib/structured-data";

export function ArticlePageTemplate({ article }: { article: Article }) {
  const toc = extractToc(article.content);
  const relatedArticles = getRelatedArticles(article);
  const relatedServices = (article.relatedServiceSlugs ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: article.title, href: `/${article.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={articleSchema(article)} />

      <Section className="pb-0 pt-10 sm:pt-12">
        <Breadcrumbs items={breadcrumbItems} />
      </Section>

      <Section className="pt-6">
        <Badge>{article.category}</Badge>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
          {article.title}
        </Heading>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{article.author}</span>
          <span aria-hidden="true">&middot;</span>
          <span>Published {formatDate(article.publishedAt)}</span>
          {article.updatedAt && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>Updated {formatDate(article.updatedAt)}</span>
            </>
          )}
          <span aria-hidden="true">&middot;</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <article className="prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>
      </Section>

      {relatedServices.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Related services
          </Heading>
          <div className="mt-6 flex flex-wrap gap-3">
            {relatedServices.map((service) => (
              <LinkButton key={service.slug} href={`/${service.slug}`} variant="secondary">
                {service.name}
              </LinkButton>
            ))}
          </div>
        </Section>
      )}

      {relatedArticles.length > 0 && (
        <Section className="border-t border-border">
          <Heading as="h2" size="md">
            Related articles
          </Heading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-border">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:items-center">
          <div>
            <Heading as="h2" size="sm">
              Ready to talk through your infrastructure?
            </Heading>
            <p className="mt-2 text-sm text-muted">
              Start with an infrastructure assessment tailored to your environment.
            </p>
          </div>
          <LinkButton href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
