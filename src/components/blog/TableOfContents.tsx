import type { TocEntry } from "@/lib/toc";
import { cn } from "@/lib/cn";

export function TableOfContents({ items }: { items: TocEntry[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-lg border border-border bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        On this page
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-sm text-muted hover:text-foreground",
                item.depth === 3 && "pl-4",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
