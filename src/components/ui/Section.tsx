import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function Section({
  className,
  containerClassName,
  reveal = true,
  children,
}: {
  className?: string;
  containerClassName?: string;
  reveal?: boolean;
  children: React.ReactNode;
}) {
  const content = <Container className={containerClassName}>{children}</Container>;

  return (
    <section className={cn("py-16 sm:py-24", className)}>
      {reveal ? <Reveal>{content}</Reveal> : content}
    </section>
  );
}
