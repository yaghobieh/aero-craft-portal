import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function GridAutoColumnsPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="grid-auto-columns"
      description="Utilities for controlling the size of implicitly-created grid columns."
      quickReference={[
        { className: 'auto-cols-auto', styles: 'grid-auto-columns: auto;' },
        { className: 'auto-cols-min', styles: 'grid-auto-columns: min-content;' },
        { className: 'auto-cols-max', styles: 'grid-auto-columns: max-content;' },
        { className: 'auto-cols-fr', styles: 'grid-auto-columns: minmax(0, 1fr);' },
        { className: 'auto-cols-(<custom-property>)', styles: 'grid-auto-columns: var(<custom-property>);' },
        { className: 'auto-cols-[<value>]', styles: 'grid-auto-columns: <value>;' },
      ]}
      examples={[
        {
          id: 'fr',
          title: 'Equal implicit columns',
          description:
            'Combine with grid-flow-col and no explicit grid-cols to let items create equally-sized columns on the fly.',
          markup: `<div class="grid grid-flow-col auto-cols-fr gap-3 p-4">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'max',
          title: 'Max-content tracks',
          description: 'auto-cols-max makes each implicit column as wide as its content — great for toolbars.',
          markup: `<div class="grid grid-flow-col auto-cols-max gap-3 p-4">
  <div class="${TILE_CLASS}">Save</div>
  <div class="${TILE_CLASS}">Cancel</div>
  <div class="${TILE_CLASS}">Delete item</div>
</div>`,
        },
        {
          id: 'min',
          title: 'Min-content tracks',
          description: 'auto-cols-min shrinks implicit columns to their narrowest non-breaking content.',
          markup: `<div class="grid grid-flow-col auto-cols-min gap-3 p-4">
  <div class="${TILE_CLASS}">OK</div>
  <div class="${TILE_CLASS}">Go</div>
  <div class="${TILE_CLASS}">Next</div>
</div>`,
        },
      ]}
      customValue={{
        description: 'Use auto-cols-[<value>] for fixed-width implicit tracks.',
        bracketCode: `<div class="grid grid-flow-col auto-cols-[200px] ...">\n  <!-- ... -->\n</div>`,
        parenDescription:
          'For CSS variables, auto-cols-(<custom-property>) expands to grid-auto-columns: var(<custom-property>).',
        parenCode: `<div class="auto-cols-(--track-w) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Change implicit sizing per breakpoint.',
        code: `<div class="auto-cols-fr md:auto-cols-max ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="auto-cols-* pairs with grid-flow-col to build horizontally-scrolling lists without enumerating every track."
      prev={{ to: '/docs/reference/grid-auto-flow', label: 'grid-auto-flow' }}
      next={{ to: '/docs/reference/grid-auto-rows', label: 'grid-auto-rows' }}
    />
  );
}
