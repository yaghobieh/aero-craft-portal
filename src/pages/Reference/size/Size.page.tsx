import { UtilityReferencePage } from '@components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Sizing';

export function SizePage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="size"
      description="Utilities for setting the width and height of an element at the same time."
      quickReference={[
        { className: 'size-<number>', styles: 'width: <n>; height: <n>;' },
        { className: 'size-<fraction>', styles: 'width: <%>; height: <%>;' },
        { className: 'size-auto', styles: 'width: auto; height: auto;' },
        { className: 'size-full', styles: 'width: 100%; height: 100%;' },
        { className: 'size-screen', styles: 'width: 100vw; height: 100vh;' },
        { className: 'size-(<custom-property>)', styles: 'width & height: var(<custom-property>);' },
        { className: 'size-[<value>]', styles: 'width: <value>; height: <value>;' },
      ]}
      examples={[
        {
          id: 'icons',
          title: 'Icon & avatar scale',
          description: 'size-<n> is the one-class way to keep square UI elements square.',
          markup: `<div class="flex items-center gap-3 p-4">
  <div class="size-6 rounded-full ${TILE_CLASS}"></div>
  <div class="size-8 rounded-full ${TILE_CLASS}"></div>
  <div class="size-10 rounded-full ${TILE_CLASS}"></div>
  <div class="size-14 rounded-full ${TILE_CLASS}"></div>
  <div class="size-20 rounded-full ${TILE_CLASS}"></div>
</div>`,
          minHeight: 140,
        },
        {
          id: 'fractional',
          title: 'Fractional square',
          description: 'Fractions scale relative to the parent on both axes — great for responsive thumbnails.',
          markup: `<div class="p-4" style="height:180px;">
  <div class="size-1/2 ${TILE_CLASS}">size-1/2</div>
</div>`,
          minHeight: 220,
        },
        {
          id: 'full',
          title: 'Fill the parent',
          description: 'size-full replaces the w-full h-full pair.',
          markup: `<div class="p-4" style="height:160px;">
  <div class="size-full ${TILE_CLASS}">size-full</div>
</div>`,
          minHeight: 200,
        },
      ]}
      customValue={{
        description: 'Use size-[<value>] for bespoke square dimensions.',
        bracketCode: `<button class="size-[2.25rem] ...">\n  <!-- exactly 36px -->\n</button>`,
        parenDescription:
          'For CSS variables, size-(<custom-property>) expands to width & height: var(<custom-property>).',
        parenCode: `<div class="size-(--avatar-size) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description: 'Scale icons up on larger viewports.',
        code: `<div class="size-8 md:size-10 lg:size-12 ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'size-full', styles: 'width: 100%; height: 100%;', description: 'One class instead of w-full h-full.' },
        { name: 'size-screen', styles: 'width: 100vw; height: 100vh;', description: 'Fullscreen overlays.' },
        { name: 'size-<n>', styles: 'width: <n>; height: <n>;', description: 'All squares in one utility — avatars, icons, color chips.' },
      ]}
      shortcutsNote="size-* is one of AeroCraft's most-used composite utilities. It replaces the w-X h-X pair you write 100+ times in a real app."
      prev={{ to: '/docs/reference/max-height', label: 'max-height' }}
      next={{ to: '/docs/reference', label: 'Reference home' }}
    />
  );
}
