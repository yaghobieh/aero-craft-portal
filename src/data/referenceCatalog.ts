import type {
  QuickRefRow,
  ShortcutRow,
  UtilityExample,
  UtilityReferencePageProps,
  CustomValueBlock,
  ResponsiveBlock,
} from '../components/UtilityReference/UtilityReference.types';
import type { PortalCategoryId } from '../constants/portalCategories.const';
import { PORTAL_CATEGORIES, getPrevNext } from '../constants/portalCategories.const';
import { getAutoShortcutsForProperty } from './referenceShortcuts';

export interface CatalogEntry {
  category: PortalCategoryId;
  title: string;
  description: string;
  quickReference: QuickRefRow[];
  examples: UtilityExample[];
  customValue?: CustomValueBlock;
  responsive?: ResponsiveBlock;
  shortcuts?: ShortcutRow[];
  shortcutsNote?: string;
}

const TILE =
  'inline-flex items-center justify-center px-4 py-2 rounded-md background-[#d70f66] color-white font-semibold';

const CAT_LABELS: Record<PortalCategoryId, string> = Object.fromEntries(
  PORTAL_CATEGORIES.map((c) => [c.id, c.label]),
) as Record<PortalCategoryId, string>;

function qr(className: string, styles: string): QuickRefRow {
  return { className, styles };
}
function tile(cls: string, label = cls): string {
  return `<div class="flex gap-3 p-4 flex-wrap"><div class="${TILE} ${cls}">${label}</div></div>`;
}
function textTile(cls: string, label = cls): string {
  return `<div class="p-4"><p class="color-gray-900 ${cls}">${label} — the quick brown fox jumps over the lazy dog.</p></div>`;
}
function ex(id: string, title: string, description: string, markup: string): UtilityExample {
  return { id, title, description, markup };
}

function simpleEntry(opts: {
  slug: string;
  category: PortalCategoryId;
  description: string;
  classes: Array<{ name: string; styles: string; note?: string }>;
  makeExample?: (name: string) => string;
  shortcuts?: ShortcutRow[];
  customValue?: CustomValueBlock;
  examples?: UtilityExample[];
}): CatalogEntry {
  const quickReference = opts.classes.map((c) => qr(c.name, c.styles));
  const exMake = opts.makeExample ?? ((n: string) => tile(n));
  const examples =
    opts.examples ??
    opts.classes.map((c) => ex(c.name, c.name, c.note ?? `${c.name} — ${c.styles}`, exMake(c.name)));
  return {
    category: opts.category,
    title: opts.slug,
    description: opts.description,
    quickReference,
    examples,
    customValue: opts.customValue,
    shortcuts: opts.shortcuts,
  };
}

