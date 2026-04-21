import type { ReactNode } from 'react';
import { BearIcons } from '@forgedevstack/bear';

export const DOCS_SIDEBAR_CATEGORY_ICON: Record<string, ReactNode> = {
  layout: <BearIcons.LayersIcon size="xs" />,
  flex: <BearIcons.AlignCenterIcon size="xs" />,
  grid: <BearIcons.GridIcon size="xs" />,
  spacing: <BearIcons.BoxIcon size="xs" />,
  sizing: <BearIcons.MaximizeIcon size="xs" />,
  typography: <BearIcons.TextFieldsIcon size="xs" />,
  backgrounds: <BearIcons.ImageIcon size="xs" />,
  borders: <BearIcons.BoxIcon size="xs" />,
  effects: <BearIcons.SparklesIcon size="xs" />,
  filters: <BearIcons.DropletIcon size="xs" />,
  tables: <BearIcons.TableIcon size="xs" />,
  transitions: <BearIcons.ZapIcon size="xs" />,
  transforms: <BearIcons.RefreshIcon size="xs" />,
  interactivity: <BearIcons.MouseIcon size="xs" />,
  svg: <BearIcons.EditIcon size="xs" />,
  a11y: <BearIcons.AccessibilityIcon size="xs" />,
};
