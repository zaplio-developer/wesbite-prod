import { useId } from "react";
import type { CalculatorInputs, Currency } from "./calculation-engine";

type Props = {
  values: CalculatorInputs;
  onChange: (values: CalculatorInputs) => void;
};

const currencies: Currency[] = ["USD", "EUR", "GBP", "INR"];

export function CalculatorInputsForm({ values, onChange }: Props) {
  function update<K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) {
    onChange({ ...values, [key]: value });
  }

  const mixTotal = values.refactorPct + values.replatformPct + values.retirePct;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Annual on-prem infrastructure spend"
          value={values.annualOnPremSpend}
          onChange={(v) => update("annualOnPremSpend", v)}
          min={0}
        />
        <NumberField
          label="Applications in scope"
          value={values.appCount}
          onChange={(v) => update("appCount", v)}
          min={1}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Migration timeline (months)"
          value={values.timelineMonths}
          onChange={(v) => update("timelineMonths", v)}
          min={1}
        />
        <NumberField
          label="Parallel-run period (months)"
          value={values.parallelRunMonths}
          onChange={(v) => update("parallelRunMonths", v)}
          min={0}
        />
      </div>

      <div>
        <label htmlFor="currency" className="text-sm font-medium text-foreground">
          Currency
        </label>
        <select
          id="currency"
          value={values.currency}
          onChange={(e) => update("currency", e.target.value as Currency)}
          className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:w-40"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground">
          Migration approach mix{" "}
          <span className={mixTotal === 100 ? "text-muted" : "text-amber-400"}>
            ({mixTotal}% of 100%)
          </span>
        </p>
        <div className="mt-3 grid gap-5 sm:grid-cols-3">
          <NumberField
            label="Refactor %"
            value={values.refactorPct}
            onChange={(v) => update("refactorPct", v)}
            min={0}
            max={100}
          />
          <NumberField
            label="Replatform %"
            value={values.replatformPct}
            onChange={(v) => update("replatformPct", v)}
            min={0}
            max={100}
          />
          <NumberField
            label="Lift-and-shift / retire %"
            value={values.retirePct}
            onChange={(v) => update("retirePct", v)}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={Number.isNaN(value) ? "" : value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}
