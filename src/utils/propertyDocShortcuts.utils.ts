import type { Messages } from '../i18n/types';

function suggestPrefix(property: string): string {
  const p = property.toLowerCase();
  if (p.includes('width') || p === 'width') return 'w';
  if (p.includes('height') || p === 'height') return 'h';
  if (p.includes('padding')) return 'p';
  if (p.includes('margin')) return 'm';
  if (p.includes('gap')) return 'gap';
  if (p.includes('font-size') || p === 'font-size') return 'text';
  if (p.includes('color') && !p.includes('border')) return 'text';
  if (p.includes('background')) return 'bg';
  if (p.includes('border')) return 'border';
  if (p.includes('grid')) return 'grid';
  if (p.includes('flex')) return 'flex';
  if (p.includes('translate') || p.includes('rotate') || p.includes('scale')) return 'transform';
  return 'ac';
}

export function buildPropertyShortcutRows(
  property: string,
  t: Messages,
): { example: string; note: string }[] {
  const prefix = suggestPrefix(property);
  return [
    {
      example: `${prefix}-[value]`,
      note: t.docsProperty.rowArbitrary,
    },
    {
      example: 'md:gap-[12px]',
      note: t.docsProperty.rowResponsive,
    },
    {
      example: 'text-[#2563eb]',
      note: t.docsProperty.rowColor,
    },
    {
      example: 'font-[600,ui-sans-serif]',
      note: t.docsProperty.rowFont,
    },
  ];
}
