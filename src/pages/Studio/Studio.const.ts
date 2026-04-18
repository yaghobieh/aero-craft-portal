export const STUDIO_SECTIONS = [
  { titleKey: 'panelFlex', keys: ['flex-row', 'flex-col', 'flex-col-center', 'flex-row-center', 'items-center', 'justify-center', 'items-start', 'justify-between', 'gap-2', 'gap-4', 'gap-6'] },
  { titleKey: 'panelGrid', keys: ['grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'] },
  { titleKey: 'panelGapSpacing', keys: ['p-2', 'p-4', 'p-6', 'p-8', 'px-4', 'py-6', 'mx-auto', 'mt-4'] },
  { titleKey: 'panelSize', keys: ['w-full', 'w-auto', 'min-h-screen', 'max-w-md', 'max-w-lg'] },
  { titleKey: 'panelPosition', keys: ['relative', 'sticky', 'absolute'] },
  { titleKey: 'panelDisplayOverflow', keys: ['block', 'inline-block', 'hidden', 'overflow-auto', 'overflow-hidden'] },
  { titleKey: 'panelMotion', keys: ['transition', 'transition-slow'] },
  { titleKey: 'panelInteractive', keys: ['cursor-pointer', 'select-none'] },
] as const;

export type StudioToggleClass = (typeof STUDIO_SECTIONS)[number]['keys'][number];

export const STUDIO_DEFAULT_ENABLED: Record<StudioToggleClass, boolean> = {
  'flex-row': true,
  'flex-col': false,
  'flex-col-center': false,
  'flex-row-center': false,
  'items-center': true,
  'justify-center': true,
  'items-start': false,
  'justify-between': false,
  'gap-2': false,
  'gap-4': true,
  'gap-6': false,
  grid: false,
  'grid-cols-1': false,
  'grid-cols-2': false,
  'grid-cols-3': false,
  'grid-cols-4': false,
  'p-2': false,
  'p-4': true,
  'p-6': false,
  'p-8': false,
  'px-4': false,
  'py-6': false,
  'mx-auto': false,
  'mt-4': false,
  'w-full': false,
  'w-auto': false,
  'min-h-screen': false,
  'max-w-md': false,
  'max-w-lg': false,
  relative: false,
  sticky: false,
  absolute: false,
  block: false,
  'inline-block': false,
  hidden: false,
  'overflow-auto': false,
  'overflow-hidden': false,
  transition: true,
  'transition-slow': false,
  'cursor-pointer': true,
  'select-none': false,
} as Record<StudioToggleClass, boolean>;

export type StudioBlockPreset = {
  id: string;
  title: string;
  description: string;
  markup: string;
  relatedClasses?: string[];
};

export const STUDIO_PRESETS: StudioBlockPreset[] = [
  {
    id: 'hero',
    title: 'Hero section',
    description: 'Centered title + subtitle + CTA row',
    relatedClasses: ['flex-col-center', 'gap-4', 'p-8', 'w-full', 'mx-auto', 'max-w-lg', 'text-center', 'rounded-lg'],
    markup: `<section class="flex-col-center gap-4 p-8 w-full">
  <span class="font-bold" style="font-size:32px">AeroCraft</span>
  <span style="max-width:540px;opacity:.8;text-align:center">Composable utility classes. Edit me on the right.</span>
  <div class="flex-row gap-3">
    <button class="cursor-pointer p-3" style="background:#2563EB;color:#fff;border:0;border-radius:8px">Get started</button>
    <button class="cursor-pointer p-3" style="background:transparent;color:#2563EB;border:1px solid #2563EB;border-radius:8px">Docs</button>
  </div>
</section>`,
  },
  {
    id: 'features-grid',
    title: 'Features grid (3 cols)',
    description: 'Three feature cards side-by-side',
    relatedClasses: ['grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'gap-3', 'gap-4', 'gap-6', 'p-4', 'p-6', 'p-8', 'w-full'],
    markup: `<div class="grid grid-cols-3 gap-4 p-6 w-full">
  <div class="p-4" style="background:rgba(37,99,235,.12);border-radius:10px">Fast</div>
  <div class="p-4" style="background:rgba(37,99,235,.12);border-radius:10px">Typed</div>
  <div class="p-4" style="background:rgba(37,99,235,.12);border-radius:10px">Composable</div>
</div>`,
  },
  {
    id: 'navbar',
    title: 'Navbar',
    description: 'Logo + links + CTA',
    relatedClasses: ['flex-row', 'items-center', 'justify-between', 'gap-4', 'p-4', 'px-6', 'w-full', 'sticky'],
    markup: `<nav class="flex-row items-center justify-between p-4 w-full">
  <span class="font-bold">AeroCraft</span>
  <div class="flex-row gap-4 items-center">
    <a href="#" style="opacity:.8">Docs</a>
    <a href="#" style="opacity:.8">Studio</a>
    <button class="cursor-pointer p-2" style="background:#2563EB;color:#fff;border:0;border-radius:6px">Sign up</button>
  </div>
</nav>`,
  },
  {
    id: 'cta',
    title: 'CTA banner',
    description: 'Big banner with centered CTA',
    relatedClasses: ['flex-col-center', 'items-center', 'justify-center', 'gap-3', 'gap-4', 'p-8', 'p-6', 'w-full', 'rounded-lg'],
    markup: `<section class="flex-col-center gap-3 p-8 w-full" style="background:linear-gradient(135deg,#2563EB,#22D3EE);border-radius:12px;color:#fff">
  <span class="font-bold" style="font-size:24px">Ship in minutes.</span>
  <span style="opacity:.9">Drop AeroCraft into any framework, zero config.</span>
  <button class="cursor-pointer p-3" style="background:#fff;color:#2563EB;border:0;border-radius:8px;font-weight:700">Install</button>
</section>`,
  },
  {
    id: 'card',
    title: 'Card',
    description: 'Padded card with title + body',
    relatedClasses: ['p-4', 'p-6', 'p-8', 'flex-col', 'gap-2', 'gap-3', 'rounded-md', 'rounded-lg', 'max-w-md', 'max-w-lg'],
    markup: `<div class="p-6" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;max-width:360px">
  <div class="flex-col gap-2">
    <span class="font-bold" style="font-size:18px">Card title</span>
    <span style="opacity:.75">Edit the class list on the right to restyle this card live.</span>
  </div>
</div>`,
  },
  {
    id: 'stack',
    title: 'Vertical stack',
    description: 'Three stacked items with gap',
    relatedClasses: ['flex-col', 'gap-2', 'gap-3', 'gap-4', 'gap-6', 'p-2', 'p-4', 'p-6', 'w-full', 'items-stretch'],
    markup: `<div class="flex-col gap-3 p-4 w-full">
  <div class="p-3" style="background:rgba(37,99,235,.15);border-radius:8px">Item 1</div>
  <div class="p-3" style="background:rgba(37,99,235,.15);border-radius:8px">Item 2</div>
  <div class="p-3" style="background:rgba(37,99,235,.15);border-radius:8px">Item 3</div>
</div>`,
  },
];
