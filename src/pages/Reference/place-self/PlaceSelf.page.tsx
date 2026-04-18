import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function PlaceSelfPage() {
  const make = (cls: string) => `<div class="grid grid-cols-3 gap-3 p-4" style="height:160px;">
  <div class="w-16 h-10 ${TILE_CLASS}">01</div>
  <div class="w-16 h-10 ${cls} ${TILE_CLASS}">${cls}</div>
  <div class="w-16 h-10 ${TILE_CLASS}">03</div>
</div>`;

  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="place-self"
      description="Utilities for controlling how an individual item is justified and aligned at the same time."
      quickReference={[
        { className: 'place-self-auto', styles: 'place-self: auto;' },
        { className: 'place-self-start', styles: 'place-self: start;' },
        { className: 'place-self-end', styles: 'place-self: end;' },
        { className: 'place-self-center', styles: 'place-self: center;' },
        { className: 'place-self-stretch', styles: 'place-self: stretch;' },
      ]}
      examples={[
        { id: 'auto', title: 'Auto', description: 'Inherit the parent grid place-items.', markup: make('place-self-auto'), minHeight: 200 },
        { id: 'start', title: 'Start', description: 'Pin a single item to the start corner.', markup: make('place-self-start'), minHeight: 200 },
        { id: 'center', title: 'Center', description: 'Center a single item in its cell.', markup: make('place-self-center'), minHeight: 200 },
        { id: 'end', title: 'End', description: 'Push a single item to the end corner.', markup: make('place-self-end'), minHeight: 200 },
      ]}
      customValue={{
        description: 'place-self accepts a fixed set of values — use the provided utilities.',
        bracketCode: `<!-- Use the named utilities -->`,
      }}
      responsive={{
        description: 'Auto on mobile, center on desktop.',
        code: `<div class="place-self-auto lg:place-self-center ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="place-self is the escape hatch — override the parent's place-items for a single item."
      prev={{ to: '/docs/reference/place-items', label: 'place-items' }}
      next={{ to: '/docs/reference/width', label: 'width' }}
    />
  );
}
