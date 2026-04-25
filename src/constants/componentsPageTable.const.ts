export type ComponentShortcutRow = {
  id: string;
  name: string;
  purpose: string;
  configKey: string;
};

export const COMPONENT_SHORTCUT_TABLE_ROWS: ComponentShortcutRow[] = [
  {
    id: 'btn',
    name: 'ac-button',
    purpose: 'one base + variants (e.g. button-primary-rounded)',
    configKey: 'componentRecipes.button',
  },
  {
    id: 'in',
    name: 'ac-input',
    purpose: 'base + shell / focus rings',
    configKey: 'componentRecipes.input',
  },
  {
    id: 'box',
    name: 'ac-box',
    purpose: 'base + border / shadow',
    configKey: 'componentRecipes.box',
  },
  {
    id: 'card',
    name: 'ac-card',
    purpose: 'base + media + body + cta',
    configKey: 'componentRecipes.card',
  },
  {
    id: 'div',
    name: 'ac-container',
    purpose: 'base + max width + gutters',
    configKey: 'componentRecipes.container',
  },
];
