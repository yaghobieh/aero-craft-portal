import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Sizing';

export function WidthPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="width"
      description="Utilities for setting the width of an element."
      quickReference={[
        { className: 'w-<number>', styles: 'width: calc(var(--spacing) * <number>);' },
        { className: 'w-<fraction>', styles: 'width: calc(<fraction> * 100%);' },
        { className: 'w-auto', styles: 'width: auto;' },
        { className: 'w-px', styles: 'width: 1px;' },
        { className: 'w-full', styles: 'width: 100%;' },
        { className: 'w-screen', styles: 'width: 100vw;' },
        { className: 'w-min', styles: 'width: min-content;' },
        { className: 'w-max', styles: 'width: max-content;' },
        { className: 'w-fit', styles: 'width: fit-content;' },
        { className: 'w-(<custom-property>)', styles: 'width: var(<custom-property>);' },
        { className: 'w-[<value>]', styles: 'width: <value>;' },
      ]}
      examples={[
        {
          id: 'fixed',
          title: 'Fixed width',
          description: 'Use w-<number> for fixed-size widths from the spacing scale.',
          markup: `<div class="flex gap-3 p-4">
  <div class="w-8 ${TILE_CLASS}">w-8</div>
  <div class="w-16 ${TILE_CLASS}">w-16</div>
  <div class="w-32 ${TILE_CLASS}">w-32</div>
  <div class="w-64 ${TILE_CLASS}">w-64</div>
</div>`,
        },
        {
          id: 'fractional',
          title: 'Fractional',
          description: 'Use w-<fraction> for percentage widths relative to the parent.',
          markup: `<div class="flex gap-2 p-4">
  <div class="w-1/4 ${TILE_CLASS}">1/4</div>
  <div class="w-1/4 ${TILE_CLASS}">1/4</div>
  <div class="w-1/2 ${TILE_CLASS}">1/2</div>
</div>`,
        },
        {
          id: 'full',
          title: 'Full width',
          description: 'Use w-full to stretch an element to fill its parent.',
          markup: `<div class="p-4">
  <div class="w-full ${TILE_CLASS}">w-full</div>
</div>`,
        },
        {
          id: 'content',
          title: 'Sized to content',
          description:
            'w-min, w-max and w-fit size the element based on its intrinsic content — handy for chips and pills.',
          markup: `<div class="flex flex-col gap-3 p-4">
  <div class="w-max ${TILE_CLASS}">w-max — shrinks to the longest line</div>
  <div class="w-min ${TILE_CLASS}">w-min — wraps at longest word</div>
  <div class="w-fit ${TILE_CLASS}">w-fit</div>
</div>`,
          minHeight: 220,
        },
      ]}
      customValue={{
        description:
          'Use w-[<value>] to set any CSS width value, including px, rem, %, vw, clamp(), min()/max() and calc().',
        bracketCode: `<div class="w-[32rem] ...">\n  <!-- ... -->\n</div>\n\n<div class="w-[clamp(240px,40vw,640px)] ...">\n  <!-- responsive, no breakpoints needed -->\n</div>`,
        parenDescription:
          'For CSS variables, w-(<custom-property>) expands to width: var(<custom-property>).',
        parenCode: `<div class="w-(--card-width) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description:
          'Stack full-width on mobile, constrain on larger screens.',
        code: `<div class="w-full md:w-1/2 lg:w-1/3 ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'size-full', styles: 'width: 100%; height: 100%;', description: 'Fill parent in both dimensions. Replaces w-full h-full.' },
        { name: 'size-screen', styles: 'width: 100vw; height: 100vh;', description: 'Full viewport. Replaces w-screen h-screen.' },
        { name: 'size-<n>', styles: 'width: <n>; height: <n>;', description: 'Square elements — avatars, icons, tokens. Replaces w-<n> h-<n>.' },
      ]}
      shortcutsNote="AeroCraft ships size-* shortcuts for the common square pattern — one class instead of two."
      prev={{ to: '/docs/reference/place-self', label: 'place-self' }}
      next={{ to: '/docs/reference/min-width', label: 'min-width' }}
    />
  );
}
