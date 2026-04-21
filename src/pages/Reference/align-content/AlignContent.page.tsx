import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

function multiRow(content: string) {
  return `<div class="flex flex-wrap ${content} gap-3 p-4 h-48">
  <div class="w-24 ${TILE_CLASS}">01</div>
  <div class="w-24 ${TILE_CLASS}">02</div>
  <div class="w-24 ${TILE_CLASS}">03</div>
  <div class="w-24 ${TILE_CLASS}">04</div>
  <div class="w-24 ${TILE_CLASS}">05</div>
  <div class="w-24 ${TILE_CLASS}">06</div>
  <div class="w-24 ${TILE_CLASS}">07</div>
  <div class="w-24 ${TILE_CLASS}">08</div>
</div>`;
}

export function AlignContentPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="align-content"
      description="Utilities for controlling how rows are positioned in multi-row flex and grid containers."
      quickReference={[
        { className: 'content-normal', styles: 'align-content: normal;' },
        { className: 'content-start', styles: 'align-content: flex-start;' },
        { className: 'content-end', styles: 'align-content: flex-end;' },
        { className: 'content-center', styles: 'align-content: center;' },
        { className: 'content-between', styles: 'align-content: space-between;' },
        { className: 'content-around', styles: 'align-content: space-around;' },
        { className: 'content-evenly', styles: 'align-content: space-evenly;' },
        { className: 'content-stretch', styles: 'align-content: stretch;' },
        { className: 'content-baseline', styles: 'align-content: baseline;' },
      ]}
      examples={[
        { id: 'start', title: 'Start', description: 'Pack rows at the start of the container.', markup: multiRow('content-start'), minHeight: 240 },
        { id: 'center', title: 'Center', description: 'Pack rows around the vertical center.', markup: multiRow('content-center'), minHeight: 240 },
        { id: 'end', title: 'End', description: 'Pack rows at the end.', markup: multiRow('content-end'), minHeight: 240 },
        { id: 'between', title: 'Between', description: 'Distribute rows evenly with equal space between.', markup: multiRow('content-between'), minHeight: 240 },
        { id: 'around', title: 'Around', description: 'Equal space around each row.', markup: multiRow('content-around'), minHeight: 240 },
      ]}
      responsive={{
        description: 'Stack flush on mobile, distribute evenly on large screens.',
        code: `<div class="flex flex-wrap content-start lg:content-evenly">\n  <!-- ... -->\n</div>`,
      }}
      prev={{ to: '/docs/reference/align-self', label: 'align-self' }}
      next={{ to: '/docs/reference/gap', label: 'gap' }}
    />
  );
}
