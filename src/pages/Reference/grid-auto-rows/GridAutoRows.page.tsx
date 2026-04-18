import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function GridAutoRowsPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="grid-auto-rows"
      description="Utilities for controlling the size of implicitly-created grid rows."
      quickReference={[
        { className: 'auto-rows-auto', styles: 'grid-auto-rows: auto;' },
        { className: 'auto-rows-min', styles: 'grid-auto-rows: min-content;' },
        { className: 'auto-rows-max', styles: 'grid-auto-rows: max-content;' },
        { className: 'auto-rows-fr', styles: 'grid-auto-rows: minmax(0, 1fr);' },
        { className: 'auto-rows-(<custom-property>)', styles: 'grid-auto-rows: var(<custom-property>);' },
        { className: 'auto-rows-[<value>]', styles: 'grid-auto-rows: <value>;' },
      ]}
      examples={[
        {
          id: 'fr',
          title: 'Equal implicit rows',
          description: 'Items in implicit rows become evenly-sized.',
          markup: `<div class="grid grid-cols-3 auto-rows-fr gap-3 p-4" style="height:220px;">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
  <div class="${TILE_CLASS}">05</div>
</div>`,
          minHeight: 260,
        },
        {
          id: 'fixed',
          title: 'Fixed implicit rows',
          description: 'Use auto-rows-[<value>] to create equal-height rows that match a design spec.',
          markup: `<div class="grid grid-cols-3 auto-rows-[80px] gap-3 p-4">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
</div>`,
        },
        {
          id: 'min',
          title: 'min-content rows',
          description: 'Rows only grow as tall as their content.',
          markup: `<div class="grid grid-cols-3 auto-rows-min gap-3 p-4">
  <div class="${TILE_CLASS}">short</div>
  <div class="${TILE_CLASS}" style="white-space:normal;">Longer line of content that spans two rows</div>
  <div class="${TILE_CLASS}">short</div>
</div>`,
          minHeight: 200,
        },
      ]}
      customValue={{
        description: 'Use auto-rows-[<value>] for fixed-height implicit tracks.',
        bracketCode: `<div class="grid auto-rows-[minmax(120px,1fr)] ...">\n  <!-- ... -->\n</div>`,
        parenDescription:
          'For CSS variables, auto-rows-(<custom-property>) expands to grid-auto-rows: var(<custom-property>).',
        parenCode: `<div class="auto-rows-(--row-h) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Shorter rows on mobile, taller on desktop.',
        code: `<div class="auto-rows-[80px] md:auto-rows-[120px] ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="auto-rows-fr + grid-rows-<n> is an alternative way to evenly divide a fixed height."
      prev={{ to: '/docs/reference/grid-auto-columns', label: 'grid-auto-columns' }}
      next={{ to: '/docs/reference/justify-items', label: 'justify-items' }}
    />
  );
}
