import { cn } from "@/lib/cn";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
