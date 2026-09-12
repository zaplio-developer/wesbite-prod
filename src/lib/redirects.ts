/**
 * Explicit 301 redirect map for any URL that changes during migration.
 * Add an entry here whenever a route from the live zaplio.io site is renamed;
 * never remove an indexed page without a redirect decision recorded here.
 */
export const redirects: { source: string; destination: string; permanent: boolean }[] = [
  // Example: { source: "/old-path", destination: "/new-path", permanent: true },
];