export const REFERENCE_CATALOG: Record<string, CatalogEntry> = {
  // ============================== LAYOUT ==============================
  'aspect-ratio': simpleEntry({
    slug: 'aspect-ratio',
    category: 'layout',
    description: 'Utilities for controlling the aspect ratio of an element.',
    classes: [
      { name: 'aspect-auto', styles: 'aspect-ratio: auto;' },
      { name: 'aspect-square', styles: 'aspect-ratio: 1 / 1;' },
      { name: 'aspect-video', styles: 'aspect-ratio: 16 / 9;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-48 ${cls} background-[#d70f66] rounded-md flex items-center justify-center color-white font-semibold">${cls}</div></div>`,
    customValue: {
      description: 'Pick any ratio with bracket notation.',
      bracketCode: `<div class="aspect-[4/3] ...">
  <!-- 4:3 ratio -->
</div>`,
    },
  }),

  columns: simpleEntry({
    slug: 'columns',
    category: 'layout',
    description: 'Utilities for controlling the number of columns within an element.',
    classes: [
      { name: 'columns-2', styles: 'columns: 2;' },
      { name: 'columns-3', styles: 'columns: 3;' },
      { name: 'columns-4', styles: 'columns: 4;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="${cls} gap-4"><p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p><p class="mb-2">Sed do eiusmod tempor incididunt ut labore et dolore magna.</p><p class="mb-2">Ut enim ad minim veniam quis nostrud exercitation ullamco.</p><p class="mb-2">Duis aute irure dolor in reprehenderit in voluptate velit.</p></div></div>`,
  }),

  'break-after': simpleEntry({
    slug: 'break-after',
    category: 'layout',
    description: 'Utilities for controlling how a column or page should break after an element.',
    classes: [
      { name: 'break-after-auto', styles: 'break-after: auto;' },
      { name: 'break-after-avoid', styles: 'break-after: avoid;' },
      { name: 'break-after-column', styles: 'break-after: column;' },
      { name: 'break-after-page', styles: 'break-after: page;' },
      { name: 'break-after-all', styles: 'break-after: all;' },
    ],
  }),

  'break-before': simpleEntry({
    slug: 'break-before',
    category: 'layout',
    description: 'Utilities for controlling how a column or page should break before an element.',
    classes: [
      { name: 'break-before-auto', styles: 'break-before: auto;' },
      { name: 'break-before-avoid', styles: 'break-before: avoid;' },
      { name: 'break-before-column', styles: 'break-before: column;' },
      { name: 'break-before-page', styles: 'break-before: page;' },
      { name: 'break-before-all', styles: 'break-before: all;' },
    ],
  }),

  'break-inside': simpleEntry({
    slug: 'break-inside',
    category: 'layout',
    description: 'Utilities for controlling how a column or page should break inside an element.',
    classes: [
      { name: 'break-inside-auto', styles: 'break-inside: auto;' },
      { name: 'break-inside-avoid', styles: 'break-inside: avoid;' },
      { name: 'break-inside-avoid-page', styles: 'break-inside: avoid-page;' },
      { name: 'break-inside-avoid-column', styles: 'break-inside: avoid-column;' },
    ],
  }),

  'box-decoration-break': simpleEntry({
    slug: 'box-decoration-break',
    category: 'layout',
    description:
      'Utilities for controlling how element fragments are rendered across column or page breaks.',
    classes: [
      { name: 'box-decoration-clone', styles: 'box-decoration-break: clone;' },
      { name: 'box-decoration-slice', styles: 'box-decoration-break: slice;' },
    ],
  }),

  'box-sizing': simpleEntry({
    slug: 'box-sizing',
    category: 'layout',
    description: "Utilities for controlling how the browser should calculate an element's total size.",
    classes: [
      { name: 'box-border', styles: 'box-sizing: border-box;' },
      { name: 'box-content', styles: 'box-sizing: content-box;' },
    ],
  }),

  display: simpleEntry({
    slug: 'display',
    category: 'layout',
    description: 'Utilities for controlling the display box type of an element.',
    classes: [
      { name: 'block', styles: 'display: block;' },
      { name: 'inline-block', styles: 'display: inline-block;' },
      { name: 'inline', styles: 'display: inline;' },
      { name: 'flex', styles: 'display: flex;' },
      { name: 'inline-flex', styles: 'display: inline-flex;' },
      { name: 'grid', styles: 'display: grid;' },
      { name: 'inline-grid', styles: 'display: inline-grid;' },
      { name: 'contents', styles: 'display: contents;' },
      { name: 'hidden', styles: 'display: none;' },
    ],
  }),

  float: simpleEntry({
    slug: 'float',
    category: 'layout',
    description: 'Utilities for controlling the wrapping of content around an element.',
    classes: [
      { name: 'float-left', styles: 'float: left;' },
      { name: 'float-right', styles: 'float: right;' },
      { name: 'float-none', styles: 'float: none;' },
      { name: 'float-start', styles: 'float: inline-start;' },
      { name: 'float-end', styles: 'float: inline-end;' },
    ],
  }),

  clear: simpleEntry({
    slug: 'clear',
    category: 'layout',
    description: 'Utilities for controlling the wrapping of content around an element.',
    classes: [
      { name: 'clear-left', styles: 'clear: left;' },
      { name: 'clear-right', styles: 'clear: right;' },
      { name: 'clear-both', styles: 'clear: both;' },
      { name: 'clear-none', styles: 'clear: none;' },
    ],
  }),

  isolation: simpleEntry({
    slug: 'isolation',
    category: 'layout',
    description: 'Utilities for controlling whether an element should explicitly create a new stacking context.',
    classes: [
      { name: 'isolate', styles: 'isolation: isolate;' },
      { name: 'isolation-auto', styles: 'isolation: auto;' },
    ],
  }),

  'object-fit': simpleEntry({
    slug: 'object-fit',
    category: 'layout',
    description:
      "Utilities for controlling how a replaced element's content should be resized.",
    classes: [
      { name: 'object-contain', styles: 'object-fit: contain;' },
      { name: 'object-cover', styles: 'object-fit: cover;' },
      { name: 'object-fill', styles: 'object-fit: fill;' },
      { name: 'object-none', styles: 'object-fit: none;' },
      { name: 'object-scale-down', styles: 'object-fit: scale-down;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-40 h-24 background-gray-200 rounded-md overflow-hidden"><img src="https://picsum.photos/600/200" class="w-full h-full ${cls}" alt="demo" /></div></div>`,
  }),

  'object-position': simpleEntry({
    slug: 'object-position',
    category: 'layout',
    description: "Utilities for controlling how a replaced element's content should be positioned.",
    classes: [
      { name: 'object-top', styles: 'object-position: top;' },
      { name: 'object-center', styles: 'object-position: center;' },
      { name: 'object-bottom', styles: 'object-position: bottom;' },
      { name: 'object-left', styles: 'object-position: left;' },
      { name: 'object-right', styles: 'object-position: right;' },
    ],
  }),

  overflow: simpleEntry({
    slug: 'overflow',
    category: 'layout',
    description: 'Utilities for controlling how an element handles content that is too large.',
    classes: [
      { name: 'overflow-auto', styles: 'overflow: auto;' },
      { name: 'overflow-hidden', styles: 'overflow: hidden;' },
      { name: 'overflow-visible', styles: 'overflow: visible;' },
      { name: 'overflow-scroll', styles: 'overflow: scroll;' },
      { name: 'overflow-x-auto', styles: 'overflow-x: auto;' },
      { name: 'overflow-y-auto', styles: 'overflow-y: auto;' },
    ],
  }),

  'overscroll-behavior': simpleEntry({
    slug: 'overscroll-behavior',
    category: 'layout',
    description: 'Utilities for controlling how the browser behaves when reaching the boundary of a scroll area.',
    classes: [
      { name: 'overscroll-auto', styles: 'overscroll-behavior: auto;' },
      { name: 'overscroll-contain', styles: 'overscroll-behavior: contain;' },
      { name: 'overscroll-none', styles: 'overscroll-behavior: none;' },
    ],
  }),

  position: simpleEntry({
    slug: 'position',
    category: 'layout',
    description: 'Utilities for controlling how an element is positioned in the DOM.',
    classes: [
      { name: 'static', styles: 'position: static;' },
      { name: 'fixed', styles: 'position: fixed;' },
      { name: 'absolute', styles: 'position: absolute;' },
      { name: 'relative', styles: 'position: relative;' },
      { name: 'sticky', styles: 'position: sticky;' },
    ],
  }),

  inset: simpleEntry({
    slug: 'inset',
    category: 'layout',
    description: 'Utilities for controlling the placement of positioned elements (top / right / bottom / left).',
    classes: [
      { name: 'top-0', styles: 'top: 0;' },
      { name: 'right-0', styles: 'right: 0;' },
      { name: 'bottom-0', styles: 'bottom: 0;' },
      { name: 'left-0', styles: 'left: 0;' },
      { name: 'inset-0', styles: 'inset: 0;' },
      { name: 'inset-x-0', styles: 'left: 0; right: 0;' },
      { name: 'inset-y-0', styles: 'top: 0; bottom: 0;' },
    ],
    customValue: {
      bracketCode: `<div class="top-[12px] right-[4rem] ...">
  <!-- any offset you want -->
</div>`,
    },
  }),

  visibility: simpleEntry({
    slug: 'visibility',
    category: 'layout',
    description: 'Utilities for controlling the visibility of an element.',
    classes: [
      { name: 'visible', styles: 'visibility: visible;' },
      { name: 'invisible', styles: 'visibility: hidden;' },
      { name: 'collapse', styles: 'visibility: collapse;' },
    ],
  }),

  'z-index': simpleEntry({
    slug: 'z-index',
    category: 'layout',
    description: 'Utilities for controlling the stack order of an element.',
    classes: [
      { name: 'z-0', styles: 'z-index: 0;' },
      { name: 'z-10', styles: 'z-index: 10;' },
      { name: 'z-20', styles: 'z-index: 20;' },
      { name: 'z-30', styles: 'z-index: 30;' },
      { name: 'z-40', styles: 'z-index: 40;' },
      { name: 'z-50', styles: 'z-index: 50;' },
      { name: 'z-auto', styles: 'z-index: auto;' },
    ],
  }),

  // ============================== SPACING ==============================
  padding: simpleEntry({
    slug: 'padding',
    category: 'spacing',
    description: 'Utilities for controlling an element\'s padding.',
    classes: [
      { name: 'p-2', styles: 'padding: 0.5rem;' },
      { name: 'p-4', styles: 'padding: 1rem;' },
      { name: 'px-6', styles: 'padding-left: 1.5rem; padding-right: 1.5rem;' },
      { name: 'py-3', styles: 'padding-top: 0.75rem; padding-bottom: 0.75rem;' },
      { name: 'pt-4', styles: 'padding-top: 1rem;' },
      { name: 'pr-4', styles: 'padding-right: 1rem;' },
      { name: 'pb-4', styles: 'padding-bottom: 1rem;' },
      { name: 'pl-4', styles: 'padding-left: 1rem;' },
    ],
    customValue: {
      bracketCode: `<div class="p-[11px] ...">
  <!-- any pixel value -->
</div>`,
    },
  }),

  margin: simpleEntry({
    slug: 'margin',
    category: 'spacing',
    description: 'Utilities for controlling an element\'s margin.',
    classes: [
      { name: 'm-2', styles: 'margin: 0.5rem;' },
      { name: 'm-4', styles: 'margin: 1rem;' },
      { name: 'mx-auto', styles: 'margin-left: auto; margin-right: auto;' },
      { name: 'my-3', styles: 'margin-top: 0.75rem; margin-bottom: 0.75rem;' },
      { name: 'mt-4', styles: 'margin-top: 1rem;' },
      { name: 'mr-4', styles: 'margin-right: 1rem;' },
      { name: 'mb-4', styles: 'margin-bottom: 1rem;' },
      { name: 'ml-4', styles: 'margin-left: 1rem;' },
    ],
  }),

  // ============================== SIZING (extras – logical) ==============================
  'inline-size': simpleEntry({
    slug: 'inline-size',
    category: 'sizing',
    description: 'Utilities for setting the inline-size (logical width) of an element.',
    classes: [
      { name: 'inline-size-full', styles: 'inline-size: 100%;' },
      { name: 'inline-size-1/2', styles: 'inline-size: 50%;' },
    ],
  }),
  'min-inline-size': simpleEntry({
    slug: 'min-inline-size',
    category: 'sizing',
    description: 'Utilities for setting the minimum inline-size (logical min-width).',
    classes: [
      { name: 'min-inline-size-0', styles: 'min-inline-size: 0;' },
      { name: 'min-inline-size-full', styles: 'min-inline-size: 100%;' },
    ],
  }),
  'max-inline-size': simpleEntry({
    slug: 'max-inline-size',
    category: 'sizing',
    description: 'Utilities for setting the maximum inline-size (logical max-width).',
    classes: [
      { name: 'max-inline-size-none', styles: 'max-inline-size: none;' },
      { name: 'max-inline-size-full', styles: 'max-inline-size: 100%;' },
    ],
  }),
  'block-size': simpleEntry({
    slug: 'block-size',
    category: 'sizing',
    description: 'Utilities for setting the block-size (logical height) of an element.',
    classes: [
      { name: 'block-size-full', styles: 'block-size: 100%;' },
      { name: 'block-size-screen', styles: 'block-size: 100vh;' },
    ],
  }),
  'min-block-size': simpleEntry({
    slug: 'min-block-size',
    category: 'sizing',
    description: 'Utilities for setting the minimum block-size (logical min-height).',
    classes: [
      { name: 'min-block-size-0', styles: 'min-block-size: 0;' },
      { name: 'min-block-size-full', styles: 'min-block-size: 100%;' },
    ],
  }),
  'max-block-size': simpleEntry({
    slug: 'max-block-size',
    category: 'sizing',
    description: 'Utilities for setting the maximum block-size (logical max-height).',
    classes: [
      { name: 'max-block-size-none', styles: 'max-block-size: none;' },
      { name: 'max-block-size-full', styles: 'max-block-size: 100%;' },
    ],
  }),

  // ============================== TYPOGRAPHY ==============================
  'font-family': simpleEntry({
    slug: 'font-family',
    category: 'typography',
    description: "Utilities for controlling the font family of an element.",
    classes: [
      { name: 'font-sans', styles: 'font-family: ui-sans-serif, system-ui, sans-serif, ...;' },
      { name: 'font-serif', styles: 'font-family: ui-serif, Georgia, Cambria, serif;' },
      { name: 'font-mono', styles: 'font-family: ui-monospace, SFMono-Regular, monospace;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'font-size': simpleEntry({
    slug: 'font-size',
    category: 'typography',
    description: 'Utilities for controlling the font size of an element.',
    classes: [
      { name: 'text-xs', styles: 'font-size: 0.75rem; line-height: 1rem;' },
      { name: 'text-sm', styles: 'font-size: 0.875rem; line-height: 1.25rem;' },
      { name: 'text-base', styles: 'font-size: 1rem; line-height: 1.5rem;' },
      { name: 'text-lg', styles: 'font-size: 1.125rem; line-height: 1.75rem;' },
      { name: 'text-xl', styles: 'font-size: 1.25rem; line-height: 1.75rem;' },
      { name: 'text-2xl', styles: 'font-size: 1.5rem;' },
      { name: 'text-3xl', styles: 'font-size: 1.875rem;' },
      { name: 'text-4xl', styles: 'font-size: 2.25rem;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'font-smoothing': simpleEntry({
    slug: 'font-smoothing',
    category: 'typography',
    description: 'Utilities for controlling the font smoothing of an element.',
    classes: [
      { name: 'antialiased', styles: '-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;' },
      { name: 'subpixel-antialiased', styles: '-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'font-style': simpleEntry({
    slug: 'font-style',
    category: 'typography',
    description: 'Utilities for controlling the style of text.',
    classes: [
      { name: 'italic', styles: 'font-style: italic;' },
      { name: 'not-italic', styles: 'font-style: normal;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'font-weight': simpleEntry({
    slug: 'font-weight',
    category: 'typography',
    description: 'Utilities for controlling the font weight of an element.',
    classes: [
      { name: 'font-thin', styles: 'font-weight: 100;' },
      { name: 'font-light', styles: 'font-weight: 300;' },
      { name: 'font-normal', styles: 'font-weight: 400;' },
      { name: 'font-medium', styles: 'font-weight: 500;' },
      { name: 'font-semibold', styles: 'font-weight: 600;' },
      { name: 'font-bold', styles: 'font-weight: 700;' },
      { name: 'font-black', styles: 'font-weight: 900;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'font-stretch': simpleEntry({
    slug: 'font-stretch',
    category: 'typography',
    description: 'Utilities for selecting condensed/expanded variants when available.',
    classes: [
      { name: 'font-stretch-normal', styles: 'font-stretch: normal;' },
      { name: 'font-stretch-condensed', styles: 'font-stretch: condensed;' },
      { name: 'font-stretch-expanded', styles: 'font-stretch: expanded;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'font-variant-numeric': simpleEntry({
    slug: 'font-variant-numeric',
    category: 'typography',
    description: 'Utilities for controlling numeric glyph variants.',
    classes: [
      { name: 'normal-nums', styles: 'font-variant-numeric: normal;' },
      { name: 'ordinal', styles: 'font-variant-numeric: ordinal;' },
      { name: 'slashed-zero', styles: 'font-variant-numeric: slashed-zero;' },
      { name: 'lining-nums', styles: 'font-variant-numeric: lining-nums;' },
      { name: 'oldstyle-nums', styles: 'font-variant-numeric: oldstyle-nums;' },
      { name: 'tabular-nums', styles: 'font-variant-numeric: tabular-nums;' },
    ],
    makeExample: (cls) => textTile(cls, '1234567890'),
  }),

  'font-feature-settings': simpleEntry({
    slug: 'font-feature-settings',
    category: 'typography',
    description: 'Utilities for controlling OpenType feature settings.',
    classes: [
      { name: 'font-features-normal', styles: 'font-feature-settings: normal;' },
    ],
    customValue: {
      bracketCode: `<span class="font-features-[&quot;ss01&quot;_on]">activate ss01</span>`,
    },
  }),

  'letter-spacing': simpleEntry({
    slug: 'letter-spacing',
    category: 'typography',
    description: 'Utilities for controlling letter spacing (tracking).',
    classes: [
      { name: 'tracking-tighter', styles: 'letter-spacing: -0.05em;' },
      { name: 'tracking-tight', styles: 'letter-spacing: -0.025em;' },
      { name: 'tracking-normal', styles: 'letter-spacing: 0;' },
      { name: 'tracking-wide', styles: 'letter-spacing: 0.025em;' },
      { name: 'tracking-wider', styles: 'letter-spacing: 0.05em;' },
      { name: 'tracking-widest', styles: 'letter-spacing: 0.1em;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'line-clamp': simpleEntry({
    slug: 'line-clamp',
    category: 'typography',
    description: 'Utilities for truncating text to a fixed number of lines.',
    classes: [
      { name: 'line-clamp-1', styles: '-webkit-line-clamp: 1;' },
      { name: 'line-clamp-2', styles: '-webkit-line-clamp: 2;' },
      { name: 'line-clamp-3', styles: '-webkit-line-clamp: 3;' },
      { name: 'line-clamp-none', styles: '-webkit-line-clamp: none;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><p class="${cls} max-w-md color-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quidem. Voluptatum, dolorum. Quibusdam, veniam voluptas minus iusto harum, porro nobis fuga quidem dolorem ipsa sequi eveniet.</p></div>`,
  }),

  'line-height': simpleEntry({
    slug: 'line-height',
    category: 'typography',
    description: 'Utilities for controlling the leading of an element.',
    classes: [
      { name: 'leading-none', styles: 'line-height: 1;' },
      { name: 'leading-tight', styles: 'line-height: 1.25;' },
      { name: 'leading-snug', styles: 'line-height: 1.375;' },
      { name: 'leading-normal', styles: 'line-height: 1.5;' },
      { name: 'leading-relaxed', styles: 'line-height: 1.625;' },
      { name: 'leading-loose', styles: 'line-height: 2;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'list-style-image': simpleEntry({
    slug: 'list-style-image',
    category: 'typography',
    description: 'Utilities for controlling the marker image of list items.',
    classes: [
      { name: 'list-image-none', styles: 'list-style-image: none;' },
    ],
    customValue: {
      bracketCode: `<ul class="list-image-[url('/check.svg')]">
  <li>custom bullet</li>
</ul>`,
    },
  }),

  'list-style-position': simpleEntry({
    slug: 'list-style-position',
    category: 'typography',
    description: 'Utilities for controlling the position of list markers.',
    classes: [
      { name: 'list-inside', styles: 'list-style-position: inside;' },
      { name: 'list-outside', styles: 'list-style-position: outside;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><ul class="${cls} list-disc"><li>first item</li><li>second item</li></ul></div>`,
  }),

  'list-style-type': simpleEntry({
    slug: 'list-style-type',
    category: 'typography',
    description: 'Utilities for controlling the marker type of list items.',
    classes: [
      { name: 'list-none', styles: 'list-style-type: none;' },
      { name: 'list-disc', styles: 'list-style-type: disc;' },
      { name: 'list-decimal', styles: 'list-style-type: decimal;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><ul class="${cls} list-inside"><li>first</li><li>second</li></ul></div>`,
  }),

  'text-align': simpleEntry({
    slug: 'text-align',
    category: 'typography',
    description: 'Utilities for controlling the alignment of text.',
    classes: [
      { name: 'text-left', styles: 'text-align: left;' },
      { name: 'text-center', styles: 'text-align: center;' },
      { name: 'text-right', styles: 'text-align: right;' },
      { name: 'text-justify', styles: 'text-align: justify;' },
      { name: 'text-start', styles: 'text-align: start;' },
      { name: 'text-end', styles: 'text-align: end;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  color: simpleEntry({
    slug: 'color',
    category: 'typography',
    description: 'Utilities for controlling the text color of an element.',
    classes: [
      { name: 'color-black', styles: 'color: #000;' },
      { name: 'color-white', styles: 'color: #fff;' },
      { name: 'color-gray-500', styles: 'color: #6b7280;' },
      { name: 'text-[#d70f66]', styles: 'color: #d70f66;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4 background-gray-100 rounded-md"><p class="${cls} font-semibold">${cls} — the quick brown fox</p></div>`,
    customValue: {
      bracketCode: `<p class="text-[#007FFF] ...">arbitrary color</p>`,
    },
  }),

  'text-decoration-line': simpleEntry({
    slug: 'text-decoration-line',
    category: 'typography',
    description: 'Utilities for setting text decoration line.',
    classes: [
      { name: 'underline', styles: 'text-decoration-line: underline;' },
      { name: 'overline', styles: 'text-decoration-line: overline;' },
      { name: 'line-through', styles: 'text-decoration-line: line-through;' },
      { name: 'no-underline', styles: 'text-decoration-line: none;' },
    ],
    makeExample: (cls) => textTile(cls),
  }),

  'text-decoration-color': simpleEntry({
    slug: 'text-decoration-color',
    category: 'typography',
    description: 'Utilities for setting the color of the text decoration line.',
    classes: [
      { name: 'decoration-pink-500', styles: 'text-decoration-color: #f91f7d;' },
      { name: 'decoration-black', styles: 'text-decoration-color: #000;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><p class="underline ${cls} font-semibold">underlined with ${cls}</p></div>`,
    customValue: {
      bracketCode: `<p class="underline decoration-[#d70f66]">custom color</p>`,
    },
  }),

  'text-decoration-style': simpleEntry({
    slug: 'text-decoration-style',
    category: 'typography',
    description: 'Utilities for setting the style of the text decoration line.',
    classes: [
      { name: 'decoration-solid', styles: 'text-decoration-style: solid;' },
      { name: 'decoration-double', styles: 'text-decoration-style: double;' },
      { name: 'decoration-dotted', styles: 'text-decoration-style: dotted;' },
      { name: 'decoration-dashed', styles: 'text-decoration-style: dashed;' },
      { name: 'decoration-wavy', styles: 'text-decoration-style: wavy;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><p class="underline ${cls} font-semibold">${cls}</p></div>`,
  }),

  'text-decoration-thickness': simpleEntry({
    slug: 'text-decoration-thickness',
    category: 'typography',
    description: 'Utilities for setting the thickness of the text decoration line.',
    classes: [
      { name: 'decoration-auto', styles: 'text-decoration-thickness: auto;' },
      { name: 'decoration-from-font', styles: 'text-decoration-thickness: from-font;' },
      { name: 'decoration-2', styles: 'text-decoration-thickness: 2px;' },
      { name: 'decoration-4', styles: 'text-decoration-thickness: 4px;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><p class="underline ${cls} font-semibold">${cls}</p></div>`,
  }),

  'text-underline-offset': simpleEntry({
    slug: 'text-underline-offset',
    category: 'typography',
    description: 'Utilities for setting the offset of the underline.',
    classes: [
      { name: 'underline-offset-auto', styles: 'text-underline-offset: auto;' },
      { name: 'underline-offset-2', styles: 'text-underline-offset: 2px;' },
      { name: 'underline-offset-4', styles: 'text-underline-offset: 4px;' },
      { name: 'underline-offset-8', styles: 'text-underline-offset: 8px;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><p class="underline ${cls} font-semibold">${cls}</p></div>`,
  }),

  'text-transform': simpleEntry({
    slug: 'text-transform',
    category: 'typography',
    description: 'Utilities for controlling the case of text.',
    classes: [
      { name: 'uppercase', styles: 'text-transform: uppercase;' },
      { name: 'lowercase', styles: 'text-transform: lowercase;' },
      { name: 'capitalize', styles: 'text-transform: capitalize;' },
      { name: 'normal-case', styles: 'text-transform: none;' },
    ],
    makeExample: (cls) => textTile(cls, 'The Quick Brown Fox'),
  }),

  'text-overflow': simpleEntry({
    slug: 'text-overflow',
    category: 'typography',
    description: 'Utilities for controlling how text overflows.',
    classes: [
      { name: 'truncate', styles: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;' },
      { name: 'text-ellipsis', styles: 'text-overflow: ellipsis;' },
      { name: 'text-clip', styles: 'text-overflow: clip;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4 max-w-xs"><p class="${cls} color-gray-900">This is a very long sentence that should overflow the container and demonstrate ${cls}.</p></div>`,
  }),

  'text-wrap': simpleEntry({
    slug: 'text-wrap',
    category: 'typography',
    description: 'Utilities for controlling how text wraps.',
    classes: [
      { name: 'text-wrap', styles: 'text-wrap: wrap;' },
      { name: 'text-nowrap', styles: 'text-wrap: nowrap;' },
      { name: 'text-balance', styles: 'text-wrap: balance;' },
      { name: 'text-pretty', styles: 'text-wrap: pretty;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4 max-w-sm"><p class="${cls} color-gray-900">${cls} — the quick brown fox jumps over the lazy dog to inspect the layout.</p></div>`,
  }),

  'text-indent': simpleEntry({
    slug: 'text-indent',
    category: 'typography',
    description: 'Utilities for controlling the first-line indentation.',
    classes: [
      { name: 'indent-0', styles: 'text-indent: 0;' },
      { name: 'indent-4', styles: 'text-indent: 1rem;' },
      { name: 'indent-8', styles: 'text-indent: 2rem;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><p class="${cls} color-gray-900 max-w-md">This paragraph uses ${cls}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p></div>`,
  }),

  'vertical-align': simpleEntry({
    slug: 'vertical-align',
    category: 'typography',
    description: 'Utilities for controlling vertical alignment of inline elements.',
    classes: [
      { name: 'align-baseline', styles: 'vertical-align: baseline;' },
      { name: 'align-top', styles: 'vertical-align: top;' },
      { name: 'align-middle', styles: 'vertical-align: middle;' },
      { name: 'align-bottom', styles: 'vertical-align: bottom;' },
      { name: 'align-text-top', styles: 'vertical-align: text-top;' },
      { name: 'align-text-bottom', styles: 'vertical-align: text-bottom;' },
    ],
  }),

  'white-space': simpleEntry({
    slug: 'white-space',
    category: 'typography',
    description: "Utilities for controlling the whitespace property.",
    classes: [
      { name: 'whitespace-normal', styles: 'white-space: normal;' },
      { name: 'whitespace-nowrap', styles: 'white-space: nowrap;' },
      { name: 'whitespace-pre', styles: 'white-space: pre;' },
      { name: 'whitespace-pre-line', styles: 'white-space: pre-line;' },
      { name: 'whitespace-pre-wrap', styles: 'white-space: pre-wrap;' },
    ],
  }),

  'word-break': simpleEntry({
    slug: 'word-break',
    category: 'typography',
    description: 'Utilities for controlling word breaks.',
    classes: [
      { name: 'break-normal', styles: 'word-break: normal;' },
      { name: 'break-words', styles: 'overflow-wrap: break-word;' },
      { name: 'break-all', styles: 'word-break: break-all;' },
      { name: 'break-keep', styles: 'word-break: keep-all;' },
    ],
  }),

  'overflow-wrap': simpleEntry({
    slug: 'overflow-wrap',
    category: 'typography',
    description: 'Utilities for controlling overflow-wrap behavior.',
    classes: [
      { name: 'wrap-normal', styles: 'overflow-wrap: normal;' },
      { name: 'wrap-break-word', styles: 'overflow-wrap: break-word;' },
      { name: 'wrap-anywhere', styles: 'overflow-wrap: anywhere;' },
    ],
  }),

  hyphens: simpleEntry({
    slug: 'hyphens',
    category: 'typography',
    description: 'Utilities for controlling how words should be hyphenated.',
    classes: [
      { name: 'hyphens-none', styles: 'hyphens: none;' },
      { name: 'hyphens-manual', styles: 'hyphens: manual;' },
      { name: 'hyphens-auto', styles: 'hyphens: auto;' },
    ],
  }),

  content: simpleEntry({
    slug: 'content',
    category: 'typography',
    description: 'Utilities for controlling the content of before/after pseudo-elements.',
    classes: [
      { name: 'content-none', styles: 'content: none;' },
    ],
    customValue: {
      bracketCode: `<div class="before:content-['Hello'] ...">
  <!-- before inserts "Hello" -->
</div>`,
    },
  }),

  // ============================== BACKGROUNDS ==============================
  'background-attachment': simpleEntry({
    slug: 'background-attachment',
    category: 'backgrounds',
    description: 'Utilities for controlling how a background is attached.',
    classes: [
      { name: 'bg-fixed', styles: 'background-attachment: fixed;' },
      { name: 'bg-local', styles: 'background-attachment: local;' },
      { name: 'bg-scroll', styles: 'background-attachment: scroll;' },
    ],
  }),

  'background-clip': simpleEntry({
    slug: 'background-clip',
    category: 'backgrounds',
    description: "Utilities for controlling the bounding box of an element's background.",
    classes: [
      { name: 'bg-clip-border', styles: 'background-clip: border-box;' },
      { name: 'bg-clip-padding', styles: 'background-clip: padding-box;' },
      { name: 'bg-clip-content', styles: 'background-clip: content-box;' },
      { name: 'bg-clip-text', styles: 'background-clip: text;' },
    ],
  }),

  'background-color': simpleEntry({
    slug: 'background-color',
    category: 'backgrounds',
    description: "Utilities for controlling an element's background color.",
    classes: [
      { name: 'background-black', styles: 'background-color: #000;' },
      { name: 'background-white', styles: 'background-color: #fff;' },
      { name: 'bg-transparent', styles: 'background-color: transparent;' },
      { name: 'background-[#d70f66]', styles: 'background-color: #d70f66;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="${cls} h-16 w-full rounded-md border border-color-gray-200"></div></div>`,
    customValue: {
      bracketCode: `<div class="background-[#007FFF] ...">arbitrary background</div>`,
    },
  }),

  'background-image': simpleEntry({
    slug: 'background-image',
    category: 'backgrounds',
    description: "Utilities for controlling an element's background image.",
    classes: [
      { name: 'bg-none', styles: 'background-image: none;' },
      { name: 'bg-gradient-to-r', styles: 'background-image: linear-gradient(to right, ...);' },
      { name: 'bg-gradient-to-br', styles: 'background-image: linear-gradient(to bottom right, ...);' },
    ],
    customValue: {
      bracketCode: `<div class="background-[url('/hero.jpg')] ...">image</div>`,
    },
  }),

  'background-origin': simpleEntry({
    slug: 'background-origin',
    category: 'backgrounds',
    description: 'Utilities for controlling the background origin reference.',
    classes: [
      { name: 'bg-origin-border', styles: 'background-origin: border-box;' },
      { name: 'bg-origin-padding', styles: 'background-origin: padding-box;' },
      { name: 'bg-origin-content', styles: 'background-origin: content-box;' },
    ],
  }),

  'background-position': simpleEntry({
    slug: 'background-position',
    category: 'backgrounds',
    description: "Utilities for controlling an element's background image position.",
    classes: [
      { name: 'bg-top', styles: 'background-position: top;' },
      { name: 'bg-center', styles: 'background-position: center;' },
      { name: 'bg-bottom', styles: 'background-position: bottom;' },
      { name: 'bg-left', styles: 'background-position: left;' },
      { name: 'bg-right', styles: 'background-position: right;' },
    ],
  }),

  'background-repeat': simpleEntry({
    slug: 'background-repeat',
    category: 'backgrounds',
    description: "Utilities for controlling an element's background repeat.",
    classes: [
      { name: 'bg-repeat', styles: 'background-repeat: repeat;' },
      { name: 'bg-no-repeat', styles: 'background-repeat: no-repeat;' },
      { name: 'bg-repeat-x', styles: 'background-repeat: repeat-x;' },
      { name: 'bg-repeat-y', styles: 'background-repeat: repeat-y;' },
      { name: 'bg-repeat-round', styles: 'background-repeat: round;' },
      { name: 'bg-repeat-space', styles: 'background-repeat: space;' },
    ],
  }),

  'background-size': simpleEntry({
    slug: 'background-size',
    category: 'backgrounds',
    description: "Utilities for controlling an element's background size.",
    classes: [
      { name: 'bg-auto', styles: 'background-size: auto;' },
      { name: 'bg-cover', styles: 'background-size: cover;' },
      { name: 'bg-contain', styles: 'background-size: contain;' },
    ],
  }),

  // ============================== BORDERS ==============================
  'border-radius': simpleEntry({
    slug: 'border-radius',
    category: 'borders',
    description: "Utilities for controlling the border radius of an element.",
    classes: [
      { name: 'rounded-none', styles: 'border-radius: 0;' },
      { name: 'rounded-sm', styles: 'border-radius: 0.125rem;' },
      { name: 'rounded', styles: 'border-radius: 0.25rem;' },
      { name: 'rounded-md', styles: 'border-radius: 0.375rem;' },
      { name: 'rounded-lg', styles: 'border-radius: 0.5rem;' },
      { name: 'rounded-xl', styles: 'border-radius: 0.75rem;' },
      { name: 'rounded-2xl', styles: 'border-radius: 1rem;' },
      { name: 'rounded-3xl', styles: 'border-radius: 1.5rem;' },
      { name: 'rounded-full', styles: 'border-radius: 9999px;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-20 h-20 background-[#d70f66] ${cls}"></div></div>`,
  }),

  'border-width': simpleEntry({
    slug: 'border-width',
    category: 'borders',
    description: "Utilities for controlling the width of an element's border.",
    classes: [
      { name: 'border', styles: 'border-width: 1px;' },
      { name: 'border-2', styles: 'border-width: 2px;' },
      { name: 'border-4', styles: 'border-width: 4px;' },
      { name: 'border-8', styles: 'border-width: 8px;' },
      { name: 'border-0', styles: 'border-width: 0;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 ${cls} border-color-gray-800 rounded-md"></div></div>`,
  }),

  'border-color': simpleEntry({
    slug: 'border-color',
    category: 'borders',
    description: "Utilities for controlling the color of an element's border.",
    classes: [
      { name: 'border-black', styles: 'border-color: #000;' },
      { name: 'border-transparent', styles: 'border-color: transparent;' },
      { name: 'border-[#d70f66]', styles: 'border-color: #d70f66;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 border-4 ${cls} rounded-md"></div></div>`,
  }),

  'border-style': simpleEntry({
    slug: 'border-style',
    category: 'borders',
    description: "Utilities for controlling the style of an element's border.",
    classes: [
      { name: 'border-solid', styles: 'border-style: solid;' },
      { name: 'border-dashed', styles: 'border-style: dashed;' },
      { name: 'border-dotted', styles: 'border-style: dotted;' },
      { name: 'border-double', styles: 'border-style: double;' },
      { name: 'border-hidden', styles: 'border-style: hidden;' },
      { name: 'border-none', styles: 'border-style: none;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 border-4 border-color-gray-800 ${cls} rounded-md"></div></div>`,
  }),

  'outline-width': simpleEntry({
    slug: 'outline-width',
    category: 'borders',
    description: "Utilities for controlling the width of an element's outline.",
    classes: [
      { name: 'outline-0', styles: 'outline-width: 0;' },
      { name: 'outline-1', styles: 'outline-width: 1px;' },
      { name: 'outline-2', styles: 'outline-width: 2px;' },
      { name: 'outline-4', styles: 'outline-width: 4px;' },
      { name: 'outline-8', styles: 'outline-width: 8px;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-20 h-16 background-white outline outline-[#d70f66] ${cls} rounded-md"></div></div>`,
  }),

  'outline-color': simpleEntry({
    slug: 'outline-color',
    category: 'borders',
    description: "Utilities for controlling the color of an element's outline.",
    classes: [
      { name: 'outline-black', styles: 'outline-color: #000;' },
      { name: 'outline-[#d70f66]', styles: 'outline-color: #d70f66;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-20 h-16 background-white outline outline-4 ${cls} rounded-md"></div></div>`,
  }),

  'outline-style': simpleEntry({
    slug: 'outline-style',
    category: 'borders',
    description: "Utilities for controlling the style of an element's outline.",
    classes: [
      { name: 'outline-none', styles: 'outline: none;' },
      { name: 'outline', styles: 'outline-style: solid;' },
      { name: 'outline-dashed', styles: 'outline-style: dashed;' },
      { name: 'outline-dotted', styles: 'outline-style: dotted;' },
      { name: 'outline-double', styles: 'outline-style: double;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-20 h-16 background-white outline-4 outline-[#d70f66] ${cls} rounded-md"></div></div>`,
  }),

  'outline-offset': simpleEntry({
    slug: 'outline-offset',
    category: 'borders',
    description: "Utilities for controlling the offset of an element's outline.",
    classes: [
      { name: 'outline-offset-0', styles: 'outline-offset: 0;' },
      { name: 'outline-offset-1', styles: 'outline-offset: 1px;' },
      { name: 'outline-offset-2', styles: 'outline-offset: 2px;' },
      { name: 'outline-offset-4', styles: 'outline-offset: 4px;' },
      { name: 'outline-offset-8', styles: 'outline-offset: 8px;' },
    ],
    makeExample: (cls) =>
      `<div class="p-6"><div class="w-20 h-16 background-white outline outline-4 outline-[#d70f66] ${cls} rounded-md"></div></div>`,
  }),

  // ============================== EFFECTS ==============================
  'box-shadow': simpleEntry({
    slug: 'box-shadow',
    category: 'effects',
    description: "Utilities for controlling an element's box shadow.",
    classes: [
      { name: 'shadow-sm', styles: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);' },
      { name: 'shadow', styles: 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);' },
      { name: 'shadow-md', styles: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);' },
      { name: 'shadow-lg', styles: 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);' },
      { name: 'shadow-xl', styles: 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);' },
      { name: 'shadow-2xl', styles: 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);' },
      { name: 'shadow-none', styles: 'box-shadow: none;' },
    ],
    makeExample: (cls) =>
      `<div class="p-6"><div class="w-24 h-16 background-white rounded-md ${cls}"></div></div>`,
  }),

  'text-shadow': simpleEntry({
    slug: 'text-shadow',
    category: 'effects',
    description: "Utilities for adding shadows to text.",
    classes: [
      { name: 'text-shadow-sm', styles: 'text-shadow: 0 1px 2px rgb(0 0 0 / 0.2);' },
      { name: 'text-shadow', styles: 'text-shadow: 0 2px 4px rgb(0 0 0 / 0.25);' },
      { name: 'text-shadow-lg', styles: 'text-shadow: 0 4px 6px rgb(0 0 0 / 0.3);' },
      { name: 'text-shadow-none', styles: 'text-shadow: none;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><p class="text-3xl font-bold text-[#d70f66] ${cls}">${cls}</p></div>`,
  }),

  opacity: simpleEntry({
    slug: 'opacity',
    category: 'effects',
    description: "Utilities for controlling the opacity of an element.",
    classes: [
      { name: 'opacity-0', styles: 'opacity: 0;' },
      { name: 'opacity-25', styles: 'opacity: 0.25;' },
      { name: 'opacity-50', styles: 'opacity: 0.5;' },
      { name: 'opacity-75', styles: 'opacity: 0.75;' },
      { name: 'opacity-100', styles: 'opacity: 1;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-20 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),

  'mix-blend-mode': simpleEntry({
    slug: 'mix-blend-mode',
    category: 'effects',
    description: 'Utilities for controlling how an element should blend with the background.',
    classes: [
      { name: 'mix-blend-normal', styles: 'mix-blend-mode: normal;' },
      { name: 'mix-blend-multiply', styles: 'mix-blend-mode: multiply;' },
      { name: 'mix-blend-screen', styles: 'mix-blend-mode: screen;' },
      { name: 'mix-blend-overlay', styles: 'mix-blend-mode: overlay;' },
      { name: 'mix-blend-darken', styles: 'mix-blend-mode: darken;' },
      { name: 'mix-blend-lighten', styles: 'mix-blend-mode: lighten;' },
    ],
  }),

  'background-blend-mode': simpleEntry({
    slug: 'background-blend-mode',
    category: 'effects',
    description: "Utilities for controlling how an element's background should blend.",
    classes: [
      { name: 'bg-blend-normal', styles: 'background-blend-mode: normal;' },
      { name: 'bg-blend-multiply', styles: 'background-blend-mode: multiply;' },
      { name: 'bg-blend-screen', styles: 'background-blend-mode: screen;' },
      { name: 'bg-blend-overlay', styles: 'background-blend-mode: overlay;' },
    ],
  }),

  'mask-clip': simpleEntry({
    slug: 'mask-clip',
    category: 'effects',
    description: 'Utilities for controlling the bounding box of the mask layer.',
    classes: [
      { name: 'mask-clip-border', styles: 'mask-clip: border-box;' },
      { name: 'mask-clip-padding', styles: 'mask-clip: padding-box;' },
      { name: 'mask-clip-content', styles: 'mask-clip: content-box;' },
    ],
  }),

  'mask-composite': simpleEntry({
    slug: 'mask-composite',
    category: 'effects',
    description: 'Utilities for controlling how multiple masks should be combined.',
    classes: [
      { name: 'mask-add', styles: 'mask-composite: add;' },
      { name: 'mask-subtract', styles: 'mask-composite: subtract;' },
      { name: 'mask-intersect', styles: 'mask-composite: intersect;' },
      { name: 'mask-exclude', styles: 'mask-composite: exclude;' },
    ],
  }),

  'mask-image': simpleEntry({
    slug: 'mask-image',
    category: 'effects',
    description: 'Utilities for controlling the mask image of an element.',
    classes: [
      { name: 'mask-none', styles: 'mask-image: none;' },
    ],
    customValue: {
      bracketCode: `<div class="mask-[url('/mask.svg')] ...">masked</div>`,
    },
  }),

  'mask-mode': simpleEntry({
    slug: 'mask-mode',
    category: 'effects',
    description: 'Utilities for controlling the interpretation of the mask source.',
    classes: [
      { name: 'mask-mode-alpha', styles: 'mask-mode: alpha;' },
      { name: 'mask-mode-luminance', styles: 'mask-mode: luminance;' },
      { name: 'mask-mode-match', styles: 'mask-mode: match-source;' },
    ],
  }),

  'mask-origin': simpleEntry({
    slug: 'mask-origin',
    category: 'effects',
    description: "Utilities for controlling the mask's positioning reference box.",
    classes: [
      { name: 'mask-origin-border', styles: 'mask-origin: border-box;' },
      { name: 'mask-origin-padding', styles: 'mask-origin: padding-box;' },
      { name: 'mask-origin-content', styles: 'mask-origin: content-box;' },
    ],
  }),

  'mask-position': simpleEntry({
    slug: 'mask-position',
    category: 'effects',
    description: 'Utilities for controlling the position of the mask image.',
    classes: [
      { name: 'mask-center', styles: 'mask-position: center;' },
      { name: 'mask-top', styles: 'mask-position: top;' },
      { name: 'mask-bottom', styles: 'mask-position: bottom;' },
    ],
  }),

  'mask-repeat': simpleEntry({
    slug: 'mask-repeat',
    category: 'effects',
    description: 'Utilities for controlling the repetition of the mask image.',
    classes: [
      { name: 'mask-repeat', styles: 'mask-repeat: repeat;' },
      { name: 'mask-no-repeat', styles: 'mask-repeat: no-repeat;' },
      { name: 'mask-repeat-x', styles: 'mask-repeat: repeat-x;' },
      { name: 'mask-repeat-y', styles: 'mask-repeat: repeat-y;' },
    ],
  }),

  'mask-size': simpleEntry({
    slug: 'mask-size',
    category: 'effects',
    description: 'Utilities for controlling the size of the mask image.',
    classes: [
      { name: 'mask-auto', styles: 'mask-size: auto;' },
      { name: 'mask-cover', styles: 'mask-size: cover;' },
      { name: 'mask-contain', styles: 'mask-size: contain;' },
    ],
  }),

  'mask-type': simpleEntry({
    slug: 'mask-type',
    category: 'effects',
    description: 'Utilities for controlling how SVG mask elements are interpreted.',
    classes: [
      { name: 'mask-type-alpha', styles: 'mask-type: alpha;' },
      { name: 'mask-type-luminance', styles: 'mask-type: luminance;' },
    ],
  }),

  // ============================== FILTERS ==============================
  filter: simpleEntry({
    slug: 'filter',
    category: 'filters',
    description: 'Utilities for applying visual filter effects to an element.',
    classes: [
      { name: 'filter', styles: 'filter: var(--tw-filter);' },
      { name: 'filter-none', styles: 'filter: none;' },
    ],
  }),
  blur: simpleEntry({
    slug: 'blur',
    category: 'filters',
    description: 'Utilities for applying blur filters.',
    classes: [
      { name: 'blur-none', styles: 'filter: blur(0);' },
      { name: 'blur-sm', styles: 'filter: blur(4px);' },
      { name: 'blur', styles: 'filter: blur(8px);' },
      { name: 'blur-md', styles: 'filter: blur(12px);' },
      { name: 'blur-lg', styles: 'filter: blur(16px);' },
      { name: 'blur-xl', styles: 'filter: blur(24px);' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  brightness: simpleEntry({
    slug: 'brightness',
    category: 'filters',
    description: 'Utilities for applying brightness filters.',
    classes: [
      { name: 'brightness-0', styles: 'filter: brightness(0);' },
      { name: 'brightness-50', styles: 'filter: brightness(.5);' },
      { name: 'brightness-100', styles: 'filter: brightness(1);' },
      { name: 'brightness-150', styles: 'filter: brightness(1.5);' },
      { name: 'brightness-200', styles: 'filter: brightness(2);' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  contrast: simpleEntry({
    slug: 'contrast',
    category: 'filters',
    description: 'Utilities for applying contrast filters.',
    classes: [
      { name: 'contrast-50', styles: 'filter: contrast(.5);' },
      { name: 'contrast-100', styles: 'filter: contrast(1);' },
      { name: 'contrast-150', styles: 'filter: contrast(1.5);' },
      { name: 'contrast-200', styles: 'filter: contrast(2);' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  'drop-shadow': simpleEntry({
    slug: 'drop-shadow',
    category: 'filters',
    description: 'Utilities for applying drop-shadow filters.',
    classes: [
      { name: 'drop-shadow-sm', styles: 'filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));' },
      { name: 'drop-shadow', styles: 'filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1));' },
      { name: 'drop-shadow-md', styles: 'filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07));' },
      { name: 'drop-shadow-lg', styles: 'filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04));' },
    ],
    makeExample: (cls) =>
      `<div class="p-6"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  grayscale: simpleEntry({
    slug: 'grayscale',
    category: 'filters',
    description: 'Utilities for applying grayscale filters.',
    classes: [
      { name: 'grayscale-0', styles: 'filter: grayscale(0);' },
      { name: 'grayscale', styles: 'filter: grayscale(1);' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  'hue-rotate': simpleEntry({
    slug: 'hue-rotate',
    category: 'filters',
    description: 'Utilities for applying hue-rotate filters.',
    classes: [
      { name: 'hue-rotate-0', styles: 'filter: hue-rotate(0);' },
      { name: 'hue-rotate-60', styles: 'filter: hue-rotate(60deg);' },
      { name: 'hue-rotate-90', styles: 'filter: hue-rotate(90deg);' },
      { name: 'hue-rotate-180', styles: 'filter: hue-rotate(180deg);' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  invert: simpleEntry({
    slug: 'invert',
    category: 'filters',
    description: 'Utilities for applying invert filters.',
    classes: [
      { name: 'invert-0', styles: 'filter: invert(0);' },
      { name: 'invert', styles: 'filter: invert(1);' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  saturate: simpleEntry({
    slug: 'saturate',
    category: 'filters',
    description: 'Utilities for applying saturate filters.',
    classes: [
      { name: 'saturate-0', styles: 'filter: saturate(0);' },
      { name: 'saturate-50', styles: 'filter: saturate(.5);' },
      { name: 'saturate-100', styles: 'filter: saturate(1);' },
      { name: 'saturate-150', styles: 'filter: saturate(1.5);' },
      { name: 'saturate-200', styles: 'filter: saturate(2);' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  sepia: simpleEntry({
    slug: 'sepia',
    category: 'filters',
    description: 'Utilities for applying sepia filters.',
    classes: [
      { name: 'sepia-0', styles: 'filter: sepia(0);' },
      { name: 'sepia', styles: 'filter: sepia(1);' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-24 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  'backdrop-filter': simpleEntry({
    slug: 'backdrop-filter',
    category: 'filters',
    description: "Utilities for enabling backdrop filters.",
    classes: [
      { name: 'backdrop-filter', styles: 'backdrop-filter: var(--tw-backdrop-filter);' },
      { name: 'backdrop-filter-none', styles: 'backdrop-filter: none;' },
    ],
  }),
  'backdrop-blur': simpleEntry({
    slug: 'backdrop-blur',
    category: 'filters',
    description: 'Utilities for applying backdrop blur filters.',
    classes: [
      { name: 'backdrop-blur-sm', styles: 'backdrop-filter: blur(4px);' },
      { name: 'backdrop-blur', styles: 'backdrop-filter: blur(8px);' },
      { name: 'backdrop-blur-md', styles: 'backdrop-filter: blur(12px);' },
      { name: 'backdrop-blur-lg', styles: 'backdrop-filter: blur(16px);' },
    ],
  }),
  'backdrop-brightness': simpleEntry({
    slug: 'backdrop-brightness',
    category: 'filters',
    description: 'Utilities for applying backdrop brightness filters.',
    classes: [
      { name: 'backdrop-brightness-50', styles: 'backdrop-filter: brightness(.5);' },
      { name: 'backdrop-brightness-100', styles: 'backdrop-filter: brightness(1);' },
      { name: 'backdrop-brightness-150', styles: 'backdrop-filter: brightness(1.5);' },
    ],
  }),
  'backdrop-contrast': simpleEntry({
    slug: 'backdrop-contrast',
    category: 'filters',
    description: 'Utilities for applying backdrop contrast filters.',
    classes: [
      { name: 'backdrop-contrast-50', styles: 'backdrop-filter: contrast(.5);' },
      { name: 'backdrop-contrast-100', styles: 'backdrop-filter: contrast(1);' },
      { name: 'backdrop-contrast-150', styles: 'backdrop-filter: contrast(1.5);' },
    ],
  }),
  'backdrop-grayscale': simpleEntry({
    slug: 'backdrop-grayscale',
    category: 'filters',
    description: 'Utilities for applying backdrop grayscale filters.',
    classes: [
      { name: 'backdrop-grayscale-0', styles: 'backdrop-filter: grayscale(0);' },
      { name: 'backdrop-grayscale', styles: 'backdrop-filter: grayscale(1);' },
    ],
  }),
  'backdrop-hue-rotate': simpleEntry({
    slug: 'backdrop-hue-rotate',
    category: 'filters',
    description: 'Utilities for applying backdrop hue-rotate filters.',
    classes: [
      { name: 'backdrop-hue-rotate-0', styles: 'backdrop-filter: hue-rotate(0);' },
      { name: 'backdrop-hue-rotate-90', styles: 'backdrop-filter: hue-rotate(90deg);' },
      { name: 'backdrop-hue-rotate-180', styles: 'backdrop-filter: hue-rotate(180deg);' },
    ],
  }),
  'backdrop-invert': simpleEntry({
    slug: 'backdrop-invert',
    category: 'filters',
    description: 'Utilities for applying backdrop invert filters.',
    classes: [
      { name: 'backdrop-invert-0', styles: 'backdrop-filter: invert(0);' },
      { name: 'backdrop-invert', styles: 'backdrop-filter: invert(1);' },
    ],
  }),
  'backdrop-opacity': simpleEntry({
    slug: 'backdrop-opacity',
    category: 'filters',
    description: 'Utilities for applying backdrop opacity filters.',
    classes: [
      { name: 'backdrop-opacity-25', styles: 'backdrop-filter: opacity(.25);' },
      { name: 'backdrop-opacity-50', styles: 'backdrop-filter: opacity(.5);' },
      { name: 'backdrop-opacity-75', styles: 'backdrop-filter: opacity(.75);' },
      { name: 'backdrop-opacity-100', styles: 'backdrop-filter: opacity(1);' },
    ],
  }),
  'backdrop-saturate': simpleEntry({
    slug: 'backdrop-saturate',
    category: 'filters',
    description: 'Utilities for applying backdrop saturate filters.',
    classes: [
      { name: 'backdrop-saturate-50', styles: 'backdrop-filter: saturate(.5);' },
      { name: 'backdrop-saturate-100', styles: 'backdrop-filter: saturate(1);' },
      { name: 'backdrop-saturate-150', styles: 'backdrop-filter: saturate(1.5);' },
    ],
  }),
  'backdrop-sepia': simpleEntry({
    slug: 'backdrop-sepia',
    category: 'filters',
    description: 'Utilities for applying backdrop sepia filters.',
    classes: [
      { name: 'backdrop-sepia-0', styles: 'backdrop-filter: sepia(0);' },
      { name: 'backdrop-sepia', styles: 'backdrop-filter: sepia(1);' },
    ],
  }),

  // ============================== TABLES ==============================
  'border-collapse': simpleEntry({
    slug: 'border-collapse',
    category: 'tables',
    description: 'Utilities for controlling whether table borders should collapse.',
    classes: [
      { name: 'border-collapse', styles: 'border-collapse: collapse;' },
      { name: 'border-separate', styles: 'border-collapse: separate;' },
    ],
  }),
  'border-spacing': simpleEntry({
    slug: 'border-spacing',
    category: 'tables',
    description: 'Utilities for controlling the spacing between separated borders.',
    classes: [
      { name: 'border-spacing-0', styles: 'border-spacing: 0;' },
      { name: 'border-spacing-2', styles: 'border-spacing: 0.5rem;' },
      { name: 'border-spacing-4', styles: 'border-spacing: 1rem;' },
    ],
  }),
  'table-layout': simpleEntry({
    slug: 'table-layout',
    category: 'tables',
    description: 'Utilities for controlling the table layout algorithm.',
    classes: [
      { name: 'table-auto', styles: 'table-layout: auto;' },
      { name: 'table-fixed', styles: 'table-layout: fixed;' },
    ],
  }),
  'caption-side': simpleEntry({
    slug: 'caption-side',
    category: 'tables',
    description: 'Utilities for controlling the alignment of a caption element.',
    classes: [
      { name: 'caption-top', styles: 'caption-side: top;' },
      { name: 'caption-bottom', styles: 'caption-side: bottom;' },
    ],
  }),

  // ============================== TRANSITIONS & ANIMATION ==============================
  'transition-property': simpleEntry({
    slug: 'transition-property',
    category: 'transitions',
    description: 'Utilities for controlling which properties transition.',
    classes: [
      { name: 'transition-none', styles: 'transition-property: none;' },
      { name: 'transition-all', styles: 'transition-property: all;' },
      { name: 'transition', styles: 'transition-property: color, background-color, border-color, ...;' },
      { name: 'transition-colors', styles: 'transition-property: color, background-color, border-color;' },
      { name: 'transition-opacity', styles: 'transition-property: opacity;' },
      { name: 'transition-shadow', styles: 'transition-property: box-shadow;' },
      { name: 'transition-transform', styles: 'transition-property: transform;' },
    ],
  }),
  'transition-behavior': simpleEntry({
    slug: 'transition-behavior',
    category: 'transitions',
    description: 'Utilities for controlling whether discrete properties transition.',
    classes: [
      { name: 'transition-normal', styles: 'transition-behavior: normal;' },
      { name: 'transition-discrete', styles: 'transition-behavior: allow-discrete;' },
    ],
  }),
  'transition-duration': simpleEntry({
    slug: 'transition-duration',
    category: 'transitions',
    description: 'Utilities for controlling the transition duration.',
    classes: [
      { name: 'duration-75', styles: 'transition-duration: 75ms;' },
      { name: 'duration-100', styles: 'transition-duration: 100ms;' },
      { name: 'duration-150', styles: 'transition-duration: 150ms;' },
      { name: 'duration-200', styles: 'transition-duration: 200ms;' },
      { name: 'duration-300', styles: 'transition-duration: 300ms;' },
      { name: 'duration-500', styles: 'transition-duration: 500ms;' },
      { name: 'duration-1000', styles: 'transition-duration: 1000ms;' },
    ],
  }),
  'transition-timing-function': simpleEntry({
    slug: 'transition-timing-function',
    category: 'transitions',
    description: 'Utilities for controlling the easing of CSS transitions.',
    classes: [
      { name: 'ease-linear', styles: 'transition-timing-function: linear;' },
      { name: 'ease-in', styles: 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1);' },
      { name: 'ease-out', styles: 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1);' },
      { name: 'ease-in-out', styles: 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);' },
    ],
  }),
  'transition-delay': simpleEntry({
    slug: 'transition-delay',
    category: 'transitions',
    description: 'Utilities for controlling the transition delay.',
    classes: [
      { name: 'delay-75', styles: 'transition-delay: 75ms;' },
      { name: 'delay-100', styles: 'transition-delay: 100ms;' },
      { name: 'delay-150', styles: 'transition-delay: 150ms;' },
      { name: 'delay-200', styles: 'transition-delay: 200ms;' },
      { name: 'delay-300', styles: 'transition-delay: 300ms;' },
      { name: 'delay-500', styles: 'transition-delay: 500ms;' },
    ],
  }),
  animation: simpleEntry({
    slug: 'animation',
    category: 'transitions',
    description: 'Utilities for animating elements with CSS animations.',
    classes: [
      { name: 'animate-none', styles: 'animation: none;' },
      { name: 'animate-spin', styles: 'animation: spin 1s linear infinite;' },
      { name: 'animate-ping', styles: 'animation: ping 1s cubic-bezier(0,0,.2,1) infinite;' },
      { name: 'animate-pulse', styles: 'animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite;' },
      { name: 'animate-bounce', styles: 'animation: bounce 1s infinite;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><div class="w-10 h-10 background-[#d70f66] rounded-full ${cls}"></div></div>`,
  }),

  // ============================== TRANSFORMS ==============================
  'backface-visibility': simpleEntry({
    slug: 'backface-visibility',
    category: 'transforms',
    description: 'Utilities for controlling if an element is visible from the back.',
    classes: [
      { name: 'backface-visible', styles: 'backface-visibility: visible;' },
      { name: 'backface-hidden', styles: 'backface-visibility: hidden;' },
    ],
  }),
  perspective: simpleEntry({
    slug: 'perspective',
    category: 'transforms',
    description: "Utilities for controlling an element's perspective.",
    classes: [
      { name: 'perspective-none', styles: 'perspective: none;' },
      { name: 'perspective-500', styles: 'perspective: 500px;' },
      { name: 'perspective-1000', styles: 'perspective: 1000px;' },
    ],
  }),
  'perspective-origin': simpleEntry({
    slug: 'perspective-origin',
    category: 'transforms',
    description: "Utilities for controlling the origin of an element's perspective.",
    classes: [
      { name: 'perspective-origin-center', styles: 'perspective-origin: center;' },
      { name: 'perspective-origin-top', styles: 'perspective-origin: top;' },
      { name: 'perspective-origin-bottom', styles: 'perspective-origin: bottom;' },
    ],
  }),
  rotate: simpleEntry({
    slug: 'rotate',
    category: 'transforms',
    description: 'Utilities for rotating elements.',
    classes: [
      { name: 'rotate-0', styles: 'transform: rotate(0deg);' },
      { name: 'rotate-45', styles: 'transform: rotate(45deg);' },
      { name: 'rotate-90', styles: 'transform: rotate(90deg);' },
      { name: 'rotate-180', styles: 'transform: rotate(180deg);' },
      { name: '-rotate-45', styles: 'transform: rotate(-45deg);' },
    ],
    makeExample: (cls) =>
      `<div class="p-6"><div class="w-16 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  scale: simpleEntry({
    slug: 'scale',
    category: 'transforms',
    description: 'Utilities for scaling elements.',
    classes: [
      { name: 'scale-0', styles: 'transform: scale(0);' },
      { name: 'scale-50', styles: 'transform: scale(.5);' },
      { name: 'scale-75', styles: 'transform: scale(.75);' },
      { name: 'scale-100', styles: 'transform: scale(1);' },
      { name: 'scale-125', styles: 'transform: scale(1.25);' },
      { name: 'scale-150', styles: 'transform: scale(1.5);' },
    ],
    makeExample: (cls) =>
      `<div class="p-6"><div class="w-16 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  skew: simpleEntry({
    slug: 'skew',
    category: 'transforms',
    description: 'Utilities for skewing elements.',
    classes: [
      { name: 'skew-x-0', styles: 'transform: skewX(0);' },
      { name: 'skew-x-3', styles: 'transform: skewX(3deg);' },
      { name: 'skew-x-6', styles: 'transform: skewX(6deg);' },
      { name: 'skew-y-3', styles: 'transform: skewY(3deg);' },
      { name: 'skew-y-6', styles: 'transform: skewY(6deg);' },
    ],
    makeExample: (cls) =>
      `<div class="p-6"><div class="w-16 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),
  transform: simpleEntry({
    slug: 'transform',
    category: 'transforms',
    description: 'Utilities for enabling / resetting the transform stack.',
    classes: [
      { name: 'transform', styles: 'transform: var(--tw-transform);' },
      { name: 'transform-none', styles: 'transform: none;' },
      { name: 'transform-gpu', styles: 'transform: translate3d(0,0,0);' },
    ],
  }),
  'transform-origin': simpleEntry({
    slug: 'transform-origin',
    category: 'transforms',
    description: "Utilities for controlling an element's transform origin.",
    classes: [
      { name: 'origin-center', styles: 'transform-origin: center;' },
      { name: 'origin-top', styles: 'transform-origin: top;' },
      { name: 'origin-top-right', styles: 'transform-origin: top right;' },
      { name: 'origin-bottom-left', styles: 'transform-origin: bottom left;' },
    ],
  }),
  'transform-style': simpleEntry({
    slug: 'transform-style',
    category: 'transforms',
    description: 'Utilities for controlling whether children are positioned in 3D space.',
    classes: [
      { name: 'transform-flat', styles: 'transform-style: flat;' },
      { name: 'transform-3d', styles: 'transform-style: preserve-3d;' },
    ],
  }),
  translate: simpleEntry({
    slug: 'translate',
    category: 'transforms',
    description: 'Utilities for translating elements.',
    classes: [
      { name: 'translate-x-0', styles: 'transform: translateX(0);' },
      { name: 'translate-x-4', styles: 'transform: translateX(1rem);' },
      { name: 'translate-y-4', styles: 'transform: translateY(1rem);' },
      { name: '-translate-x-4', styles: 'transform: translateX(-1rem);' },
    ],
    makeExample: (cls) =>
      `<div class="p-6"><div class="w-16 h-16 background-[#d70f66] rounded-md ${cls}"></div></div>`,
  }),

  // ============================== INTERACTIVITY ==============================
  'accent-color': simpleEntry({
    slug: 'accent-color',
    category: 'interactivity',
    description: "Utilities for controlling the accented color of form controls.",
    classes: [
      { name: 'accent-[#d70f66]', styles: 'accent-color: #d70f66;' },
      { name: 'accent-black', styles: 'accent-color: #000;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><input type="checkbox" class="${cls}" checked /><input type="range" class="${cls}" /></div>`,
  }),
  appearance: simpleEntry({
    slug: 'appearance',
    category: 'interactivity',
    description: 'Utilities for suppressing native form styling.',
    classes: [
      { name: 'appearance-none', styles: 'appearance: none;' },
      { name: 'appearance-auto', styles: 'appearance: auto;' },
    ],
  }),
  'caret-color': simpleEntry({
    slug: 'caret-color',
    category: 'interactivity',
    description: 'Utilities for controlling the color of the text input cursor.',
    classes: [
      { name: 'caret-[#d70f66]', styles: 'caret-color: #d70f66;' },
      { name: 'caret-black', styles: 'caret-color: #000;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><input placeholder="type here" class="border rounded px-2 py-1 ${cls}" /></div>`,
  }),
  'color-scheme': simpleEntry({
    slug: 'color-scheme',
    category: 'interactivity',
    description: "Utilities for setting the color scheme of a page.",
    classes: [
      { name: 'scheme-light', styles: 'color-scheme: light;' },
      { name: 'scheme-dark', styles: 'color-scheme: dark;' },
      { name: 'scheme-auto', styles: 'color-scheme: normal;' },
    ],
  }),
  cursor: simpleEntry({
    slug: 'cursor',
    category: 'interactivity',
    description: "Utilities for controlling the cursor style.",
    classes: [
      { name: 'cursor-auto', styles: 'cursor: auto;' },
      { name: 'cursor-default', styles: 'cursor: default;' },
      { name: 'cursor-pointer', styles: 'cursor: pointer;' },
      { name: 'cursor-wait', styles: 'cursor: wait;' },
      { name: 'cursor-text', styles: 'cursor: text;' },
      { name: 'cursor-move', styles: 'cursor: move;' },
      { name: 'cursor-not-allowed', styles: 'cursor: not-allowed;' },
      { name: 'cursor-grab', styles: 'cursor: grab;' },
      { name: 'cursor-grabbing', styles: 'cursor: grabbing;' },
    ],
    makeExample: (cls) => tile(cls),
  }),
  'field-sizing': simpleEntry({
    slug: 'field-sizing',
    category: 'interactivity',
    description: 'Utilities for controlling the sizing of form controls.',
    classes: [
      { name: 'field-sizing-fixed', styles: 'field-sizing: fixed;' },
      { name: 'field-sizing-content', styles: 'field-sizing: content;' },
    ],
  }),
  'pointer-events': simpleEntry({
    slug: 'pointer-events',
    category: 'interactivity',
    description: 'Utilities for controlling whether an element responds to pointer events.',
    classes: [
      { name: 'pointer-events-auto', styles: 'pointer-events: auto;' },
      { name: 'pointer-events-none', styles: 'pointer-events: none;' },
    ],
  }),
  resize: simpleEntry({
    slug: 'resize',
    category: 'interactivity',
    description: 'Utilities for controlling how an element can be resized.',
    classes: [
      { name: 'resize-none', styles: 'resize: none;' },
      { name: 'resize', styles: 'resize: both;' },
      { name: 'resize-y', styles: 'resize: vertical;' },
      { name: 'resize-x', styles: 'resize: horizontal;' },
    ],
  }),
  'scroll-behavior': simpleEntry({
    slug: 'scroll-behavior',
    category: 'interactivity',
    description: 'Utilities for controlling the scroll behavior of an element.',
    classes: [
      { name: 'scroll-auto', styles: 'scroll-behavior: auto;' },
      { name: 'scroll-smooth', styles: 'scroll-behavior: smooth;' },
    ],
  }),
  'scroll-margin': simpleEntry({
    slug: 'scroll-margin',
    category: 'interactivity',
    description: "Utilities for controlling the scroll offset of a scrollable snap target.",
    classes: [
      { name: 'scroll-m-0', styles: 'scroll-margin: 0;' },
      { name: 'scroll-m-4', styles: 'scroll-margin: 1rem;' },
      { name: 'scroll-mx-4', styles: 'scroll-margin-inline: 1rem;' },
      { name: 'scroll-my-4', styles: 'scroll-margin-block: 1rem;' },
    ],
  }),
  'scroll-padding': simpleEntry({
    slug: 'scroll-padding',
    category: 'interactivity',
    description: "Utilities for controlling a container's scroll padding.",
    classes: [
      { name: 'scroll-p-0', styles: 'scroll-padding: 0;' },
      { name: 'scroll-p-4', styles: 'scroll-padding: 1rem;' },
      { name: 'scroll-px-4', styles: 'scroll-padding-inline: 1rem;' },
      { name: 'scroll-py-4', styles: 'scroll-padding-block: 1rem;' },
    ],
  }),
  'scroll-snap-align': simpleEntry({
    slug: 'scroll-snap-align',
    category: 'interactivity',
    description: 'Utilities for controlling the scroll snap alignment of an element.',
    classes: [
      { name: 'snap-start', styles: 'scroll-snap-align: start;' },
      { name: 'snap-center', styles: 'scroll-snap-align: center;' },
      { name: 'snap-end', styles: 'scroll-snap-align: end;' },
      { name: 'snap-align-none', styles: 'scroll-snap-align: none;' },
    ],
  }),
  'scroll-snap-stop': simpleEntry({
    slug: 'scroll-snap-stop',
    category: 'interactivity',
    description: "Utilities for controlling whether scroll snap stops are respected.",
    classes: [
      { name: 'snap-normal', styles: 'scroll-snap-stop: normal;' },
      { name: 'snap-always', styles: 'scroll-snap-stop: always;' },
    ],
  }),
  'scroll-snap-type': simpleEntry({
    slug: 'scroll-snap-type',
    category: 'interactivity',
    description: "Utilities for controlling scroll snap behavior on a container.",
    classes: [
      { name: 'snap-none', styles: 'scroll-snap-type: none;' },
      { name: 'snap-x', styles: 'scroll-snap-type: x mandatory;' },
      { name: 'snap-y', styles: 'scroll-snap-type: y mandatory;' },
      { name: 'snap-both', styles: 'scroll-snap-type: both mandatory;' },
      { name: 'snap-mandatory', styles: 'scroll-snap-type: mandatory;' },
      { name: 'snap-proximity', styles: 'scroll-snap-type: proximity;' },
    ],
  }),
  'touch-action': simpleEntry({
    slug: 'touch-action',
    category: 'interactivity',
    description: "Utilities for controlling how an element can be scrolled/zoomed by touch.",
    classes: [
      { name: 'touch-auto', styles: 'touch-action: auto;' },
      { name: 'touch-none', styles: 'touch-action: none;' },
      { name: 'touch-pan-x', styles: 'touch-action: pan-x;' },
      { name: 'touch-pan-y', styles: 'touch-action: pan-y;' },
      { name: 'touch-pinch-zoom', styles: 'touch-action: pinch-zoom;' },
      { name: 'touch-manipulation', styles: 'touch-action: manipulation;' },
    ],
  }),
  'user-select': simpleEntry({
    slug: 'user-select',
    category: 'interactivity',
    description: "Utilities for controlling whether text can be selected.",
    classes: [
      { name: 'select-none', styles: 'user-select: none;' },
      { name: 'select-text', styles: 'user-select: text;' },
      { name: 'select-all', styles: 'user-select: all;' },
      { name: 'select-auto', styles: 'user-select: auto;' },
    ],
  }),
  'will-change': simpleEntry({
    slug: 'will-change',
    category: 'interactivity',
    description: "Utilities for optimizing upcoming changes.",
    classes: [
      { name: 'will-change-auto', styles: 'will-change: auto;' },
      { name: 'will-change-scroll', styles: 'will-change: scroll-position;' },
      { name: 'will-change-contents', styles: 'will-change: contents;' },
      { name: 'will-change-transform', styles: 'will-change: transform;' },
    ],
  }),

  // ============================== SVG ==============================
  fill: simpleEntry({
    slug: 'fill',
    category: 'svg',
    description: "Utilities for styling the fill of SVG elements.",
    classes: [
      { name: 'fill-none', styles: 'fill: none;' },
      { name: 'fill-current', styles: 'fill: currentColor;' },
      { name: 'fill-black', styles: 'fill: #000;' },
      { name: 'fill-[#d70f66]', styles: 'fill: #d70f66;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><svg viewBox="0 0 24 24" class="w-10 h-10 ${cls}"><circle cx="12" cy="12" r="10" /></svg></div>`,
  }),
  stroke: simpleEntry({
    slug: 'stroke',
    category: 'svg',
    description: "Utilities for styling the stroke of SVG elements.",
    classes: [
      { name: 'stroke-none', styles: 'stroke: none;' },
      { name: 'stroke-current', styles: 'stroke: currentColor;' },
      { name: 'stroke-black', styles: 'stroke: #000;' },
      { name: 'stroke-[#d70f66]', styles: 'stroke: #d70f66;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><svg viewBox="0 0 24 24" class="w-10 h-10 fill-none ${cls}" stroke-width="2"><circle cx="12" cy="12" r="10" /></svg></div>`,
  }),
  'stroke-width': simpleEntry({
    slug: 'stroke-width',
    category: 'svg',
    description: 'Utilities for styling the stroke width of SVG elements.',
    classes: [
      { name: 'stroke-0', styles: 'stroke-width: 0;' },
      { name: 'stroke-1', styles: 'stroke-width: 1;' },
      { name: 'stroke-2', styles: 'stroke-width: 2;' },
    ],
    makeExample: (cls) =>
      `<div class="p-4"><svg viewBox="0 0 24 24" class="w-10 h-10 fill-none stroke-[#d70f66] ${cls}"><circle cx="12" cy="12" r="10" /></svg></div>`,
  }),

  // ============================== A11Y ==============================
  'forced-color-adjust': simpleEntry({
    slug: 'forced-color-adjust',
    category: 'a11y',
    description: "Utilities for opting an element in or out of Windows Forced Colors mode.",
    classes: [
      { name: 'forced-color-adjust-auto', styles: 'forced-color-adjust: auto;' },
      { name: 'forced-color-adjust-none', styles: 'forced-color-adjust: none;' },
    ],
  }),
};

// Build UtilityReferencePageProps for a slug by combining catalog data + prev/next auto-wiring.
export function buildPropsFromCatalog(slug: string): UtilityReferencePageProps | undefined {
  const entry = REFERENCE_CATALOG[slug];
  if (!entry) return undefined;
  const { prev, next } = getPrevNext(slug);
  const shortcuts = entry.shortcuts && entry.shortcuts.length > 0
    ? entry.shortcuts
    : getAutoShortcutsForProperty(slug);
  const shortcutsNote = entry.shortcutsNote
    ?? (shortcuts.length > 0
      ? `AeroCraft ships ${shortcuts.length} shortcut${shortcuts.length === 1 ? '' : 's'} that touch ${slug}. One class, the whole intent.`
      : undefined);
  return {
    category: CAT_LABELS[entry.category],
    title: entry.title,
    description: entry.description,
    quickReference: entry.quickReference,
    examples: entry.examples,
    customValue: entry.customValue,
    responsive: entry.responsive ?? {
      description: 'Prefix with a breakpoint to apply the utility from that breakpoint up.',
      code: `<div class="${entry.quickReference[0]?.className ?? entry.title} md:${entry.quickReference[1]?.className ?? entry.quickReference[0]?.className ?? ''}">\n  <!-- ... -->\n</div>`,
    },
    shortcuts,
    shortcutsNote,
    prev: prev ? { to: `/docs/reference/${prev.slug}`, label: prev.label } : undefined,
    next: next ? { to: `/docs/reference/${next.slug}`, label: next.label } : undefined,
  };
}

export function catalogHasSlug(slug: string): boolean {
  return slug in REFERENCE_CATALOG;
}
