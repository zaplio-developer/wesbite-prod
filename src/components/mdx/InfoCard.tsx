export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-lg border border-border bg-surface p-5">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="mt-2 text-sm text-muted">{children}</div>
    </div>
  );
}
