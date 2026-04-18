import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

const CATEGORY = 'Flexbox & Grid';

export function FlexPage() {
  return (
    <UtilityReferencePage
      category={CATEGORY}
      title="flex"
      description="Utilities for controlling how flex items both grow and shrink."
      quickReference={[
        { className: 'flex-<number>', styles: 'flex: <number>;' },
        { className: 'flex-<fraction>', styles: 'flex: calc(<fraction> * 100%);' },
        { className: 'flex-auto', styles: 'flex: 1 1 auto;' },
        { className: 'flex-initial', styles: 'flex: 0 1 auto;' },
        { className: 'flex-none', styles: 'flex: none;' },
        { className: 'flex-1', styles: 'flex: 1 1 0%;' },
        { className: 'flex-(<custom-property>)', styles: 'flex: var(<custom-property>);' },
        { className: 'flex-[<value>]', styles: 'flex: <value>;' },
      ]}
      examples={[
        {
          id: 'basic',
          title: 'Basic example',
          description:
            'Use flex-1 to allow an item to grow and shrink as needed, ignoring its initial size.',
          markup: `<div class="flex gap-3 p-4">
  <div class="w-14 flex-none ${TILE_CLASS}">01</div>
  <div class="w-64 flex-1 ${TILE_CLASS}">02</div>
  <div class="w-32 flex-1 ${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'initial',
          title: 'Initial',
          description:
            'Use flex-initial to allow an item to shrink but not grow, taking its initial size into account.',
          markup: `<div class="flex gap-3 p-4">
  <div class="w-14 flex-none ${TILE_CLASS}">01</div>
  <div class="w-64 flex-initial ${TILE_CLASS}">02</div>
  <div class="w-32 flex-initial ${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'auto',
          title: 'Auto',
          description:
            'Use flex-auto to allow an item to grow and shrink, still taking its initial size into account.',
          markup: `<div class="flex gap-3 p-4">
  <div class="w-14 flex-none ${TILE_CLASS}">01</div>
  <div class="w-64 flex-auto ${TILE_CLASS}">02</div>
  <div class="w-32 flex-auto ${TILE_CLASS}">03</div>
</div>`,
        },
        {
          id: 'none',
          title: 'None',
          description: 'Use flex-none to prevent a flex item from growing or shrinking.',
          markup: `<div class="flex gap-3 p-4">
  <div class="w-14 flex-none ${TILE_CLASS}">01</div>
  <div class="w-32 flex-none ${TILE_CLASS}">02</div>
  <div class="flex-1 ${TILE_CLASS}">03</div>
</div>`,
        },
      ]}
      customValue={{
        description: 'Use the flex-[<value>] syntax to set the flex shorthand from a raw value. Underscores become spaces.',
        bracketCode: `<div class="flex-[3_1_auto] ...">\n  <!-- ... -->\n</div>`,
        parenDescription: 'For CSS variables, flex-(<custom-property>) expands to flex: var(<custom-property>). Use double dashes for clarity.',
        parenCode: `<div class="flex-(--my-flex) ...">\n  <!-- ... -->\n</div>`,
      }}
      responsive={{
        description:
          'Prefix any utility with a breakpoint variant like md: to only apply it at a given screen size and above.',
        code: `<div class="flex-none md:flex-1 ...">\n  <!-- ... -->\n</div>`,
      }}
      shortcuts={[
        { name: 'flex-row-center', styles: 'display: flex; flex-direction: row; align-items: center; justify-content: center;', description: 'Row flex + both axes centered. Replaces 4 utilities.' },
        { name: 'flex-col-center', styles: 'display: flex; flex-direction: column; align-items: center; justify-content: center;', description: 'Column flex + both axes centered.' },
        { name: 'flex-between', styles: 'display: flex; align-items: center; justify-content: space-between;', description: 'Classic header layout — logo left, actions right.' },
        { name: 'flex-around', styles: 'display: flex; align-items: center; justify-content: space-around;', description: 'Equal space around each item.' },
        { name: 'flex-evenly', styles: 'display: flex; align-items: center; justify-content: space-evenly;', description: 'Equal space between and around each item.' },
        { name: 'flex-col-start', styles: 'display: flex; flex-direction: column; align-items: flex-start;', description: 'Column flex, pinned to the start.' },
        { name: 'flex-col-end', styles: 'display: flex; flex-direction: column; align-items: flex-end;', description: 'Column flex, pinned to the end.' },
      ]}
      shortcutsNote={
        <>
          AeroCraft ships composite flex shortcuts that collapse 3-4 utilities into one class.
          All of these still compile to a single CSS rule — there is no runtime cost.
        </>
      }
      next={{ to: '/docs/reference/flex-direction', label: 'flex-direction' }}
      prev={{ to: '/docs/reference', label: 'Reference' }}
    />
  );
}
