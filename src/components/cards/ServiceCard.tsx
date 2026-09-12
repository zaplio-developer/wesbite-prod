import Link from "next/link";
import type { Service } from "@/content/types";
import { Card } from "@/components/ui/Card";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {service.eyebrow}
        </p>
        <h3 className="mt-3 text-lg font-semibold text-foreground">{service.name}</h3>
        <p className="mt-2 text-sm text-muted">{service.description}</p>
        <ul className="mt-4 flex flex-col gap-1.5">
          {service.capabilities.slice(0, 3).map((capability) => (
            <li key={capability.title} className="text-sm text-foreground/80">
              &middot; {capability.title}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={`/${service.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
      >
        Explore service &rarr;
      </Link>
    </Card>
  );
}
