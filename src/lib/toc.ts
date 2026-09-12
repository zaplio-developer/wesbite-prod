import GithubSlugger from "github-slugger";

export type TocEntry = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const headingPattern = /^(#{2,3})\s+(.*)$/gm;
  const entries: TocEntry[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingPattern.exec(markdown)) !== null) {
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    entries.push({ id: slugger.slug(text), text, depth });
  }

  return entries;
}
