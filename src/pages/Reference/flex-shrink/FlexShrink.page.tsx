import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

export function FlexShrinkPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="flex-shrink"
      description="Utilities for controlling how flex items shrink."
      quickReference={[
        { className: 'shrink', styles: 'flex-shrink: 1;' },
        { className: 'shrink-0', styles: 'flex-shrink: 0;' },
        { className: 'shrink-<number>', styles: 'flex-shrink: <number>;' },
        { className: 'shrink-(<custom-property>)', styles: 'flex-shrink: var(<custom-property>);' },
        { className: 'shrink-[<value>]', styles: 'flex-shrink: <value>;' },
      ]}
      examples={[
        {
          id: 'shrink',
          title: 'Allow shrinking',
          description: 'Use shrink to let a flex item shrink below its initial size.',
          markup: `<div class="flex p-4 gap-2 w-full">
  <div class="w-14 flex-none ${TILE_CLASS}">01</div>
  <div class="w-64 shrink ${TILE_CLASS}">shrinkable</div>
  <div class="w-14 flex-none ${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'dont-shrink',
          title: 'Don\u2019t shrink',
          description: 'Use shrink-0 to prevent an item from shrinking when space is tight.',
          markup: `<div class="flex p-4 gap-2 w-full">
  <div class="w-14 shrink-0 ${TILE_CLASS}">01</div>
  <div class="w-full shrink ${TILE_CLASS}">this shrinks</div>
  <div class="w-14 shrink-0 ${TILE_CLASS}">03</div>
</div>`,
        },
      ]}
      customValue={{
        description: 'Fine-tune shrink behavior with a specific factor.',
        bracketCode: `<div class="shrink-[0.5] ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Keep the sidebar fixed on mobile, let it shrink on large screens.',
        code: `<aside class="shrink-0 lg:shrink">\n  <!-- ... -->\n</aside>`,
      }}
      prev={{ to: '/docs/reference/flex-grow', label: 'flex-grow' }}
      next={{ to: '/docs/reference/order', label: 'order' }}
    />
  );
}
