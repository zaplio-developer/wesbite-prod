import type { CalculatorResults, Currency } from "./calculation-engine";
import { formatCurrency } from "./calculation-engine";
import { Metric } from "@/components/ui/Metric";
import { CalculatorChart } from "./calculator-chart";

export function CalculatorResultsPanel({
  results,
  currency,
}: {
  results: CalculatorResults;
  currency: Currency;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-muted">Estimated total migration investment</p>
        <p className="mt-1 text-4xl font-semibold text-foreground">
          {formatCurrency(results.totalMid, currency)}
        </p>
        <p className="mt-1 text-sm text-muted">
          Range: {formatCurrency(results.totalLow, currency)} –{" "}
          {formatCurrency(results.totalHigh, currency)}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Metric
          value={`${results.migrationToOpexRatio.toFixed(2)}x`}
          label="Migration-to-OPEX ratio"
        />
        <Metric
          value={formatCurrency(results.contingency, currency)}
          label="Contingency buffer"
        />
        <Metric
          value={formatCurrency(results.monthlyRunRate, currency)}
          label="Monthly run rate during migration"
        />
        <Metric
          value={formatCurrency(results.costPerApplication, currency)}
          label="Cost per application"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Cost breakdown</p>
        <div className="mt-4">
          <CalculatorChart categories={results.categories} currency={currency} />
        </div>
      </div>
    </div>
  );
}
