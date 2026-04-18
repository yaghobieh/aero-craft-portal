import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

function tiles() {
  return `  <div class="${TILE_CLASS}">01</div>\n  <div class="${TILE_CLASS}">02</div>\n  <div class="${TILE_CLASS}">03</div>`;
}

function example(name: string) {
  return `<div class="flex ${name} gap-3 p-4">\n${tiles()}\n</div>`;
}

export function JustifyContentPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="justify-content"
      description="Utilities for controlling how flex and grid items are positioned along a container\u2019s main axis."
      quickReference={[
        { className: 'justify-start', styles: 'justify-content: flex-start;' },
        { className: 'justify-end', styles: 'justify-content: flex-end;' },
        { className: 'justify-center', styles: 'justify-content: center;' },
        { className: 'justify-between', styles: 'justify-content: space-between;' },
        { className: 'justify-around', styles: 'justify-content: space-around;' },
        { className: 'justify-evenly', styles: 'justify-content: space-evenly;' },
        { className: 'justify-stretch', styles: 'justify-content: stretch;' },
        { className: 'justify-normal', styles: 'justify-content: normal;' },
      ]}
      examples={[
        { id: 'start', title: 'Start', description: 'Pack items at the start of the main axis.', markup: example('justify-start') },
        { id: 'center', title: 'Center', description: 'Pack items around the center.', markup: example('justify-center') },
        { id: 'end', title: 'End', description: 'Pack items at the end.', markup: example('justify-end') },
        { id: 'between', title: 'Between', description: 'Distribute items with equal space between.', markup: example('justify-between') },
        { id: 'around', title: 'Around', description: 'Distribute items with equal space around.', markup: example('justify-around') },
        { id: 'evenly', title: 'Evenly', description: 'Distribute items so spacing between any two items is equal.', markup: example('justify-evenly') },
      ]}
      responsive={{
        description: 'Left-aligned on mobile, space-between on medium screens and up.',
        code: `<div class="flex justify-start md:justify-between">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'flex-between', styles: 'display: flex; align-items: center; justify-content: space-between;', description: 'Header pattern — 1 class instead of 3.' },
        { name: 'flex-around', styles: 'display: flex; align-items: center; justify-content: space-around;', description: 'Equal space around each item.' },
        { name: 'flex-evenly', styles: 'display: flex; align-items: center; justify-content: space-evenly;', description: 'Equal space between each item.' },
        { name: 'flex-row-center', styles: 'display: flex; flex-direction: row; align-items: center; justify-content: center;', description: 'Row + both axes centered.' },
        { name: 'flex-col-center', styles: 'display: flex; flex-direction: column; align-items: center; justify-content: center;', description: 'Column + both axes centered.' },
      ]}
      prev={{ to: '/docs/reference/order', label: 'order' }}
      next={{ to: '/docs/reference/align-items', label: 'align-items' }}
    />
  );
}
