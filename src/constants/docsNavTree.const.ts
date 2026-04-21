import { PORTAL_CATEGORIES } from './portalCategories.const';

export type DocsNavNode = {
  id: string;
  path?: string;
  children?: DocsNavNode[];
};

const REFERENCE_CATEGORY_CHILDREN: DocsNavNode[] = PORTAL_CATEGORIES.map((cat) => ({
  id: `reference/cat/${cat.id}`,
  children: cat.properties.map((prop) => ({
    id: `reference/${prop}`,
    path: `reference/${prop}`,
  })),
}));

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
      { id: 'core-concepts/theme', path: 'core-concepts/theme' },
      { id: 'core-concepts/responsive', path: 'core-concepts/responsive' },
      { id: 'core-concepts/colors', path: 'core-concepts/colors' },
      { id: 'core-concepts/brand-palette', path: 'core-concepts/brand-palette' },
      { id: 'core-concepts/fonts', path: 'core-concepts/fonts' },
      { id: 'core-concepts/apply', path: 'core-concepts/apply' },
      { id: 'core-concepts/override-ui', path: 'core-concepts/override-ui' },
      { id: 'core-concepts/use-with-mui', path: 'core-concepts/use-with-mui' },
      { id: 'core-concepts/use-with-bear', path: 'core-concepts/use-with-bear' },
      { id: 'core-concepts/bundle-size', path: 'core-concepts/bundle-size' },
      { id: 'core-concepts/advantages', path: 'core-concepts/advantages' },
      { id: 'core-concepts/custom-styling', path: 'core-concepts/custom-styling' },
      { id: 'core-concepts/functions', path: 'core-concepts/functions' },
      { id: 'core-concepts/states', path: 'core-concepts/states' },
    ],
  },
  {
    id: 'recipes',
    path: 'recipes',
    children: [
      { id: 'recipes/button', path: 'recipes/button' },
      { id: 'recipes/card', path: 'recipes/card' },
      { id: 'recipes/grid', path: 'recipes/grid' },
      { id: 'recipes/navbar', path: 'recipes/navbar' },
      { id: 'recipes/form', path: 'recipes/form' },
      { id: 'recipes/mobile-menu', path: 'recipes/mobile-menu' },
      { id: 'recipes/feature-list', path: 'recipes/feature-list' },
      { id: 'recipes/pricing', path: 'recipes/pricing' },
    ],
  },
  {
    id: 'reference',
    path: 'reference',
    children: REFERENCE_CATEGORY_CHILDREN,
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
      if (leaf.children) {
        for (const child of leaf.children) {
          if (child.path) {
            acc.push({
              href: `/docs/${child.path}`,
              label: labelResolver(child.path),
              group: labelResolver(leaf.id),
            });
          }
        }
      } else if (leaf.path) {
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
