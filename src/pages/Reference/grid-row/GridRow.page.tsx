import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function GridRowPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="grid-row"
      description="Utilities for controlling how elements are sized and placed across grid rows."
      quickReference={[
        { className: 'row-span-<number>', styles: 'grid-row: span <n> / span <n>;' },
        { className: 'row-span-full', styles: 'grid-row: 1 / -1;' },
        { className: 'row-start-<number>', styles: 'grid-row-start: <n>;' },
        { className: 'row-end-<number>', styles: 'grid-row-end: <n>;' },
        { className: 'row-auto', styles: 'grid-row: auto;' },
        { className: 'row-start-auto', styles: 'grid-row-start: auto;' },
        { className: 'row-end-auto', styles: 'grid-row-end: auto;' },
        { className: 'row-(<custom-property>)', styles: 'grid-row: var(<custom-property>);' },
        { className: 'row-[<value>]', styles: 'grid-row: <value>;' },
      ]}
      examples={[
        {
          id: 'span',
          title: 'Span N rows',
          description: 'row-span-<n> makes an item stretch across multiple rows.',
          markup: `<div class="grid grid-rows-3 grid-cols-3 gap-3 p-4" style="height:240px;">
  <div class="row-span-3 ${TILE_CLASS}">row-span-3</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
  <div class="${TILE_CLASS}">05</div>
  <div class="${TILE_CLASS}">06</div>
  <div class="${TILE_CLASS}">07</div>
</div>`,
          minHeight: 280,
        },
        {
          id: 'span-full',
          title: 'Span full',
          description: 'row-span-full is great for sidebars that hug the full grid height.',
          markup: `<div class="grid grid-rows-3 grid-cols-4 gap-3 p-4" style="height:240px;">
  <div class="row-span-full ${TILE_CLASS}">sidebar</div>
  <div class="col-span-3 ${TILE_CLASS}">header</div>
  <div class="col-span-3 ${TILE_CLASS}">main</div>
  <div class="col-span-3 ${TILE_CLASS}">footer</div>
</div>`,
          minHeight: 280,
        },
        {
          id: 'start-end',
          title: 'Start / end lines',
          description: 'Pin an item to specific row lines.',
          markup: `<div class="grid grid-rows-4 grid-cols-3 gap-3 p-4" style="height:280px;">
  <div class="row-start-2 row-end-4 ${TILE_CLASS}">rows 2 → 4</div>
  <div class="${TILE_CLASS}">b</div>
  <div class="${TILE_CLASS}">c</div>
</div>`,
          minHeight: 320,
        },
      ]}
      customValue={{
        description: 'Use row-[<value>] for raw grid-row expressions. Underscores become spaces.',
        bracketCode: `<div class="row-[span_2_/_span_2] ...">\n  <!-- ... -->\n</div>`,
        parenDescription:
          'For CSS variables, row-(<custom-property>) expands to grid-row: var(<custom-property>).',
        parenCode: `<div class="row-(--hero-rows) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Different row coverage at different breakpoints.',
        code: `<div class="row-span-1 lg:row-span-2 ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="Combine row-span-full with grid-rows-[auto_1fr_auto] for shell layouts with sticky sidebars."
      prev={{ to: '/docs/reference/grid-template-rows', label: 'grid-template-rows' }}
      next={{ to: '/docs/reference/grid-auto-flow', label: 'grid-auto-flow' }}
    />
  );
}
