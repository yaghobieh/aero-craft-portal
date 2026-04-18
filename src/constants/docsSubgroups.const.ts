export type DocSubgroupDef = {
  id: string;
  keys: string[];
};

export const DOC_SUBGROUPS: Partial<Record<string, DocSubgroupDef[]>> = {
  grid: [
    { id: 'gridLayout', keys: ['grid-center', 'grid-auto-fill', 'grid-auto-fit'] },
    { id: 'gridColumns', keys: ['grid-2', 'grid-3', 'grid-4', 'grid-6', 'grid-12'] },
  ],
  position: [
    { id: 'absolute', keys: ['absolute-center', 'absolute-fill', 'absolute-x-center', 'absolute-y-center', 'absolute-top', 'absolute-bottom'] },
    { id: 'fixed', keys: ['fixed-fill', 'fixed-top', 'fixed-bottom'] },
    { id: 'sticky', keys: ['sticky-top'] },
  ],
  text: [
    { id: 'truncate', keys: ['text-ellipsis'] },
    { id: 'textWrap', keys: ['text-balance', 'text-pretty'] },
    { id: 'lineClamp', keys: ['line-clamp-2', 'line-clamp-3'] },
  ],
  display: [
    { id: 'blockFlow', keys: ['block', 'inline-block', 'hidden'] },
    { id: 'inlineLayout', keys: ['inline-flex', 'inline-grid'] },
    { id: 'a11y', keys: ['sr-only'] },
  ],
  overflow: [
    { id: 'overflowAll', keys: ['overflow-hidden', 'overflow-auto', 'overflow-scroll'] },
    { id: 'overflowAxis', keys: ['overflow-x-auto', 'overflow-y-auto', 'overflow-x-hidden', 'overflow-y-hidden'] },
  ],
  cursor: [{ id: 'cursorAll', keys: [] }],
  transition: [
    { id: 'transitionTiming', keys: ['transition', 'transition-fast', 'transition-slow', 'transition-none'] },
    { id: 'transitionProperty', keys: ['transition-transform', 'transition-opacity'] },
  ],
  interactive: [
    { id: 'pointerEvents', keys: ['pointer-none', 'pointer-auto'] },
    { id: 'userSelect', keys: ['select-none', 'select-all', 'select-text'] },
    { id: 'focusChrome', keys: ['outline-none', 'appearance-none'] },
  ],
};

export const SPACING_SUBGROUP_PREFIXES: Array<{ id: string; test: (name: string) => boolean }> = [
  { id: 'paddingAll', test: (n) => /^p-\d+$/.test(n) },
  { id: 'paddingAxis', test: (n) => /^px-\d+$/.test(n) || /^py-\d+$/.test(n) },
  { id: 'paddingSides', test: (n) => /^(pt|pr|pb|pl)-\d+$/.test(n) },
  { id: 'marginAll', test: (n) => /^m-\d+$/.test(n) },
  { id: 'marginAxis', test: (n) => /^mx-\d+$/.test(n) || /^my-\d+$/.test(n) },
  { id: 'marginSides', test: (n) => /^(mt|mr|mb|ml)-\d+$/.test(n) },
  { id: 'marginAuto', test: (n) => n === 'm-auto' || n === 'mx-auto' || n === 'my-auto' },
];

export const GAP_SUBGROUP_PREFIXES: Array<{ id: string; test: (name: string) => boolean }> = [
  { id: 'gapAll', test: (n) => /^gap-\d+$/.test(n) },
  { id: 'gapAxis', test: (n) => n.startsWith('gap-x-') || n.startsWith('gap-y-') },
];
