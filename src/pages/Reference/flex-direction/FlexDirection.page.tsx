import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

export function FlexDirectionPage() {
  const row = `<div class="flex flex-row gap-3 p-4">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
</div>`;
  const rowReverse = row.replace('flex-row', 'flex-row-reverse');
  const col = `<div class="flex flex-col gap-3 p-4">
  <div class="${TILE_CLASS}">01</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
</div>`;
  const colReverse = col.replace('flex-col', 'flex-col-reverse');

  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="flex-direction"
      description="Utilities for controlling the direction of flex items."
      quickReference={[
        { className: 'flex-row', styles: 'flex-direction: row;' },
        { className: 'flex-row-reverse', styles: 'flex-direction: row-reverse;' },
        { className: 'flex-col', styles: 'flex-direction: column;' },
        { className: 'flex-col-reverse', styles: 'flex-direction: column-reverse;' },
      ]}
      examples={[
        {
          id: 'row',
          title: 'Row',
          description: 'Use flex-row to position items horizontally in the same direction as text.',
          markup: row,
        },
        {
          id: 'row-reverse',
          title: 'Row reversed',
          description: 'Use flex-row-reverse to position items horizontally in the opposite direction.',
          markup: rowReverse,
        },
        {
          id: 'column',
          title: 'Column',
          description: 'Use flex-col to position items vertically.',
          markup: col,
          minHeight: 200,
        },
        {
          id: 'column-reverse',
          title: 'Column reversed',
          description: 'Use flex-col-reverse to position items vertically in the opposite order.',
          markup: colReverse,
          minHeight: 200,
        },
      ]}
      responsive={{
        description:
          'Stack on mobile, switch to a row on medium screens and above.',
        code: `<div class="flex flex-col md:flex-row gap-3">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'flex-col-center', styles: 'display: flex; flex-direction: column; align-items: center; justify-content: center;', description: 'Column + both axes centered.' },
        { name: 'flex-row-center', styles: 'display: flex; flex-direction: row; align-items: center; justify-content: center;', description: 'Row + both axes centered.' },
        { name: 'flex-col-start', styles: 'display: flex; flex-direction: column; align-items: flex-start;', description: 'Column pinned to the start.' },
        { name: 'flex-col-end', styles: 'display: flex; flex-direction: column; align-items: flex-end;', description: 'Column pinned to the end.' },
        { name: 'flex-row-start', styles: 'display: flex; flex-direction: row; align-items: flex-start;', description: 'Row pinned to the start.' },
        { name: 'flex-row-end', styles: 'display: flex; flex-direction: row; align-items: flex-end;', description: 'Row pinned to the end.' },
      ]}
      shortcutsNote="Direction + alignment combined into one class. These are the ones we reach for every day and AeroCraft bakes them in."
      prev={{ to: '/docs/reference/flex', label: 'flex' }}
      next={{ to: '/docs/reference/flex-wrap', label: 'flex-wrap' }}
    />
  );
}
