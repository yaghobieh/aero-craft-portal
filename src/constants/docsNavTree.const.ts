export type DocsNavNode = {
  id: string;
  path?: string;
  children?: DocsNavNode[];
};

export const DOCS_NAV_TREE: DocsNavNode[] = [
  {
    id: 'getting-started',
    children: [
      { id: 'getting-started/frameworks', path: 'getting-started/frameworks' },
      { id: 'getting-started/import-css', path: 'getting-started/import-css' },
      { id: 'getting-started/postcss', path: 'getting-started/postcss' },
      { id: 'getting-started/cli', path: 'getting-started/cli' },
      { id: 'getting-started/cursor-plugin', path: 'getting-started/cursor-plugin' },
      { id: 'getting-started/upgrade-guide', path: 'getting-started/upgrade-guide' },
    ],
  },
  {
    id: 'core-concepts',
    children: [
      { id: 'core-concepts/dark-mode', path: 'core-concepts/dark-mode' },
      { id: 'core-concepts/responsive', path: 'core-concepts/responsive' },
      { id: 'core-concepts/colors', path: 'core-concepts/colors' },
      { id: 'core-concepts/brand-palette', path: 'core-concepts/brand-palette' },
      { id: 'core-concepts/fonts', path: 'core-concepts/fonts' },
      { id: 'core-concepts/apply', path: 'core-concepts/apply' },
      { id: 'core-concepts/override-ui', path: 'core-concepts/override-ui' },
      { id: 'core-concepts/bundle-size', path: 'core-concepts/bundle-size' },
      { id: 'core-concepts/advantages', path: 'core-concepts/advantages' },
      { id: 'core-concepts/custom-styling', path: 'core-concepts/custom-styling' },
      { id: 'core-concepts/functions', path: 'core-concepts/functions' },
      { id: 'core-concepts/states', path: 'core-concepts/states' },
    ],
  },
  {
    id: 'reference',
    path: 'reference',
    children: [
      { id: 'reference/flex', path: 'reference/flex' },
      { id: 'reference/flex-direction', path: 'reference/flex-direction' },
      { id: 'reference/flex-wrap', path: 'reference/flex-wrap' },
      { id: 'reference/flex-basis', path: 'reference/flex-basis' },
      { id: 'reference/flex-grow', path: 'reference/flex-grow' },
      { id: 'reference/flex-shrink', path: 'reference/flex-shrink' },
      { id: 'reference/order', path: 'reference/order' },
      { id: 'reference/justify-content', path: 'reference/justify-content' },
      { id: 'reference/align-items', path: 'reference/align-items' },
      { id: 'reference/align-self', path: 'reference/align-self' },
      { id: 'reference/align-content', path: 'reference/align-content' },
      { id: 'reference/gap', path: 'reference/gap' },
      { id: 'reference/grid-template-columns', path: 'reference/grid-template-columns' },
      { id: 'reference/grid-column', path: 'reference/grid-column' },
      { id: 'reference/grid-template-rows', path: 'reference/grid-template-rows' },
      { id: 'reference/grid-row', path: 'reference/grid-row' },
      { id: 'reference/grid-auto-flow', path: 'reference/grid-auto-flow' },
      { id: 'reference/grid-auto-columns', path: 'reference/grid-auto-columns' },
      { id: 'reference/grid-auto-rows', path: 'reference/grid-auto-rows' },
      { id: 'reference/justify-items', path: 'reference/justify-items' },
      { id: 'reference/justify-self', path: 'reference/justify-self' },
      { id: 'reference/place-content', path: 'reference/place-content' },
      { id: 'reference/place-items', path: 'reference/place-items' },
      { id: 'reference/place-self', path: 'reference/place-self' },
      { id: 'reference/width', path: 'reference/width' },
      { id: 'reference/min-width', path: 'reference/min-width' },
      { id: 'reference/max-width', path: 'reference/max-width' },
      { id: 'reference/height', path: 'reference/height' },
      { id: 'reference/min-height', path: 'reference/min-height' },
      { id: 'reference/max-height', path: 'reference/max-height' },
      { id: 'reference/size', path: 'reference/size' },
    ],
  },
];

export type SearchNavItem = { href: string; label: string; group: string };

const SEARCH_ROOT_PATHS = ['getting-started', 'core-concepts', 'reference'] as const;

export function flattenDocsNavForSearch(
  labelResolver: (path: string) => string,
): SearchNavItem[] {
  const acc: SearchNavItem[] = [];
  for (const root of SEARCH_ROOT_PATHS) {
    acc.push({ href: `/docs/${root}`, label: labelResolver(root), group: 'Docs' });
  }
  for (const section of DOCS_NAV_TREE) {
    const sectionLabel = labelResolver(section.id);
    if (!section.children) continue;
    for (const leaf of section.children) {
      if (leaf.path) {
        acc.push({
          href: `/docs/${leaf.path}`,
          label: labelResolver(leaf.path),
          group: sectionLabel,
        });
      }
    }
  }
  return acc;
}
