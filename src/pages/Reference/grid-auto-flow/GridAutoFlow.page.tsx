import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function GridAutoFlowPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="grid-auto-flow"
      description="Utilities for controlling how elements in a grid are auto-placed."
      quickReference={[
        { className: 'grid-flow-row', styles: 'grid-auto-flow: row;' },
        { className: 'grid-flow-col', styles: 'grid-auto-flow: column;' },
        { className: 'grid-flow-dense', styles: 'grid-auto-flow: dense;' },
        { className: 'grid-flow-row-dense', styles: 'grid-auto-flow: row dense;' },
        { className: 'grid-flow-col-dense', styles: 'grid-auto-flow: column dense;' },
      ]}
      examples={[
        {
          id: 'row',
          title: 'Flow by row',
          description: 'The default — items fill left-to-right, then wrap to the next row.',
          markup: `<div class="grid grid-cols-4 grid-flow-row gap-3 p-4">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
  <div class="${TILE_CLASS}">05</div>
</div>`,
        },
        {
          id: 'col',
          title: 'Flow by column',
          description: 'grid-flow-col fills top-to-bottom, then across. Great for calendar-style layouts.',
          markup: `<div class="grid grid-rows-3 grid-flow-col gap-3 p-4" style="height:240px;">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
  <div class="${TILE_CLASS}">05</div>
  <div class="${TILE_CLASS}">06</div>
</div>`,
          minHeight: 280,
        },
        {
          id: 'dense',
          title: 'Dense packing',
          description:
            'grid-flow-row-dense back-fills empty cells — use it for masonry-style layouts where some items have col-span.',
          markup: `<div class="grid grid-cols-4 grid-flow-row-dense gap-3 p-4">
  <div class="${TILE_CLASS}">01</div>
  <div class="col-span-2 ${TILE_CLASS}">02 · span 2</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
  <div class="col-span-2 ${TILE_CLASS}">05 · span 2</div>
  <div class="${TILE_CLASS}">06</div>
</div>`,
        },
      ]}
      customValue={{
        description:
          'grid-auto-flow rarely needs arbitrary values — the five listed utilities cover every valid CSS value.',
        bracketCode: `<div class="grid-auto-flow:[row_dense] ...">\n  <!-- use grid-flow-row-dense instead -->\n</div>`,
      }}
      responsive={{
        description:
          'Flow by column on desktop where a timeline makes sense, by row on mobile.',
        code: `<div class="grid-flow-row md:grid-flow-col ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="grid-flow-row-dense is the trick behind masonry-ish grids without JS — keep it in your tool belt."
      prev={{ to: '/docs/reference/grid-row', label: 'grid-row' }}
      next={{ to: '/docs/reference/grid-auto-columns', label: 'grid-auto-columns' }}
    />
  );
}
