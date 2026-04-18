import type { ShortcutDefinition } from '@forgedevstack/aerocraft';
import { ALL_SHORTCUTS } from '@forgedevstack/aerocraft';
import {
  DOC_SUBGROUPS,
  GAP_SUBGROUP_PREFIXES,
  SPACING_SUBGROUP_PREFIXES,
} from '../constants/docsSubgroups.const';

export type DocSection = {
  id: string;
  shortcuts: ShortcutDefinition[];
};

function partitionDocSections(
  map: Record<string, ShortcutDefinition>,
  rules: { id: string; test: (name: string) => boolean }[],
): DocSection[] {
  const keys = Object.keys(map);
  const used = new Set<string>();
  const out: DocSection[] = [];
  for (const rule of rules) {
    const matched = keys.filter((k) => !used.has(k) && rule.test(k)).sort();
    matched.forEach((k) => used.add(k));
    if (matched.length) {
      out.push({ id: rule.id, shortcuts: matched.map((k) => map[k]).filter(Boolean) });
    }
  }
  const rest = keys.filter((k) => !used.has(k)).sort();
  if (rest.length) {
    out.push({ id: 'other', shortcuts: rest.map((k) => map[k]).filter(Boolean) });
  }
  return out;
}

export function buildDocSections(group: string): DocSection[] {
  const map = ALL_SHORTCUTS[group];
  if (!map) return [];

  if (group === 'spacing') {
    const keys = Object.keys(map);
    return SPACING_SUBGROUP_PREFIXES.map(({ id, test }) => ({
      id,
      shortcuts: keys.filter(test).sort().map((k) => map[k]).filter(Boolean),
    })).filter((s) => s.shortcuts.length > 0);
  }

  if (group === 'gap') {
    const keys = Object.keys(map);
    return GAP_SUBGROUP_PREFIXES.map(({ id, test }) => ({
      id,
      shortcuts: keys.filter(test).sort().map((k) => map[k]).filter(Boolean),
    })).filter((s) => s.shortcuts.length > 0);
  }

  if (group === 'flex') {
    const justifyShortcuts = ['flex-between', 'flex-around', 'flex-evenly'];
    return partitionDocSections(map, [
      { id: 'direction', test: (n) => n === 'flex-col' || n === 'flex-row' },
      { id: 'flexBasis', test: (n) => n.startsWith('basis-') },
      {
        id: 'flexJustify',
        test: (n) => n.startsWith('justify-') || justifyShortcuts.includes(n),
      },
      { id: 'flexItems', test: (n) => n.startsWith('items-') },
      { id: 'flexSelf', test: (n) => n.startsWith('self-') },
      { id: 'flexContent', test: (n) => n.startsWith('content-') },
      { id: 'centering', test: (n) => ['flex-col-center', 'flex-row-center', 'flex-col-j-center', 'flex-row-j-center'].includes(n) },
      { id: 'align', test: (n) => ['flex-col-start', 'flex-col-end', 'flex-row-start', 'flex-row-end'].includes(n) },
      { id: 'wrap', test: (n) => n === 'flex-wrap' || n === 'flex-nowrap' },
      {
        id: 'flexSizing',
        test: (n) => ['flex-1', 'flex-auto', 'flex-none', 'flex-grow', 'flex-shrink', 'flex-shrink-0', 'flex-initial'].includes(n),
      },
      { id: 'flexOrder', test: (n) => n.startsWith('order-') },
    ]);
  }

  if (group === 'size') {
    return partitionDocSections(map, [
      { id: 'sizeCombined', test: (n) => n.startsWith('size-') },
      { id: 'sizeWidth', test: (n) => n.startsWith('w-') },
      { id: 'sizeHeight', test: (n) => n.startsWith('h-') },
      { id: 'sizeMinWidth', test: (n) => n.startsWith('min-w-') },
      { id: 'sizeMaxWidth', test: (n) => n.startsWith('max-w-') },
      { id: 'sizeMinHeight', test: (n) => n.startsWith('min-h-') },
      { id: 'sizeMaxHeight', test: (n) => n.startsWith('max-h-') },
    ]);
  }

  const defs = DOC_SUBGROUPS[group];
  if (!defs) return [{ id: 'all', shortcuts: Object.values(map) }];

  return defs.map(({ id, keys }) => ({
    id,
    shortcuts: keys.length ? keys.map((k) => map[k]).filter(Boolean) : Object.values(map),
  })).filter((s) => s.shortcuts.length > 0);
}
