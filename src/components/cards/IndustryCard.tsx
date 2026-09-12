import Link from "next/link";
import type { Industry } from "@/content/types";
import { Card } from "@/components/ui/Card";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {industry.eyebrow}
        </p>
        <h3 className="mt-3 text-lg font-semibold text-foreground">{industry.name}</h3>
        <p className="mt-2 text-sm text-muted">{industry.description}</p>
      </div>
      <Link
        href={`/industries/${industry.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
      >
        Explore industry &rarr;
      </Link>
    </Card>
  );
}
