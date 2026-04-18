import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function GridTemplateColumnsPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="grid-template-columns"
      description="Utilities for specifying the columns in a grid layout."
      quickReference={[
        { className: 'grid-cols-<number>', styles: 'grid-template-columns: repeat(<number>, minmax(0, 1fr));' },
        { className: 'grid-cols-none', styles: 'grid-template-columns: none;' },
        { className: 'grid-cols-subgrid', styles: 'grid-template-columns: subgrid;' },
        { className: 'grid-cols-(<custom-property>)', styles: 'grid-template-columns: var(<custom-property>);' },
        { className: 'grid-cols-[<value>]', styles: 'grid-template-columns: <value>;' },
      ]}
      examples={[
        {
          id: 'basic',
          title: 'Basic example',
          description: 'grid-cols-<n> creates <n> equal-width columns.',
          markup: `<div class="grid grid-cols-3 gap-3 p-4">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
  <div class="${TILE_CLASS}">04</div>
  <div class="${TILE_CLASS}">05</div>
  <div class="${TILE_CLASS}">06</div>
</div>`,
        },
        {
          id: 'twelve',
          title: 'Twelve-column layout',
          description: 'Classic 12-column grid — pair with col-span-<n> for precise placement.',
          markup: `<div class="grid grid-cols-12 gap-2 p-4">
  <div class="col-span-3 ${TILE_CLASS}">3</div>
  <div class="col-span-6 ${TILE_CLASS}">6</div>
  <div class="col-span-3 ${TILE_CLASS}">3</div>
  <div class="col-span-12 ${TILE_CLASS}">full</div>
</div>`,
        },
        {
          id: 'auto-fit',
          title: 'Auto-fit cards',
          description:
            'grid-auto-fit uses repeat(auto-fit, minmax(0, 1fr)) under the hood — cards flow and reflow naturally.',
          markup: `<div class="grid-auto-fit gap-3 p-4" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
  <div class="${TILE_CLASS}">Card 01</div>
  <div class="${TILE_CLASS}">Card 02</div>
  <div class="${TILE_CLASS}">Card 03</div>
  <div class="${TILE_CLASS}">Card 04</div>
</div>`,
        },
        {
          id: 'none',
          title: 'Reset to none',
          description:
            'grid-cols-none clears column tracks — useful for restoring the default at a breakpoint.',
          markup: `<div class="grid grid-cols-3 md:grid-cols-none gap-3 p-4">
  <div class="${TILE_CLASS}">A</div>
  <div class="${TILE_CLASS}">B</div>
  <div class="${TILE_CLASS}">C</div>
</div>`,
        },
      ]}
      customValue={{
        description:
          'Use grid-cols-[<value>] for asymmetric tracks, named lines, or fraction units. Underscores become spaces.',
        bracketCode: `<div class="grid grid-cols-[200px_1fr_200px] gap-4">\n  <!-- sidebar · content · sidebar -->\n</div>\n\n<div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">\n  <!-- fully responsive card grid -->\n</div>`,
        parenDescription:
          'For CSS variables, grid-cols-(<custom-property>) expands to grid-template-columns: var(<custom-property>).',
        parenCode: `<div class="grid grid-cols-(--layout-cols) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description:
          'Mobile stacks in one column; medium uses two; large goes to four.',
        code: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'grid-center', styles: 'display: grid; place-items: center;', description: 'Single-cell perfect centering. Most under-rated grid utility.' },
        { name: 'grid-auto-fill', styles: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(0, 1fr));', description: 'Responsive card grid that keeps reserved empty tracks.' },
        { name: 'grid-auto-fit', styles: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr));', description: 'Responsive card grid that collapses empty tracks.' },
      ]}
      shortcutsNote="grid-center replaces flex + items-center + justify-content with a single class."
      prev={{ to: '/docs/reference/gap', label: 'gap' }}
      next={{ to: '/docs/reference/grid-column', label: 'grid-column' }}
    />
  );
}
