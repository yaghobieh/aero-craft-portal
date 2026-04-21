import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

function row(n: number, extra = '') {
  return `<div class="flex ${extra} p-4">\n  <div class="${TILE_CLASS} w-20">01</div>\n  <div class="${TILE_CLASS} w-20">02</div>\n  <div class="${TILE_CLASS} w-20">03</div>\n</div>`
    .replace('flex ', `flex gap-${n} `);
}

export function GapPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="gap"
      description="Utilities for controlling the gaps between grid and flexbox items."
      quickReference={[
        { className: 'gap-<number>', styles: 'gap: calc(var(--spacing) * <number>);' },
        { className: 'gap-x-<number>', styles: 'column-gap: calc(var(--spacing) * <number>);' },
        { className: 'gap-y-<number>', styles: 'row-gap: calc(var(--spacing) * <number>);' },
        { className: 'gap-px  gap-0  gap-0.5 \u2026 gap-96', styles: '1px / 0 / 0.125rem \u2026 24rem' },
        { className: 'gap-(<custom-property>)', styles: 'gap: var(<custom-property>);' },
        { className: 'gap-[<value>]', styles: 'gap: <value>;' },
      ]}
      examples={[
        { id: 'basic', title: 'Basic example', description: 'Control spacing with gap-<number>.', markup: row(4) },
        { id: 'larger', title: 'Larger gap', description: 'Any value on the spacing scale.', markup: row(10) },
        {
          id: 'axis',
          title: 'Per-axis gap',
          description: 'Use gap-x-* and gap-y-* to target a single axis.',
          markup: `<div class="flex flex-wrap gap-x-8 gap-y-2 p-4">
  <div class="w-24 ${TILE_CLASS}">01</div>
  <div class="w-24 ${TILE_CLASS}">02</div>
  <div class="w-24 ${TILE_CLASS}">03</div>
  <div class="w-24 ${TILE_CLASS}">04</div>
  <div class="w-24 ${TILE_CLASS}">05</div>
  <div class="w-24 ${TILE_CLASS}">06</div>
</div>`,
          minHeight: 200,
        },
      ]}
      customValue={{
        description: 'Any length works \u2014 pixels, rems, clamp(), percentages.',
        bracketCode: `<div class="grid grid-cols-3 gap-[5px]">\n  <!-- ... -->\n</div>`,
        parenDescription: 'Drive gap from a design token.',
        parenCode: `<div class="grid gap-(--card-gutter)">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Tight on mobile, roomy on desktop.',
        code: `<div class="grid gap-2 md:gap-6 xl:gap-10">\n  <!-- ... -->\n</div>`,
      }}
      prev={{ to: '/docs/reference/align-content', label: 'align-content' }}
      next={{ to: '/docs/reference/grid-template-columns', label: 'grid-template-columns' }}
    />
  );
}
