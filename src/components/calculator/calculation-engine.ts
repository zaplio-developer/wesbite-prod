export type Currency = "USD" | "EUR" | "GBP" | "INR";

export type CalculatorInputs = {
  annualOnPremSpend: number;
  appCount: number;
  timelineMonths: number;
  refactorPct: number;
  replatformPct: number;
  retirePct: number;
  parallelRunMonths: number;
  currency: Currency;
};

export type CostCategory = {
  key: string;
  label: string;
  amount: number;
};

export type CalculatorResults = {
  totalMid: number;
  totalLow: number;
  totalHigh: number;
  migrationToOpexRatio: number;
  contingency: number;
  monthlyRunRate: number;
  costPerApplication: number;
  categories: CostCategory[];
};

/**
 * Illustrative cost model, not a verified pricing benchmark. All factors below
 * are assumptions the calculator applies consistently, they exist so the tool
 * produces directionally useful, adjustable output, not a guaranteed quote.
 */
const STRATEGY_EFFORT_FACTOR = {
  refactor: 0.9,
  replatform: 0.5,
  retire: 0.2,
} as const;

const CATEGORY_SHARE = [
  { key: "infrastructure", label: "Infrastructure & compute", share: 0.35 },
  { key: "remediation", label: "Application remediation", share: 0.3 },
  { key: "tooling", label: "Tooling & professional services", share: 0.15 },
  { key: "readiness", label: "Operational readiness", share: 0.1 },
  { key: "optimization", label: "Post-migration optimization", share: 0.1 },
] as const;

const CONTINGENCY_RATE = 0.15;
const PARALLEL_RUN_OVERHEAD_RATE = 0.3;
const ESTIMATE_BAND = { low: 0.85, high: 1.2 };

export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function calculateMigrationCost(inputs: CalculatorInputs): CalculatorResults {
  const { annualOnPremSpend, appCount, timelineMonths, parallelRunMonths } = inputs;

  const safeAppCount = Math.max(1, appCount);
  const perAppSpend = annualOnPremSpend / safeAppCount;

  const refactorShare = clampPercent(inputs.refactorPct) / 100;
  const replatformShare = clampPercent(inputs.replatformPct) / 100;
  const retireShare = clampPercent(inputs.retirePct) / 100;

  const weightedEffortFactor =
    refactorShare * STRATEGY_EFFORT_FACTOR.refactor +
    replatformShare * STRATEGY_EFFORT_FACTOR.replatform +
    retireShare * STRATEGY_EFFORT_FACTOR.retire;

  const baseRemediationCost = perAppSpend * weightedEffortFactor * safeAppCount;

  const parallelRunCost =
    (annualOnPremSpend / 12) * PARALLEL_RUN_OVERHEAD_RATE * Math.max(0, parallelRunMonths);

  const subtotal = baseRemediationCost + parallelRunCost;
  const contingency = subtotal * CONTINGENCY_RATE;
  const totalMid = subtotal + contingency;

  const categories: CostCategory[] = CATEGORY_SHARE.map((category) => ({
    key: category.key,
    label: category.label,
    amount: totalMid * category.share,
  }));

  return {
    totalMid,
    totalLow: totalMid * ESTIMATE_BAND.low,
    totalHigh: totalMid * ESTIMATE_BAND.high,
    migrationToOpexRatio: annualOnPremSpend > 0 ? totalMid / annualOnPremSpend : 0,
    contingency,
    monthlyRunRate: totalMid / Math.max(1, timelineMonths),
    costPerApplication: totalMid / safeAppCount,
    categories,
  };
}

export function formatCurrency(value: number, currency: Currency): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
