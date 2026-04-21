import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Sizing';

export function HeightPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="height"
      description="Utilities for setting the height of an element."
      quickReference={[
        { className: 'h-<number>', styles: 'height: calc(var(--spacing) * <number>);' },
        { className: 'h-<fraction>', styles: 'height: calc(<fraction> * 100%);' },
        { className: 'h-auto', styles: 'height: auto;' },
        { className: 'h-px', styles: 'height: 1px;' },
        { className: 'h-full', styles: 'height: 100%;' },
        { className: 'h-screen', styles: 'height: 100vh;' },
        { className: 'h-min', styles: 'height: min-content;' },
        { className: 'h-max', styles: 'height: max-content;' },
        { className: 'h-fit', styles: 'height: fit-content;' },
        { className: 'h-(<custom-property>)', styles: 'height: var(<custom-property>);' },
        { className: 'h-[<value>]', styles: 'height: <value>;' },
      ]}
      examples={[
        {
          id: 'fixed',
          title: 'Fixed height',
          description: 'Use h-<number> for fixed-size heights from the spacing scale.',
          markup: `<div class="flex items-end gap-3 p-4">
  <div class="h-8 w-8 ${TILE_CLASS}">8</div>
  <div class="h-16 w-8 ${TILE_CLASS}">16</div>
  <div class="h-24 w-8 ${TILE_CLASS}">24</div>
  <div class="h-32 w-8 ${TILE_CLASS}">32</div>
</div>`,
          minHeight: 200,
        },
        {
          id: 'full',
          title: 'Fill the parent',
          description: 'Use h-full to take the full height of a sized parent.',
          markup: `<div class="flex gap-3 p-4" style="height:180px;">
  <div class="h-full w-16 ${TILE_CLASS}">h-full</div>
  <div class="h-1/2 w-16 ${TILE_CLASS}">h-1/2</div>
  <div class="h-auto w-16 ${TILE_CLASS}">h-auto</div>
</div>`,
          minHeight: 220,
        },
        {
          id: 'screen',
          title: 'Viewport',
          description:
            'h-screen pins the element to 100vh. For mobile-safe fills, use arbitrary h-[100dvh].',
          markup: `<div class="p-4">
  <div class="h-[140px] ${TILE_CLASS}">h-[140px]</div>
</div>`,
        },
        {
          id: 'content',
          title: 'Sized to content',
          description: 'h-min, h-max and h-fit adapt to the intrinsic content.',
          markup: `<div class="flex gap-3 p-4 items-start">
  <div class="h-max ${TILE_CLASS}" style="white-space:normal; width:140px;">h-max wraps content naturally</div>
  <div class="h-fit ${TILE_CLASS}" style="white-space:normal; width:140px;">h-fit fits content</div>
</div>`,
          minHeight: 200,
        },
      ]}
      customValue={{
        description: 'Use h-[<value>] for bespoke heights — svh, dvh, clamp(), calc().',
        bracketCode: `<section class="h-[100dvh] ...">\n  <!-- full dynamic viewport height -->\n</section>\n\n<div class="h-[clamp(240px,40vh,480px)] ...">\n  <!-- ... -->\n</div>`,
        parenDescription:
          'For CSS variables, h-(<custom-property>) expands to height: var(<custom-property>).',
        parenCode: `<div class="h-(--panel-h) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Grow a hero section height on larger viewports.',
        code: `<section class="h-[60vh] md:h-[70vh] lg:h-[80vh] ...">\n  <!-- ... -->\n</section>`,
      }}
      shortcuts={[
        { name: 'size-full', styles: 'width: 100%; height: 100%;', description: 'Fill parent in both dimensions.' },
        { name: 'size-screen', styles: 'width: 100vw; height: 100vh;', description: 'Full viewport.' },
        { name: 'size-<n>', styles: 'width: <n>; height: <n>;', description: 'Square elements (avatars, icons).' },
      ]}
      shortcutsNote="Pair h-* with overflow-y-auto to build scrollable panels with a fixed outer height."
      prev={{ to: '/docs/reference/max-width', label: 'max-width' }}
      next={{ to: '/docs/reference/min-height', label: 'min-height' }}
    />
  );
}
