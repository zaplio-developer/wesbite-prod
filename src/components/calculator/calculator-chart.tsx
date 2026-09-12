import type { CostCategory, Currency } from "./calculation-engine";
import { formatCurrency } from "./calculation-engine";

export function CalculatorChart({
  categories,
  currency,
}: {
  categories: CostCategory[];
  currency: Currency;
}) {
  const max = Math.max(...categories.map((c) => c.amount), 1);

  return (
    <div className="flex flex-col gap-4">
      {categories.map((category) => (
        <div key={category.key}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-foreground">{category.label}</span>
            <span className="text-muted">{formatCurrency(category.amount, currency)}</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-background">
            <div
              className="h-2 rounded-full bg-accent"
              style={{ width: `${Math.max(4, (category.amount / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
