import { describe, expect, it } from "vitest";
import { industries, getIndustryBySlug } from "./index";
import { getServiceBySlug } from "../services";

describe("industries content", () => {
  it("has exactly the six expected industries", () => {
    expect(industries).toHaveLength(6);
  });

  it("has unique slugs", () => {
    const slugs = industries.map((i) => i.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every related service slug points to a real service", () => {
    for (const industry of industries) {
      for (const slug of industry.relatedServiceSlugs) {
        expect(getServiceBySlug(slug), `${industry.slug} references unknown service ${slug}`).toBeDefined();
      }
    }
  });

  it("getIndustryBySlug resolves a known slug and rejects an unknown one", () => {
    expect(getIndustryBySlug("healthcare")).toBeDefined();
    expect(getIndustryBySlug("not-a-real-industry")).toBeUndefined();
  });
});
