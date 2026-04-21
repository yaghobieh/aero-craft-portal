import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Sizing';

export function MaxWidthPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="max-width"
      description="Utilities for setting the maximum width of an element."
      quickReference={[
        { className: 'max-w-<number>', styles: 'max-width: calc(var(--spacing) * <number>);' },
        { className: 'max-w-xs / sm / md / lg / xl', styles: 'max-width: 320px → 576px;' },
        { className: 'max-w-2xl / 3xl / 4xl / 5xl / 6xl / 7xl', styles: 'max-width: 672px → 1280px;' },
        { className: 'max-w-none', styles: 'max-width: none;' },
        { className: 'max-w-full', styles: 'max-width: 100%;' },
        { className: 'max-w-screen', styles: 'max-width: 100vw;' },
        { className: 'max-w-(<custom-property>)', styles: 'max-width: var(<custom-property>);' },
        { className: 'max-w-[<value>]', styles: 'max-width: <value>;' },
      ]}
      examples={[
        {
          id: 'prose',
          title: 'Readable prose',
          description: 'Use max-w-md or max-w-prose-like values to keep line length comfortable.',
          markup: `<div class="p-4">
  <p class="max-w-md ${TILE_CLASS}" style="white-space:normal;">
    Line length that is too long becomes hard to read. max-w-md caps the paragraph at 448px — a well-studied readable width.
  </p>
</div>`,
          minHeight: 160,
        },
        {
          id: 'container',
          title: 'Page container',
          description: 'max-w-7xl centered with mx-auto is a classic content wrapper.',
          markup: `<div class="p-4">
  <div class="max-w-7xl mx-auto ${TILE_CLASS}">max-w-7xl mx-auto</div>
</div>`,
        },
        {
          id: 'named',
          title: 'Named sizes',
          description: 'Pick from the t-shirt scale for consistent layout widths.',
          markup: `<div class="flex flex-col gap-3 p-4">
  <div class="max-w-xs ${TILE_CLASS}">max-w-xs · 320px</div>
  <div class="max-w-sm ${TILE_CLASS}">max-w-sm · 384px</div>
  <div class="max-w-md ${TILE_CLASS}">max-w-md · 448px</div>
  <div class="max-w-lg ${TILE_CLASS}">max-w-lg · 512px</div>
  <div class="max-w-xl ${TILE_CLASS}">max-w-xl · 576px</div>
</div>`,
          minHeight: 320,
        },
        {
          id: 'reset',
          title: 'Reset an existing cap',
          description: 'Use max-w-none to remove a max-width set on a parent or at a smaller breakpoint.',
          markup: `<div class="max-w-md md:max-w-none p-4 ${TILE_CLASS}">max-w-md md:max-w-none</div>`,
        },
      ]}
      customValue={{
        description: 'Use max-w-[<value>] for any bespoke width — including clamp() for fluid caps.',
        bracketCode: `<div class="max-w-[65ch] ...">\n  <!-- 65 characters wide -->\n</div>\n\n<div class="max-w-[clamp(320px,60vw,960px)] ...">\n  <!-- ... -->\n</div>`,
        parenDescription:
          'For CSS variables, max-w-(<custom-property>) expands to max-width: var(<custom-property>).',
        parenCode: `<div class="max-w-(--content-max) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Grow the cap as the viewport gets larger.',
        code: `<div class="max-w-md md:max-w-2xl lg:max-w-5xl ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="max-width is most powerful when paired with mx-auto to build centered content containers."
      prev={{ to: '/docs/reference/min-width', label: 'min-width' }}
      next={{ to: '/docs/reference/height', label: 'height' }}
    />
  );
}
