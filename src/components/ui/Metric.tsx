export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-semibold text-foreground sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
