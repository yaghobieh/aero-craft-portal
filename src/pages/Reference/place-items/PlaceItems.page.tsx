import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function PlaceItemsPage() {
  const make = (cls: string) => `<div class="grid grid-cols-3 gap-3 p-4 ${cls}" style="height:180px;">
  <div class="w-16 h-10 ${TILE_CLASS}">01</div>
  <div class="w-16 h-10 ${TILE_CLASS}">02</div>
  <div class="w-16 h-10 ${TILE_CLASS}">03</div>
</div>`;

  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="place-items"
      description="Utilities for controlling how items are justified and aligned at the same time."
      quickReference={[
        { className: 'place-items-start', styles: 'place-items: start;' },
        { className: 'place-items-end', styles: 'place-items: end;' },
        { className: 'place-items-center', styles: 'place-items: center;' },
        { className: 'place-items-stretch', styles: 'place-items: stretch;' },
        { className: 'place-items-auto', styles: 'place-items: auto;' },
        { className: 'place-items-baseline', styles: 'place-items: baseline;' },
      ]}
      examples={[
        { id: 'center', title: 'Center', description: 'Center every item inside its cell on both axes.', markup: make('place-items-center'), minHeight: 220 },
        { id: 'start', title: 'Start', description: 'Align every item to the top-start corner.', markup: make('place-items-start'), minHeight: 220 },
        { id: 'end', title: 'End', description: 'Align every item to the bottom-end corner.', markup: make('place-items-end'), minHeight: 220 },
        { id: 'stretch', title: 'Stretch', description: 'Items fill their cell on both axes.', markup: make('place-items-stretch').replace(/w-16 h-10 /g, ''), minHeight: 220 },
      ]}
      customValue={{
        description: 'place-items accepts a fixed set of values — use the provided utilities.',
        bracketCode: `<!-- No arbitrary value needed — use the listed utilities -->`,
      }}
      responsive={{
        description: 'Start on mobile, center on desktop.',
        code: `<div class="place-items-start lg:place-items-center ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'grid-center', styles: 'display: grid; place-items: center;', description: 'Perfect single-class centering. Every layout you build uses it somewhere.' },
      ]}
      shortcutsNote="grid-center is the most-loved AeroCraft shortcut. It replaces the flex + items-center + justify-center trio you wrote a thousand times."
      prev={{ to: '/docs/reference/place-content', label: 'place-content' }}
      next={{ to: '/docs/reference/place-self', label: 'place-self' }}
    />
  );
}
