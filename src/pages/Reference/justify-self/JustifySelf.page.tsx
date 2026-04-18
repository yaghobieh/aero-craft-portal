import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function JustifySelfPage() {
  const make = (selfCls: string) => `<div class="grid grid-cols-3 gap-3 p-4">
  <div class="w-20 ${TILE_CLASS}">01</div>
  <div class="w-20 ${selfCls} ${TILE_CLASS}">${selfCls}</div>
  <div class="w-20 ${TILE_CLASS}">03</div>
</div>`;

  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="justify-self"
      description="Utilities for controlling how an individual grid item is aligned along its inline axis."
      quickReference={[
        { className: 'justify-self-start', styles: 'justify-self: start;' },
        { className: 'justify-self-end', styles: 'justify-self: end;' },
        { className: 'justify-self-center', styles: 'justify-self: center;' },
        { className: 'justify-self-stretch', styles: 'justify-self: stretch;' },
      ]}
      examples={[
        { id: 'start', title: 'Start', description: 'Pin a single item to the start of its cell.', markup: make('justify-self-start') },
        { id: 'center', title: 'Center', description: 'Center a single item in its cell.', markup: make('justify-self-center') },
        { id: 'end', title: 'End', description: 'Push a single item to the end of its cell.', markup: make('justify-self-end') },
        { id: 'stretch', title: 'Stretch', description: 'Stretch a single item across its entire cell.', markup: make('justify-self-stretch').replace(/w-20 /g, '') },
      ]}
      customValue={{
        description: 'justify-self accepts a fixed set of values — use the provided utilities.',
        bracketCode: `<!-- No arbitrary value is usually needed for justify-self -->`,
      }}
      responsive={{
        description: 'Center on mobile, stretch on desktop.',
        code: `<div class="justify-self-center lg:justify-self-stretch ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="justify-self overrides the grid parent's justify-items for one item at a time."
      prev={{ to: '/docs/reference/justify-items', label: 'justify-items' }}
      next={{ to: '/docs/reference/place-content', label: 'place-content' }}
    />
  );
}
