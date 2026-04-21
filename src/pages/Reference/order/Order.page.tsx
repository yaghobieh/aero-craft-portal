import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

export function OrderPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="order"
      description="Utilities for controlling the order of flex and grid items."
      quickReference={[
        { className: 'order-<number>', styles: 'order: <number>;' },
        { className: 'order-first', styles: 'order: -9999;' },
        { className: 'order-last', styles: 'order: 9999;' },
        { className: 'order-none', styles: 'order: 0;' },
        { className: 'order-(<custom-property>)', styles: 'order: var(<custom-property>);' },
        { className: 'order-[<value>]', styles: 'order: <value>;' },
      ]}
      examples={[
        {
          id: 'basic',
          title: 'Basic example',
          description: 'Use order-<number> to render items in a different order than they appear in the DOM.',
          markup: `<div class="flex gap-3 p-4">
  <div class="order-3 ${TILE_CLASS}">01</div>
  <div class="order-1 ${TILE_CLASS}">02</div>
  <div class="order-2 ${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'first-last',
          title: 'First and last',
          description: 'Use order-first and order-last to push items to the edges.',
          markup: `<div class="flex gap-3 p-4">
  <div class="order-last ${TILE_CLASS}">I was first</div>
  <div class="${TILE_CLASS}">02</div>
  <div class="order-first ${TILE_CLASS}">I was last</div>
</div>`,
        },
      ]}
      customValue={{
        description: 'Set any order through the [] syntax.',
        bracketCode: `<div class="order-[7] ...">\n  <!-- ... -->\n</div>`,
        parenDescription: 'Or bind it to a CSS variable.',
        parenCode: `<div class="order-(--my-order) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Switch item order only on large screens — handy for sidebar layouts.',
        code: `<aside class="order-last lg:order-first">\n  <!-- ... -->\n</aside>`,
      }}
      prev={{ to: '/docs/reference/flex-shrink', label: 'flex-shrink' }}
      next={{ to: '/docs/reference/justify-content', label: 'justify-content' }}
    />
  );
}
