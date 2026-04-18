import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

export function FlexGrowPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="flex-grow"
      description="Utilities for controlling how flex items grow."
      quickReference={[
        { className: 'grow', styles: 'flex-grow: 1;' },
        { className: 'grow-0', styles: 'flex-grow: 0;' },
        { className: 'grow-<number>', styles: 'flex-grow: <number>;' },
        { className: 'grow-(<custom-property>)', styles: 'flex-grow: var(<custom-property>);' },
        { className: 'grow-[<value>]', styles: 'flex-grow: <value>;' },
      ]}
      examples={[
        {
          id: 'grow',
          title: 'Allow growing',
          description: 'Use grow to let a flex item grow and fill any remaining space.',
          markup: `<div class="flex p-4 gap-2">
  <div class="w-14 ${TILE_CLASS}">01</div>
  <div class="w-14 grow ${TILE_CLASS}">02</div>
  <div class="w-14 ${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'dont-grow',
          title: 'Don\u2019t grow',
          description: 'Use grow-0 to prevent a flex item from growing.',
          markup: `<div class="flex p-4 gap-2">
  <div class="w-14 grow ${TILE_CLASS}">01</div>
  <div class="w-14 grow-0 ${TILE_CLASS}">02</div>
  <div class="w-14 grow ${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'grow-factor',
          title: 'Grow factors',
          description: 'Use grow-<number> to control how much an item grows relative to its siblings.',
          markup: `<div class="flex p-4 gap-2">
  <div class="grow-[1] ${TILE_CLASS}">1</div>
  <div class="grow-[2] ${TILE_CLASS}">2</div>
  <div class="grow-[3] ${TILE_CLASS}">3</div>
</div>`,
        },
      ]}
      customValue={{
        description: 'Set any grow factor through the [] syntax.',
        bracketCode: `<div class="grow-[2] ...">\n  <!-- ... -->\n</div>`,
        parenDescription: 'Or plug in a CSS variable.',
        parenCode: `<div class="grow-(--ratio) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Normal flex on mobile, grow on large screens.',
        code: `<div class="grow-0 lg:grow">\n  <!-- ... -->\n</div>`,
      }}
      prev={{ to: '/docs/reference/flex-basis', label: 'flex-basis' }}
      next={{ to: '/docs/reference/flex-shrink', label: 'flex-shrink' }}
    />
  );
}
