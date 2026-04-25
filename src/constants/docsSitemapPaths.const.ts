import { GROUP_ORDER } from '@forgedevstack/aerocraft';
import { DOCS_NAV_TREE } from './docsNavTree.const';
import { GUIDE_SLUGS } from './docsGuides.const';
import { DOC_TOPIC_CATEGORIES } from './docsPropertyTopics.const';
import { DOCS_SITE_PAGES_EN } from '../i18n/docsSitePages.en';
import { REFERENCE_CATALOG } from '../data/referenceCatalog';

const REFERENCE_LEGACY_SLUGS = [
  'reference',
  'reference/flex',
  'reference/flex-direction',
  'reference/flex-wrap',
  'reference/flex-basis',
  'reference/flex-grow',
  'reference/flex-shrink',
  'reference/order',
  'reference/justify-content',
  'reference/align-items',
  'reference/align-self',
  'reference/align-content',
  'reference/gap',
  'reference/grid-template-columns',
  'reference/grid-column',
  'reference/grid-template-rows',
  'reference/grid-row',
  'reference/grid-auto-flow',
  'reference/grid-auto-columns',
  'reference/grid-auto-rows',
  'reference/justify-items',
  'reference/justify-self',
  'reference/place-content',
  'reference/place-items',
  'reference/place-self',
  'reference/width',
  'reference/min-width',
  'reference/max-width',
  'reference/height',
  'reference/min-height',
  'reference/max-height',
  'reference/size',
] as const;

function walkNav(nodes: typeof DOCS_NAV_TREE, add: (path: string) => void): void {
  for (const n of nodes) {
    if (n.path) add(n.path);
    if (n.children) walkNav(n.children, add);
  }
}

export function getAllSitemapPaths(): string[] {
  const u = new Set<string>();
  u.add('/');
  u.add('/docs');
  u.add('/studio');
  u.add('/playground');
  u.add('/get-started');
  u.add('/components');

  const addDoc = (path: string) => {
    const p = path.replace(/^\/+|\/+$/g, '');
    if (p) u.add(`/docs/${p}`);
  };

  for (const r of ['getting-started', 'core-concepts', 'reference'] as const) {
    addDoc(r);
  }

  walkNav(DOCS_NAV_TREE, addDoc);

  for (const g of GUIDE_SLUGS) addDoc(g);

  for (const cat of DOC_TOPIC_CATEGORIES) {
    for (const prop of cat.properties) {
      addDoc(`${cat.path}/${prop}`);
    }
  }

  for (const k of Object.keys(DOCS_SITE_PAGES_EN)) addDoc(k);

  for (const slug of REFERENCE_LEGACY_SLUGS) addDoc(slug);

  for (const slug of Object.keys(REFERENCE_CATALOG)) addDoc(`reference/${slug}`);

  for (const g of GROUP_ORDER) addDoc(g);

  return [...u].sort((a, b) => a.localeCompare(b));
}
