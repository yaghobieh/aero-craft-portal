import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Sizing';

export function MinWidthPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="min-width"
      description="Utilities for setting the minimum width of an element."
      quickReference={[
        { className: 'min-w-<number>', styles: 'min-width: calc(var(--spacing) * <number>);' },
        { className: 'min-w-0', styles: 'min-width: 0;' },
        { className: 'min-w-full', styles: 'min-width: 100%;' },
        { className: 'min-w-screen', styles: 'min-width: 100vw;' },
        { className: 'min-w-min', styles: 'min-width: min-content;' },
        { className: 'min-w-max', styles: 'min-width: max-content;' },
        { className: 'min-w-fit', styles: 'min-width: fit-content;' },
        { className: 'min-w-(<custom-property>)', styles: 'min-width: var(<custom-property>);' },
        { className: 'min-w-[<value>]', styles: 'min-width: <value>;' },
      ]}
      examples={[
        {
          id: 'basic',
          title: 'Basic example',
          description: 'Pin a minimum width even when the parent is narrow.',
          markup: `<div class="flex flex-col gap-3 p-4 w-48">
  <div class="min-w-64 ${TILE_CLASS}">min-w-64 — overflows the 48 parent</div>
  <div class="min-w-full ${TILE_CLASS}">min-w-full</div>
</div>`,
        },
        {
          id: 'truncation',
          title: 'Let flex children shrink',
          description:
            'Use min-w-0 on a flex child so long text inside can truncate instead of forcing the flex container wider.',
          markup: `<div class="flex gap-3 p-4 w-full">
  <div class="w-16 ${TILE_CLASS}">01</div>
  <div class="flex-1 min-w-0 ${TILE_CLASS} truncate">A very long truncated label that would otherwise push the layout wider and wider</div>
</div>`,
        },
        {
          id: 'content',
          title: 'Sized to content',
          description: 'min-w-min and min-w-max constrain to intrinsic content size.',
          markup: `<div class="flex flex-col gap-3 p-4">
  <div class="min-w-min ${TILE_CLASS}">min-w-min</div>
  <div class="min-w-max ${TILE_CLASS}">min-w-max — never shrinks below its content</div>
  <div class="min-w-fit ${TILE_CLASS}">min-w-fit</div>
</div>`,
          minHeight: 220,
        },
      ]}
      customValue={{
        description:
          'Use min-w-[<value>] to set any CSS min-width — percentages, pixels, clamp(), etc.',
        bracketCode: `<div class="min-w-[24rem] ...">\n  <!-- ... -->\n</div>`,
        parenDescription:
          'For CSS variables, min-w-(<custom-property>) expands to min-width: var(<custom-property>).',
        parenCode: `<div class="min-w-(--field-min) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Raise the minimum width at larger breakpoints.',
        code: `<div class="min-w-0 md:min-w-[24rem] ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[]}
      shortcutsNote="No dedicated min-width shortcut — it pairs naturally with flex-1 and truncate."
      prev={{ to: '/docs/reference/width', label: 'width' }}
      next={{ to: '/docs/reference/max-width', label: 'max-width' }}
    />
  );
}
