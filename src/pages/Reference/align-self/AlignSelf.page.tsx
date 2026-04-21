import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

export function AlignSelfPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="align-self"
      description="Utilities for controlling how an individual flex or grid item is positioned along its container\u2019s cross axis."
      quickReference={[
        { className: 'self-auto', styles: 'align-self: auto;' },
        { className: 'self-start', styles: 'align-self: flex-start;' },
        { className: 'self-end', styles: 'align-self: flex-end;' },
        { className: 'self-center', styles: 'align-self: center;' },
        { className: 'self-baseline', styles: 'align-self: baseline;' },
        { className: 'self-stretch', styles: 'align-self: stretch;' },
      ]}
      examples={[
        {
          id: 'start',
          title: 'Start',
          description: 'Override a parent\u2019s align-items for a single child.',
          markup: `<div class="flex items-center gap-3 p-4 h-40">
  <div class="${TILE_CLASS}">01</div>
  <div class="self-start ${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
</div>`,
          minHeight: 180,
        },
        {
          id: 'center',
          title: 'Center',
          description: 'Center a single item on the cross axis.',
          markup: `<div class="flex items-stretch gap-3 p-4 h-40">
  <div class="${TILE_CLASS}">01</div>
  <div class="self-center ${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
</div>`,
          minHeight: 180,
        },
        {
          id: 'end',
          title: 'End',
          description: 'Pin a single item to the end of the cross axis.',
          markup: `<div class="flex items-start gap-3 p-4 h-40">
  <div class="${TILE_CLASS}">01</div>
  <div class="self-end ${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
</div>`,
          minHeight: 180,
        },
        {
          id: 'stretch',
          title: 'Stretch',
          description: 'Stretch only one child to fill the cross axis.',
          markup: `<div class="flex items-center gap-3 p-4 h-40">
  <div class="${TILE_CLASS}">01</div>
  <div class="self-stretch ${TILE_CLASS}">02</div>
  <div class="${TILE_CLASS}">03</div>
</div>`,
          minHeight: 180,
        },
      ]}
      responsive={{
        description: 'Stretch on mobile, center from md: and above.',
        code: `<div class="self-stretch md:self-center">\n  <!-- ... -->\n</div>`,
      }}
      prev={{ to: '/docs/reference/align-items', label: 'align-items' }}
      next={{ to: '/docs/reference/align-content', label: 'align-content' }}
    />
  );
}
