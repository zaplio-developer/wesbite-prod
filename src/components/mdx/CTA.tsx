import { LinkButton } from "@/components/ui/Button";

export function CTA({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description?: string;
  href: string;
  label: string;
}) {
  return (
    <div className="my-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:items-center">
      <div>
        <p className="text-base font-semibold text-foreground">{title}</p>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      <LinkButton href={href} className="shrink-0">
        {label}
      </LinkButton>
    </div>
  );
}
