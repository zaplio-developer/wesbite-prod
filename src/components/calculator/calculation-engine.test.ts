import { describe, expect, it } from "vitest";
import { calculateMigrationCost, clampPercent, formatCurrency } from "./calculation-engine";

describe("clampPercent", () => {
  it("clamps below 0 to 0", () => {
    expect(clampPercent(-10)).toBe(0);
  });

  it("clamps above 100 to 100", () => {
    expect(clampPercent(150)).toBe(100);
  });

  it("passes through valid values", () => {
    expect(clampPercent(42)).toBe(42);
  });

  it("treats NaN as 0", () => {
    expect(clampPercent(NaN)).toBe(0);
  });
});

describe("calculateMigrationCost", () => {
  const baseInputs = {
    annualOnPremSpend: 1_200_000,
    appCount: 30,
    timelineMonths: 12,
    refactorPct: 20,
    replatformPct: 30,
    retirePct: 50,
    parallelRunMonths: 2,
    currency: "USD" as const,
  };

  it("produces a positive total investment", () => {
    const results = calculateMigrationCost(baseInputs);
    expect(results.totalMid).toBeGreaterThan(0);
  });

  it("orders low <= mid <= high", () => {
    const results = calculateMigrationCost(baseInputs);
    expect(results.totalLow).toBeLessThanOrEqual(results.totalMid);
    expect(results.totalMid).toBeLessThanOrEqual(results.totalHigh);
  });

  it("cost categories sum to the mid total", () => {
    const results = calculateMigrationCost(baseInputs);
    const sum = results.categories.reduce((acc, c) => acc + c.amount, 0);
    expect(sum).toBeCloseTo(results.totalMid, 5);
  });

  it("scales cost per application with app count", () => {
    const fewApps = calculateMigrationCost({ ...baseInputs, appCount: 10 });
    const moreApps = calculateMigrationCost({ ...baseInputs, appCount: 100 });
    // Same total spend spread over more apps should reduce cost per app.
    expect(moreApps.costPerApplication).toBeLessThan(fewApps.costPerApplication);
  });

  it("a full refactor mix costs more than a full retire mix, all else equal", () => {
    const allRefactor = calculateMigrationCost({
      ...baseInputs,
      refactorPct: 100,
      replatformPct: 0,
      retirePct: 0,
    });
    const allRetire = calculateMigrationCost({
      ...baseInputs,
      refactorPct: 0,
      replatformPct: 0,
      retirePct: 100,
    });
    expect(allRefactor.totalMid).toBeGreaterThan(allRetire.totalMid);
  });

  it("does not divide by zero when appCount is 0", () => {
    const results = calculateMigrationCost({ ...baseInputs, appCount: 0 });
    expect(Number.isFinite(results.costPerApplication)).toBe(true);
  });

  it("migration-to-OPEX ratio is 0 when annual spend is 0", () => {
    const results = calculateMigrationCost({ ...baseInputs, annualOnPremSpend: 0 });
    expect(results.migrationToOpexRatio).toBe(0);
  });
});

describe("formatCurrency", () => {
  it("formats USD with no decimal places", () => {
    expect(formatCurrency(1234, "USD")).toBe("$1,234");
  });

  it("formats different currencies with their own symbol", () => {
    expect(formatCurrency(1000, "EUR")).toContain("1,000");
  });
});
