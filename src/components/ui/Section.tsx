import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  className,
  containerClassName,
  children,
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("py-16 sm:py-24", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
