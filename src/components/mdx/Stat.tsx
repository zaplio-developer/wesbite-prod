export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="my-6 inline-flex flex-col rounded-lg border border-border bg-surface px-5 py-4">
      <span className="text-2xl font-semibold text-foreground">{value}</span>
      <span className="mt-1 text-sm text-muted">{label}</span>
    </div>
  );
}
