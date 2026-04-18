import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function PlaceContentPage() {
  const make = (cls: string) => `<div class="grid grid-cols-3 gap-3 p-4 ${cls}" style="height:200px;">
  <div class="w-16 h-10 ${TILE_CLASS}">01</div>
  <div class="w-16 h-10 ${TILE_CLASS}">02</div>
  <div class="w-16 h-10 ${TILE_CLASS}">03</div>
</div>`;

  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="place-content"
      description="Utilities for controlling how content is justified and aligned at the same time."
      quickReference={[
        { className: 'place-content-center', styles: 'place-content: center;' },
        { className: 'place-content-start', styles: 'place-content: start;' },
        { className: 'place-content-end', styles: 'place-content: end;' },
        { className: 'place-content-between', styles: 'place-content: space-between;' },
        { className: 'place-content-around', styles: 'place-content: space-around;' },
        { className: 'place-content-evenly', styles: 'place-content: space-evenly;' },
        { className: 'place-content-stretch', styles: 'place-content: stretch;' },
        { className: 'place-content-baseline', styles: 'place-content: baseline;' },
      ]}
      examples={[
        { id: 'center', title: 'Center', description: 'Center content on both axes inside an oversized grid.', markup: make('place-content-center'), minHeight: 240 },
        { id: 'between', title: 'Between', description: 'Distribute space between rows and columns.', markup: make('place-content-between'), minHeight: 240 },
        { id: 'around', title: 'Around', description: 'Equal space around content on both axes.', markup: make('place-content-around'), minHeight: 240 },
        { id: 'evenly', title: 'Evenly', description: 'Perfectly even spacing between and around.', markup: make('place-content-evenly'), minHeight: 240 },
      ]}
      customValue={{
        description: 'place-content combines align-content + justify-content — use the named utilities for clarity.',
        bracketCode: `<!-- Use the named shortcuts instead of arbitrary values -->`,
      }}
      responsive={{
        description: 'Collapse to start on mobile, distribute on wider viewports.',
        code: `<div class="place-content-start lg:place-content-between ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'grid-center', styles: 'display: grid; place-items: center;', description: 'Uses place-items under the hood but most often replaces place-content-center for single-child grids.' },
      ]}
      shortcutsNote="place-content is for the grid container. For inside-cell centering use place-items. For a single item, use place-self."
      prev={{ to: '/docs/reference/justify-self', label: 'justify-self' }}
      next={{ to: '/docs/reference/place-items', label: 'place-items' }}
    />
  );
}
