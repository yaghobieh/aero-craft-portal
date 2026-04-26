import { ALL_SHORTCUTS } from '@forgedevstack/aerocraft';
import type { AeroCraftShortcutEntry } from '@forgedevstack/aerocraft';
import type { ShortcutRow } from '../components/UtilityReference/UtilityReference.types';

type CssMatcher = (cssProp: string) => boolean;

const AGGREGATE_MATCHERS: Record<string, CssMatcher> = {
  padding: (p) => p === 'padding' || p.startsWith('padding-'),
  margin: (p) => p === 'margin' || p.startsWith('margin-'),
  gap: (p) => p === 'gap' || p === 'row-gap' || p === 'column-gap',
  inset: (p) =>
    p === 'inset'
    || p === 'top'
    || p === 'right'
    || p === 'bottom'
    || p === 'left'
    || p.startsWith('inset-'),
  'border-width': (p) =>
    p === 'border-width'
    || /^border(-top|-right|-bottom|-left|-block|-block-start|-block-end|-inline|-inline-start|-inline-end|-x|-y)?-width$/.test(p),
  'border-color': (p) =>
    p === 'border-color'
    || /^border(-top|-right|-bottom|-left|-block|-block-start|-block-end|-inline|-inline-start|-inline-end|-x|-y)?-color$/.test(p),
  'border-style': (p) =>
    p === 'border-style'
    || /^border(-top|-right|-bottom|-left|-block|-inline)?-style$/.test(p),
  'border-radius': (p) =>
    p === 'border-radius'
    || p.startsWith('border-')
    && p.endsWith('-radius'),
  'scroll-margin': (p) => p === 'scroll-margin' || p.startsWith('scroll-margin-'),
  'scroll-padding': (p) => p === 'scroll-padding' || p.startsWith('scroll-padding-'),
  'text-decoration-line': (p) => p === 'text-decoration-line' || p === 'text-decoration',
  'text-decoration-color': (p) => p === 'text-decoration-color',
  transform: (p) =>
    p === 'transform' || p === '--ac-rotate' || p === '--ac-scale' || p === '--ac-translate-x' || p === '--ac-translate-y' || p === '--ac-skew-x' || p === '--ac-skew-y',
  filter: (p) => p === 'filter',
  'backdrop-filter': (p) => p === 'backdrop-filter',
  animation: (p) => p === 'animation' || p === 'animation-name',
  'flex-basis': (p) => p === 'flex-basis' || p === 'flex',
  flex: (p) => p === 'flex' || p === 'flex-grow' || p === 'flex-shrink' || p === 'flex-basis',
};

function buildMatcher(slug: string): CssMatcher {
  const aggregate = AGGREGATE_MATCHERS[slug];
  if (aggregate) return aggregate;
  return (p) => p === slug;
}

function cssRecordToString(css: Record<string, string>): string {
  return Object.entries(css)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}

export function getAutoShortcutsForProperty(slug: string): ShortcutRow[] {
  const match = buildMatcher(slug);
  const rows: ShortcutRow[] = [];
  const seen = new Set<string>();

  for (const group of Object.values(ALL_SHORTCUTS)) {
    for (const [shortcutName, short] of Object.entries(group) as [string, AeroCraftShortcutEntry][]) {
      if (seen.has(shortcutName)) continue;
      const cssProps = Object.keys(short.css);
      if (cssProps.some(match)) {
        rows.push({
          name: shortcutName,
          styles: cssRecordToString(short.css),
          description: short.description ?? '',
        });
        seen.add(shortcutName);
      }
    }
  }

  return rows;
}
