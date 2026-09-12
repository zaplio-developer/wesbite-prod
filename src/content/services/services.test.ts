import { describe, expect, it } from "vitest";
import { services, getServiceBySlug } from "./index";

describe("services content", () => {
  it("has exactly the six expected service lines", () => {
    expect(services).toHaveLength(6);
  });

  it("has unique slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every service has at least one benefit, capability and process step", () => {
    for (const service of services) {
      expect(service.benefits.length).toBeGreaterThan(0);
      expect(service.capabilities.length).toBeGreaterThan(0);
      expect(service.process.length).toBeGreaterThan(0);
    }
  });

  it("every service has non-empty SEO title and description", () => {
    for (const service of services) {
      expect(service.seo.title.length).toBeGreaterThan(0);
      expect(service.seo.description.length).toBeGreaterThan(0);
    }
  });

  it("getServiceBySlug resolves a known slug and rejects an unknown one", () => {
    expect(getServiceBySlug("cybersecurity-services")).toBeDefined();
    expect(getServiceBySlug("not-a-real-service")).toBeUndefined();
  });
});
