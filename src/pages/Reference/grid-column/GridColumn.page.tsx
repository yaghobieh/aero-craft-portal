import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function GridColumnPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="grid-column"
      description="Utilities for controlling how elements are sized and placed across grid columns."
      quickReference={[
        { className: 'col-span-<number>', styles: 'grid-column: span <n> / span <n>;' },
        { className: 'col-span-full', styles: 'grid-column: 1 / -1;' },
        { className: 'col-start-<number>', styles: 'grid-column-start: <n>;' },
        { className: 'col-end-<number>', styles: 'grid-column-end: <n>;' },
        { className: 'col-auto', styles: 'grid-column: auto;' },
        { className: 'col-start-auto', styles: 'grid-column-start: auto;' },
        { className: 'col-end-auto', styles: 'grid-column-end: auto;' },
        { className: 'col-(<custom-property>)', styles: 'grid-column: var(<custom-property>);' },
        { className: 'col-[<value>]', styles: 'grid-column: <value>;' },
      ]}
      examples={[
        {
          id: 'span',
          title: 'Span N columns',
          description: 'col-span-<n> is the simplest way to make an item cover multiple columns.',
          markup: `<div class="grid grid-cols-6 gap-3 p-4">
  <div class="col-span-1 ${TILE_CLASS}">1</div>
  <div class="col-span-2 ${TILE_CLASS}">2</div>
  <div class="col-span-3 ${TILE_CLASS}">3</div>
  <div class="col-span-6 ${TILE_CLASS}">6 · full row</div>
</div>`,
        },
        {
          id: 'span-full',
          title: 'Span full',
          description: 'col-span-full stretches an item edge-to-edge regardless of the column count.',
          markup: `<div class="grid grid-cols-4 gap-3 p-4">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
  <div class="col-span-full ${TILE_CLASS}">col-span-full</div>
</div>`,
        },
        {
          id: 'start-end',
          title: 'Start / end lines',
          description: 'col-start-<n> and col-end-<n> place an item at exact grid lines.',
          markup: `<div class="grid grid-cols-6 gap-3 p-4">
  <div class="col-start-2 col-end-5 ${TILE_CLASS}">col-start-2 col-end-5</div>
  <div class="col-start-1 col-end-3 ${TILE_CLASS}">1 → 3</div>
  <div class="col-start-4 col-end-7 ${TILE_CLASS}">4 → 7</div>
</div>`,
        },
        {
          id: 'arbitrary',
          title: 'Arbitrary placement',
          description: 'Use col-[<value>] for any raw grid-column value — including named lines.',
          markup: `<div class="grid grid-cols-6 gap-3 p-4">
  <div class="col-[1/4] ${TILE_CLASS}">col-[1/4]</div>
  <div class="col-[4/-1] ${TILE_CLASS}">col-[4/-1]</div>
</div>`,
        },
      ]}
      customValue={{
        description:
          'Use col-[<value>] for raw grid-column expressions. Underscores become spaces in arbitrary values.',
        bracketCode: `<div class="col-[span_3_/_span_3] ...">\n  <!-- ... -->\n</div>`,
        parenDescription:
          'For CSS variables, col-(<custom-property>) expands to grid-column: var(<custom-property>).',
        parenCode: `<div class="col-(--hero-span) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Stack full on mobile, split on desktop.',
        code: `<div class="col-span-full md:col-span-8 lg:col-span-6 ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="col-span-full is the 12-column layout cheat code — use it for headers, footers and feature rows."
      prev={{ to: '/docs/reference/grid-template-columns', label: 'grid-template-columns' }}
      next={{ to: '/docs/reference/grid-template-rows', label: 'grid-template-rows' }}
    />
  );
}
