import { cn } from "@/lib/cn";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
};

const sizes: Record<NonNullable<HeadingProps["size"]>, string> = {
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-5xl",
  xl: "text-4xl sm:text-6xl",
};

export function Heading({ as = "h2", size = "lg", className, children }: HeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "font-semibold tracking-tight text-balance text-foreground",
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
