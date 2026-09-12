import { describe, expect, it } from "vitest";
import { formatDate } from "./format-date";

describe("formatDate", () => {
  it("formats an ISO date as a long-form US date", () => {
    expect(formatDate("2026-02-07")).toBe("February 7, 2026");
  });
});
