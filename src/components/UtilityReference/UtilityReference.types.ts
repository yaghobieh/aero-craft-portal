import type { ReactNode } from 'react';

export interface QuickRefRow {
  className: string;
  styles: string;
}

export interface UtilityExample {
  id: string;
  title: string;
  description?: string;
  markup: string;
  code?: string;
  minHeight?: number;
}

export interface CustomValueBlock {
  description?: string;
  bracketCode: string;
  parenDescription?: string;
  parenCode?: string;
}

export interface ResponsiveBlock {
  description?: string;
  code: string;
}

export interface ShortcutRow {
  name: string;
  styles: string;
  description: string;
}

export interface UtilityReferencePageProps {
  category: string;
  title: string;
  description: string;
  quickReference: QuickRefRow[];
  examples: UtilityExample[];
  customValue?: CustomValueBlock;
  responsive?: ResponsiveBlock;
  shortcuts?: ShortcutRow[];
  shortcutsNote?: ReactNode;
  prev?: { to: string; label: string };
  next?: { to: string; label: string };
}
