import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

function heightVaryingTiles() {
  return `  <div class="py-2 ${TILE_CLASS}">01</div>
  <div class="py-6 ${TILE_CLASS}">02</div>
  <div class="py-4 ${TILE_CLASS}">03</div>`;
}

function example(name: string) {
  return `<div class="flex ${name} gap-3 p-4 h-48">\n${heightVaryingTiles()}\n</div>`;
}

export function AlignItemsPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="align-items"
      description="Utilities for controlling how flex and grid items are positioned along a container\u2019s cross axis."
      quickReference={[
        { className: 'items-start', styles: 'align-items: flex-start;' },
        { className: 'items-end', styles: 'align-items: flex-end;' },
        { className: 'items-center', styles: 'align-items: center;' },
        { className: 'items-baseline', styles: 'align-items: baseline;' },
        { className: 'items-stretch', styles: 'align-items: stretch;' },
      ]}
      examples={[
        { id: 'start', title: 'Start', description: 'Align items to the start of the cross axis.', markup: example('items-start'), minHeight: 220 },
        { id: 'center', title: 'Center', description: 'Align items to the center of the cross axis.', markup: example('items-center'), minHeight: 220 },
        { id: 'end', title: 'End', description: 'Align items to the end of the cross axis.', markup: example('items-end'), minHeight: 220 },
        { id: 'stretch', title: 'Stretch', description: 'Stretch items to fill the cross axis.', markup: example('items-stretch'), minHeight: 220 },
        {
          id: 'baseline',
          title: 'Baseline',
          description: 'Align items along their text baselines \u2014 great for typography.',
          markup: `<div class="flex items-baseline gap-4 p-4 h-40">
  <div class="text-sm ${TILE_CLASS}">sm</div>
  <div class="text-lg ${TILE_CLASS}">lg</div>
  <div class="text-3xl ${TILE_CLASS}">3xl</div>
</div>`,
          minHeight: 180,
        },
      ]}
      responsive={{
        description: 'Stretch items on mobile, center them on medium screens and above.',
        code: `<div class="flex items-stretch md:items-center">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'flex-row-center', styles: 'display: flex; flex-direction: row; align-items: center; justify-content: center;', description: 'Row + both axes centered.' },
        { name: 'flex-col-center', styles: 'display: flex; flex-direction: column; align-items: center; justify-content: center;', description: 'Column + both axes centered.' },
        { name: 'flex-between', styles: 'display: flex; align-items: center; justify-content: space-between;', description: 'Center cross axis + distribute on main.' },
      ]}
      prev={{ to: '/docs/reference/justify-content', label: 'justify-content' }}
      next={{ to: '/docs/reference/align-self', label: 'align-self' }}
    />
  );
}
