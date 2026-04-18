import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Sizing';

export function MinHeightPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="min-height"
      description="Utilities for setting the minimum height of an element."
      quickReference={[
        { className: 'min-h-<number>', styles: 'min-height: calc(var(--spacing) * <number>);' },
        { className: 'min-h-0', styles: 'min-height: 0;' },
        { className: 'min-h-full', styles: 'min-height: 100%;' },
        { className: 'min-h-screen', styles: 'min-height: 100vh;' },
        { className: 'min-h-min', styles: 'min-height: min-content;' },
        { className: 'min-h-max', styles: 'min-height: max-content;' },
        { className: 'min-h-fit', styles: 'min-height: fit-content;' },
        { className: 'min-h-(<custom-property>)', styles: 'min-height: var(<custom-property>);' },
        { className: 'min-h-[<value>]', styles: 'min-height: <value>;' },
      ]}
      examples={[
        {
          id: 'hero',
          title: 'Full-viewport hero',
          description:
            'min-h-screen is the canonical hero pattern — the section is at least one viewport tall but grows with content.',
          markup: `<section class="min-h-[180px] flex items-center justify-center p-4">
  <div class="${TILE_CLASS}">Centered hero — min-h set on parent</div>
</section>`,
          minHeight: 220,
        },
        {
          id: 'floor',
          title: 'Minimum card floor',
          description: 'Guarantee a card never shrinks below a chosen height.',
          markup: `<div class="flex gap-3 p-4">
  <div class="min-h-24 ${TILE_CLASS}">01</div>
  <div class="min-h-24 ${TILE_CLASS}">02</div>
  <div class="min-h-24 ${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'reset',
          title: 'Let flex child shrink',
          description: 'min-h-0 on a flex item allows overflow containers to compute inner heights correctly.',
          markup: `<div class="flex flex-col gap-3 p-4" style="height:180px;">
  <div class="flex-1 min-h-0 overflow-auto ${TILE_CLASS}" style="white-space:normal;">
    Scrolls now instead of pushing the parent taller. min-h-0 is the fix.
  </div>
</div>`,
          minHeight: 220,
        },
      ]}
      customValue={{
        description: 'Use min-h-[<value>] for any bespoke floor.',
        bracketCode: `<section class="min-h-[70vh] ...">\n  <!-- ... -->\n</section>`,
        parenDescription:
          'For CSS variables, min-h-(<custom-property>) expands to min-height: var(<custom-property>).',
        parenCode: `<div class="min-h-(--row-min) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Raise the floor on wider viewports.',
        code: `<section class="min-h-[40vh] md:min-h-[70vh] ...">\n  <!-- ... -->\n</section>`,
      }}
      shortcuts={[]}
      shortcutsNote="min-h-0 + flex-1 + overflow-auto is the trio you need for scrollable panels inside flex layouts."
      prev={{ to: '/docs/reference/height', label: 'height' }}
      next={{ to: '/docs/reference/max-height', label: 'max-height' }}
    />
  );
}
