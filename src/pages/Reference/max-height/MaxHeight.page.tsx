import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Sizing';

export function MaxHeightPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="max-height"
      description="Utilities for setting the maximum height of an element."
      quickReference={[
        { className: 'max-h-<number>', styles: 'max-height: calc(var(--spacing) * <number>);' },
        { className: 'max-h-full', styles: 'max-height: 100%;' },
        { className: 'max-h-screen', styles: 'max-height: 100vh;' },
        { className: 'max-h-none', styles: 'max-height: none;' },
        { className: 'max-h-(<custom-property>)', styles: 'max-height: var(<custom-property>);' },
        { className: 'max-h-[<value>]', styles: 'max-height: <value>;' },
      ]}
      examples={[
        {
          id: 'scroll',
          title: 'Scrollable region',
          description: 'Cap a long list at a fixed height and let the rest scroll.',
          markup: `<div class="p-4">
  <ul class="max-h-40 overflow-y-auto ${TILE_CLASS}" style="white-space:normal;">
    <li>Item 01</li><li>Item 02</li><li>Item 03</li><li>Item 04</li>
    <li>Item 05</li><li>Item 06</li><li>Item 07</li><li>Item 08</li>
    <li>Item 09</li><li>Item 10</li><li>Item 11</li><li>Item 12</li>
  </ul>
</div>`,
          minHeight: 220,
        },
        {
          id: 'modal',
          title: 'Modal cap',
          description: 'Limit a modal body so tall content scrolls inside without the dialog growing off-screen.',
          markup: `<div class="p-4">
  <div class="max-h-[60vh] overflow-y-auto ${TILE_CLASS}" style="white-space:normal;">
    Long modal body content scrolls internally. The dialog chrome stays put.
  </div>
</div>`,
        },
        {
          id: 'reset',
          title: 'Reset an inherited cap',
          description: 'max-h-none removes a max-height set at a smaller breakpoint.',
          markup: `<div class="max-h-40 md:max-h-none ${TILE_CLASS} p-4">max-h-40 md:max-h-none</div>`,
        },
      ]}
      customValue={{
        description: 'Use max-h-[<value>] to set any CSS max-height.',
        bracketCode: `<div class="max-h-[75vh] ...">\n  <!-- ... -->\n</div>`,
        parenDescription:
          'For CSS variables, max-h-(<custom-property>) expands to max-height: var(<custom-property>).',
        parenCode: `<div class="max-h-(--drawer-max) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Cap lists short on mobile, grow them on desktop.',
        code: `<ul class="max-h-40 md:max-h-80 lg:max-h-[60vh] overflow-y-auto ...">\n  <!-- ... -->\n</ul>`,
      }}
      shortcuts={[]}
      shortcutsNote="Pair with overflow-y-auto for scroll panels; with overflow-hidden for masked hero graphics."
      prev={{ to: '/docs/reference/min-height', label: 'min-height' }}
      next={{ to: '/docs/reference/size', label: 'size' }}
    />
  );
}
