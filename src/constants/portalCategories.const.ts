export type PortalCategoryId =
  | 'layout'
  | 'flex'
  | 'grid'
  | 'spacing'
  | 'sizing'
  | 'typography'
  | 'backgrounds'
  | 'borders'
  | 'effects'
  | 'filters'
  | 'tables'
  | 'transitions'
  | 'transforms'
  | 'interactivity'
  | 'svg'
  | 'a11y';

export interface PortalCategory {
  id: PortalCategoryId;
  label: string;
  properties: string[];
}

export const PORTAL_CATEGORIES: PortalCategory[] = [
  {
    id: 'layout',
    label: 'Layout',
    properties: [
      'aspect-ratio',
      'columns',
      'break-after',
      'break-before',
      'break-inside',
      'box-decoration-break',
      'box-sizing',
      'display',
      'float',
      'clear',
      'isolation',
      'object-fit',
      'object-position',
      'overflow',
      'overscroll-behavior',
      'position',
      'inset',
      'visibility',
      'z-index',
    ],
  },
  {
    id: 'flex',
    label: 'Flexbox',
    properties: [
      'flex-basis',
      'flex-direction',
      'flex-wrap',
      'flex',
      'flex-grow',
      'flex-shrink',
      'order',
      'gap',
      'justify-content',
      'justify-items',
      'justify-self',
      'align-content',
      'align-items',
      'align-self',
      'place-content',
      'place-items',
      'place-self',
    ],
  },
  {
    id: 'grid',
    label: 'Grid',
    properties: [
      'grid-template-columns',
      'grid-column',
      'grid-template-rows',
      'grid-row',
      'grid-auto-flow',
      'grid-auto-columns',
      'grid-auto-rows',
    ],
  },
  {
    id: 'spacing',
    label: 'Spacing',
    properties: ['padding', 'margin'],
  },
  {
    id: 'sizing',
    label: 'Sizing',
    properties: [
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'size',
      'inline-size',
      'min-inline-size',
      'max-inline-size',
      'block-size',
      'min-block-size',
      'max-block-size',
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    properties: [
      'font-family',
      'font-size',
      'font-smoothing',
      'font-style',
      'font-weight',
      'font-stretch',
      'font-variant-numeric',
      'font-feature-settings',
      'letter-spacing',
      'line-clamp',
      'line-height',
      'list-style-image',
      'list-style-position',
      'list-style-type',
      'text-align',
      'color',
      'text-decoration-line',
      'text-decoration-color',
      'text-decoration-style',
      'text-decoration-thickness',
      'text-underline-offset',
      'text-transform',
      'text-overflow',
      'text-wrap',
      'text-indent',
      'vertical-align',
      'white-space',
      'word-break',
      'overflow-wrap',
      'hyphens',
      'content',
    ],
  },
  {
    id: 'backgrounds',
    label: 'Backgrounds',
    properties: [
      'background-attachment',
      'background-clip',
      'background-color',
      'background-image',
      'background-origin',
      'background-position',
      'background-repeat',
      'background-size',
    ],
  },
  {
    id: 'borders',
    label: 'Borders',
    properties: [
      'border-radius',
      'border-width',
      'border-color',
      'border-style',
      'outline-width',
      'outline-color',
      'outline-style',
      'outline-offset',
    ],
  },
  {
    id: 'effects',
    label: 'Effects',
    properties: [
      'box-shadow',
      'text-shadow',
      'opacity',
      'mix-blend-mode',
      'background-blend-mode',
      'mask-clip',
      'mask-composite',
      'mask-image',
      'mask-mode',
      'mask-origin',
      'mask-position',
      'mask-repeat',
      'mask-size',
      'mask-type',
    ],
  },
  {
    id: 'filters',
    label: 'Filters',
    properties: [
      'filter',
      'blur',
      'brightness',
      'contrast',
      'drop-shadow',
      'grayscale',
      'hue-rotate',
      'invert',
      'saturate',
      'sepia',
      'backdrop-filter',
      'backdrop-blur',
      'backdrop-brightness',
      'backdrop-contrast',
      'backdrop-grayscale',
      'backdrop-hue-rotate',
      'backdrop-invert',
      'backdrop-opacity',
      'backdrop-saturate',
      'backdrop-sepia',
    ],
  },
  {
    id: 'tables',
    label: 'Tables',
    properties: ['border-collapse', 'border-spacing', 'table-layout', 'caption-side'],
  },
  {
    id: 'transitions',
    label: 'Transitions & Animation',
    properties: [
      'transition-property',
      'transition-behavior',
      'transition-duration',
      'transition-timing-function',
      'transition-delay',
      'animation',
    ],
  },
  {
    id: 'transforms',
    label: 'Transforms',
    properties: [
      'backface-visibility',
      'perspective',
      'perspective-origin',
      'rotate',
      'scale',
      'skew',
      'transform',
      'transform-origin',
      'transform-style',
      'translate',
    ],
  },
  {
    id: 'interactivity',
    label: 'Interactivity',
    properties: [
      'accent-color',
      'appearance',
      'caret-color',
      'color-scheme',
      'cursor',
      'field-sizing',
      'pointer-events',
      'resize',
      'scroll-behavior',
      'scroll-margin',
      'scroll-padding',
      'scroll-snap-align',
      'scroll-snap-stop',
      'scroll-snap-type',
      'touch-action',
      'user-select',
      'will-change',
    ],
  },
  {
    id: 'svg',
    label: 'SVG',
    properties: ['fill', 'stroke', 'stroke-width'],
  },
  {
    id: 'a11y',
    label: 'Accessibility',
    properties: ['forced-color-adjust'],
  },
];

export const ALL_PROPERTY_SLUGS: string[] = PORTAL_CATEGORIES.flatMap((c) => c.properties);

export function getCategoryOf(slug: string): PortalCategory | undefined {
  return PORTAL_CATEGORIES.find((c) => c.properties.includes(slug));
}

export function getPrevNext(slug: string): {
  prev?: { slug: string; label: string };
  next?: { slug: string; label: string };
} {
  const idx = ALL_PROPERTY_SLUGS.indexOf(slug);
  if (idx === -1) return {};
  const prev = idx > 0 ? ALL_PROPERTY_SLUGS[idx - 1] : undefined;
  const next = idx < ALL_PROPERTY_SLUGS.length - 1 ? ALL_PROPERTY_SLUGS[idx + 1] : undefined;
  return {
    prev: prev ? { slug: prev, label: prev } : undefined,
    next: next ? { slug: next, label: next } : undefined,
  };
}
