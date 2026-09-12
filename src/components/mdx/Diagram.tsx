export function Diagram({
  caption,
  children,
}: {
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-6 rounded-lg border border-border bg-surface p-6">
      <div className="overflow-x-auto text-sm text-foreground">{children}</div>
      {caption && (
        <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
