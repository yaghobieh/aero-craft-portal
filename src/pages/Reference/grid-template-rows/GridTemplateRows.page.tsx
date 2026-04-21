import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function GridTemplateRowsPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="grid-template-rows"
      description="Utilities for specifying the rows in a grid layout."
      quickReference={[
        { className: 'grid-rows-<number>', styles: 'grid-template-rows: repeat(<number>, minmax(0, 1fr));' },
        { className: 'grid-rows-none', styles: 'grid-template-rows: none;' },
        { className: 'grid-rows-subgrid', styles: 'grid-template-rows: subgrid;' },
        { className: 'grid-rows-(<custom-property>)', styles: 'grid-template-rows: var(<custom-property>);' },
        { className: 'grid-rows-[<value>]', styles: 'grid-template-rows: <value>;' },
      ]}
      examples={[
        {
          id: 'basic',
          title: 'Basic example',
          description: 'grid-rows-<n> creates <n> equal-height rows. Pair with grid-flow-col to populate by column.',
          markup: `<div class="grid grid-rows-3 grid-flow-col gap-3 p-4" style="height:220px;">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
  <div class="${TILE_CLASS}">05</div>
  <div class="${TILE_CLASS}">06</div>
</div>`,
          minHeight: 260,
        },
        {
          id: 'span',
          title: 'With row-span',
          description: 'Combine grid-rows-<n> with row-span-<n> for vertical layouts.',
          markup: `<div class="grid grid-rows-4 grid-cols-2 gap-3 p-4" style="height:260px;">
  <div class="row-span-2 ${TILE_CLASS}">row-span-2</div>
  <div class="${TILE_CLASS}">B</div>
  <div class="${TILE_CLASS}">C</div>
  <div class="row-span-2 ${TILE_CLASS}">row-span-2</div>
  <div class="${TILE_CLASS}">E</div>
  <div class="${TILE_CLASS}">F</div>
</div>`,
          minHeight: 300,
        },
        {
          id: 'none',
          title: 'Reset rows',
          description: 'grid-rows-none clears row tracks.',
          markup: `<div class="grid grid-rows-2 md:grid-rows-none gap-3 p-4" style="height:160px;">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
</div>`,
          minHeight: 200,
        },
      ]}
      customValue={{
        description:
          'Use grid-rows-[<value>] for custom row sizing — auto, min-content, fixed tracks.',
        bracketCode: `<div class="grid grid-rows-[auto_1fr_auto] h-screen">\n  <!-- header · main · footer -->\n</div>`,
        parenDescription:
          'For CSS variables, grid-rows-(<custom-property>) expands to grid-template-rows: var(<custom-property>).',
        parenCode: `<div class="grid grid-rows-(--app-rows) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Two rows on mobile, three on desktop.',
        code: `<div class="grid grid-rows-2 lg:grid-rows-3 ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="grid-rows-[auto_1fr_auto] is the canonical full-page layout recipe. Use it as a shell template."
      prev={{ to: '/docs/reference/grid-column', label: 'grid-column' }}
      next={{ to: '/docs/reference/grid-row', label: 'grid-row' }}
    />
  );
}
