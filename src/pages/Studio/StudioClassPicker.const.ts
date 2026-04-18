import { ALL_SHORTCUTS, GROUP_LABELS, GROUP_ORDER } from '@forgedevstack/aerocraft';

export interface ClassGroupEntry {
  group: string;
  label: string;
  classes: string[];
}

const buildGroups = (): ClassGroupEntry[] => {
  const out: ClassGroupEntry[] = [];
  for (const group of GROUP_ORDER) {
    const shortcuts = ALL_SHORTCUTS[group];
    if (!shortcuts) continue;
    const classes = Object.keys(shortcuts);
    if (classes.length === 0) continue;
    out.push({ group, label: GROUP_LABELS[group] ?? group, classes });
  }
  return out;
};

export const CLASS_GROUPS: ClassGroupEntry[] = buildGroups();

export const ALL_CLASS_NAMES: string[] = CLASS_GROUPS.flatMap((g) => g.classes);

export const PICKER_WIDTH = 360;

export const PICKER_MAX_HEIGHT = 480;

export const PICKER_MAX_PER_GROUP = 40;
