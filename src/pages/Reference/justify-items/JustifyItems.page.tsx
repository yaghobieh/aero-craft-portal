import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function JustifyItemsPage() {
  const make = (cls: string) => `<div class="grid grid-cols-3 gap-3 p-4 ${cls}">
  <div class="w-20 ${TILE_CLASS}">01</div>
  <div class="w-20 ${TILE_CLASS}">02</div>
  <div class="w-20 ${TILE_CLASS}">03</div>
</div>`;

  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="justify-items"
      description="Utilities for controlling how grid items are aligned along their inline axis."
      quickReference={[
        { className: 'justify-items-start', styles: 'justify-items: start;' },
        { className: 'justify-items-end', styles: 'justify-items: end;' },
        { className: 'justify-items-center', styles: 'justify-items: center;' },
        { className: 'justify-items-stretch', styles: 'justify-items: stretch;' },
      ]}
      examples={[
        { id: 'start', title: 'Start', description: 'Align every grid cell content to the inline start.', markup: make('justify-items-start') },
        { id: 'center', title: 'Center', description: 'Center each item horizontally within its track.', markup: make('justify-items-center') },
        { id: 'end', title: 'End', description: 'Align every grid cell content to the inline end.', markup: make('justify-items-end') },
        { id: 'stretch', title: 'Stretch', description: 'Items stretch to fill their track — the CSS default.', markup: make('justify-items-stretch').replace(/w-20 /g, '') },
      ]}
      customValue={{
        description:
          'justify-items accepts a fixed set of values — use the provided utilities.',
        bracketCode: `<!-- No arbitrary value is usually needed for justify-items -->`,
      }}
      responsive={{
        description: 'Center on mobile, stretch on desktop.',
        code: `<div class="justify-items-center lg:justify-items-stretch ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'grid-center', styles: 'display: grid; place-items: center;', description: 'Shorthand for place-items-center on a grid parent.' },
      ]}
      shortcutsNote="If you need both axes centered, reach for grid-center (our composite shortcut) instead of stacking items-center + justify-items-center."
      prev={{ to: '/docs/reference/grid-auto-rows', label: 'grid-auto-rows' }}
      next={{ to: '/docs/reference/justify-self', label: 'justify-self' }}
    />
  );
}
