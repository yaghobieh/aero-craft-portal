import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

export function FlexBasisPage() {
  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="flex-basis"
      description="Utilities for controlling the initial size of flex items."
      quickReference={[
        { className: 'basis-<number>', styles: 'flex-basis: calc(var(--spacing) * <number>);' },
        { className: 'basis-<fraction>', styles: 'flex-basis: calc(<fraction> * 100%);' },
        { className: 'basis-auto', styles: 'flex-basis: auto;' },
        { className: 'basis-full', styles: 'flex-basis: 100%;' },
        { className: 'basis-1/2  basis-1/3  basis-1/4  basis-2/3  basis-3/4', styles: 'flex-basis: 50% / 33% / 25% / 66% / 75%' },
        { className: 'basis-(<custom-property>)', styles: 'flex-basis: var(<custom-property>);' },
        { className: 'basis-[<value>]', styles: 'flex-basis: <value>;' },
      ]}
      examples={[
        {
          id: 'fraction',
          title: 'Fractional basis',
          description: 'Use basis-1/3 and basis-2/3 to set the initial size of flex items based on fractions.',
          markup: `<div class="flex p-4 gap-2">
  <div class="basis-1/3 ${TILE_CLASS}">01</div>
  <div class="basis-2/3 ${TILE_CLASS}">02</div>
</div>`,
        },
        {
          id: 'numeric',
          title: 'Numeric basis',
          description: 'Use basis-<number> to set an initial flex-basis on the spacing scale.',
          markup: `<div class="flex p-4 gap-2">
  <div class="basis-24 ${TILE_CLASS}">24</div>
  <div class="basis-64 ${TILE_CLASS}">64</div>
  <div class="basis-96 ${TILE_CLASS}">96</div>
</div>`,
        },
        {
          id: 'full',
          title: 'Full basis',
          description: 'Use basis-full to give a single item the full width, pushing siblings to wrap.',
          markup: `<div class="flex flex-wrap gap-2 p-4">
  <div class="basis-full ${TILE_CLASS}">full</div>
  <div class="basis-1/2 ${TILE_CLASS}">1/2</div>
  <div class="basis-1/2 ${TILE_CLASS}">1/2</div>
</div>`,
          minHeight: 180,
        },
      ]}
      customValue={{
        description: 'Any length works through the [] syntax — underscores become spaces.',
        bracketCode: `<div class="basis-[220px] ...">\n  <!-- ... -->\n</div>`,
        parenDescription: 'Reach for CSS variables with the parentheses syntax.',
        parenCode: `<div class="basis-(--sidebar-width) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Full-width basis on mobile, a third on medium screens and above.',
        code: `<div class="basis-full md:basis-1/3">\n  <!-- ... -->\n</div>`,
      }}
      prev={{ to: '/docs/reference/flex-wrap', label: 'flex-wrap' }}
      next={{ to: '/docs/reference/flex-grow', label: 'flex-grow' }}
    />
  );
}
