import { cn } from "@/lib/cn";

type Variant = "info" | "warning";

const variants: Record<Variant, string> = {
  info: "border-accent/40 bg-accent/10",
  warning: "border-amber-500/40 bg-amber-500/10",
};

export function Callout({
  variant = "info",
  children,
}: {
  variant?: Variant;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("my-6 rounded-lg border px-5 py-4 text-sm text-foreground", variants[variant])}>
      {children}
    </div>
  );
}
