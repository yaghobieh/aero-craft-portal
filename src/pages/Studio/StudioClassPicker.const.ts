import { ALL_SHORTCUTS, GROUP_LABELS, GROUP_ORDER, listResolvedUtilityNames, resolveConfig } from '@forgedevstack/aerocraft';
import type { AeroCraftConfig } from '@forgedevstack/aerocraft';
import aerocraftPortalConfig from '../../../aerocraft.config.js';

export interface ClassGroupEntry {
  group: string;
  label: string;
  classes: string[];
}

const portalCfg = aerocraftPortalConfig as AeroCraftConfig & { default?: AeroCraftConfig };
export const PORTAL_AEROCRAFT_RESOLVED = resolveConfig(portalCfg.default ?? portalCfg);

const buildGroups = (): ClassGroupEntry[] => {
  const out: ClassGroupEntry[] = [];
  for (const group of GROUP_ORDER) {
    const shortcuts = ALL_SHORTCUTS[group];
    if (!shortcuts) continue;
    const classes = Object.keys(shortcuts);
    if (classes.length === 0) continue;
    out.push({ group, label: GROUP_LABELS[group] ?? group, classes });
  }
  const staticSet = new Set(out.flatMap((g) => g.classes));
  const extra = Object.keys(PORTAL_AEROCRAFT_RESOLVED.customShortcuts)
    .filter((k) => !staticSet.has(k))
    .sort((a, b) => a.localeCompare(b));
  if (extra.length > 0) {
    out.push({ group: 'theme', label: 'Theme & custom', classes: extra });
  }
  return out;
};

export const CLASS_GROUPS: ClassGroupEntry[] = buildGroups();

export const ALL_CLASS_NAMES: string[] = listResolvedUtilityNames(PORTAL_AEROCRAFT_RESOLVED);

export const PICKER_WIDTH = 360;

export const PICKER_MAX_HEIGHT = 480;

export const PICKER_MAX_PER_GROUP = 40;
