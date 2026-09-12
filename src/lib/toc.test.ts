import { describe, expect, it } from "vitest";
import { extractToc } from "./toc";

describe("extractToc", () => {
  it("extracts h2 and h3 headings only", () => {
    const markdown = `# Title\n\n## First section\n\nSome text.\n\n### A subsection\n\nMore text.\n\n#### Too deep\n`;
    const toc = extractToc(markdown);

    expect(toc).toEqual([
      { id: "first-section", text: "First section", depth: 2 },
      { id: "a-subsection", text: "A subsection", depth: 3 },
    ]);
  });

  it("returns an empty array when there are no headings", () => {
    expect(extractToc("Just a paragraph, no headings.")).toEqual([]);
  });

  it("de-duplicates slugs the same way rehype-slug does", () => {
    const markdown = `## Overview\n\n## Overview\n`;
    const toc = extractToc(markdown);
    expect(toc[0].id).toBe("overview");
    expect(toc[1].id).toBe("overview-1");
  });
});
