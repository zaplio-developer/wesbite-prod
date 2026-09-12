import Link from "next/link";
import type { Article } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format-date";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <Badge>{article.category}</Badge>
        <h3 className="mt-3 text-lg font-semibold text-foreground">
          <Link href={`/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs text-muted">
        <span>{article.author}</span>
        <span>
          {formatDate(article.publishedAt)} &middot; {article.readingTimeMinutes} min read
        </span>
      </div>
    </Card>
  );
}
