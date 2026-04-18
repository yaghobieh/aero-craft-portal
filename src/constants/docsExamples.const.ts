import { buildClassName } from '@forgedevstack/aerocraft';
import { portalAeroDemo } from '../config/portal.config';

const dc = (name: string) => buildClassName(portalAeroDemo.prefix, portalAeroDemo.separator, name);

const joinClasses = (...names: string[]) => names.map((n) => dc(n)).join(' ');

export const DOC_CODE_FLEX = `<div class="${joinClasses('flex-col-center', 'gap-4')}">
  <span>Title</span>
  <span>Subtitle</span>
</div>`;

export const DOC_CODE_GRID = `<div class="${joinClasses('grid-3', 'gap-4')}">
  <article class="${dc('p-4')}">One</article>
  <article class="${dc('p-4')}">Two</article>
  <article class="${dc('p-4')}">Three</article>
</div>`;

export const DOC_CODE_RESPONSIVE = `<div class="${joinClasses('flex-col', 'gap-4')}">
  <aside class="${dc('p-4')}">Sidebar</aside>
  <main class="${joinClasses('flex-1', 'p-4')}">Content</main>
</div>`;

export const DOC_CODE_CUSTOM_GAP = `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  prefix: '',
  separator: '-',
  mode: 'standalone',
  customShortcuts: {
    'gap-{{10px}}': {
      tailwind: 'gap-[10px]',
      css: { gap: '10px' },
      description: 'Fixed 10px gap',
      group: 'gap',
    },
  },
});`;
