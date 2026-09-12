"use client";

import { useMemo, useState } from "react";
import type { CalculatorInputs } from "./calculation-engine";
import { calculateMigrationCost } from "./calculation-engine";
import { CalculatorInputsForm } from "./calculator-inputs";
import { CalculatorResultsPanel } from "./calculator-results";
import { Card } from "@/components/ui/Card";

const defaultInputs: CalculatorInputs = {
  annualOnPremSpend: 2_000_000,
  appCount: 40,
  timelineMonths: 12,
  refactorPct: 20,
  replatformPct: 40,
  retirePct: 40,
  parallelRunMonths: 2,
  currency: "USD",
};

export function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const results = useMemo(() => calculateMigrationCost(inputs), [inputs]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CalculatorInputsForm values={inputs} onChange={setInputs} />
      </Card>
      <Card>
        <CalculatorResultsPanel results={results} currency={inputs.currency} />
      </Card>
    </div>
  );
}
