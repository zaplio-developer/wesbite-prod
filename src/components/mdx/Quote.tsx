export function Quote({
  attribution,
  children,
}: {
  attribution?: string;
  children: React.ReactNode;
}) {
  return (
    <blockquote className="my-6 border-l-2 border-accent pl-5 text-lg text-foreground">
      <p>{children}</p>
      {attribution && <footer className="mt-2 text-sm text-muted">— {attribution}</footer>}
    </blockquote>
  );
}
