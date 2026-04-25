import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  responsive: true,
  theme: {
    colors: {
      brand: {
        DEFAULT: '#2563eb',
        500: '#3b82f6',
        600: '#1d4ed8',
      },
      secondary: '#a324dd',
      accent: '#ff8a3c',
      surface: '#140c1c',
      'surface-muted': '#22112d',
    },
    fontFamily: {
      display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'Cascadia Code', 'JetBrains Mono', 'ui-monospace', 'monospace'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  customShortcuts: {
    'background-brand-gradient': {
      css: { 'background-image': 'linear-gradient(90deg, #3b82f6, #6366f1)' },
      group: 'background',
    },
    'portal-top-shell': {
      group: 'layout',
      css: {
        position: 'sticky',
        top: '0',
        'z-index': '100',
        width: '100%',
        'min-height': '60px',
        'border-bottom': '1px solid var(--bear-border-default)',
        'background-color': 'var(--bear-bg-secondary)',
        'box-shadow': '0 1px 0 var(--bear-border-subtle)',
      },
    },
    'portal-top-inner': {
      group: 'layout',
      css: {
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'nowrap',
        'align-items': 'center',
        'justify-content': 'space-between',
        width: '100%',
        'max-width': '100%',
        'min-width': '0',
        'min-height': '60px',
        'box-sizing': 'border-box',
        padding: '8px 16px',
        gap: '8px',
      },
    },
    'portal-brand-link': {
      group: 'layout',
      css: {
        flex: '0 0 auto',
        'flex-shrink': '0',
        'text-decoration': 'none',
        color: 'inherit',
      },
    },
    'portal-nav-rail': {
      group: 'layout',
      css: { flex: '1 1 0', 'min-width': '0', 'max-width': '100%' },
    },
    'portal-nav-actions': {
      group: 'layout',
      css: { flex: '0 0 auto', 'flex-shrink': '0', 'flex-wrap': 'nowrap' },
    },
    'portal-nav-link': {
      group: 'layout',
      css: {
        'border-radius': '8px',
        padding: '8px 12px',
        'font-weight': '500',
        'font-size': '14px',
        'line-height': '1.2',
        'white-space': 'nowrap',
        color: 'var(--bear-text-primary)',
        border: '1px solid transparent',
        background: 'transparent',
      },
    },
    'portal-nav-link-active': {
      group: 'layout',
      css: { 'border-color': 'var(--bear-border-default)', color: 'var(--bear-text-primary)' },
    },
    'portal-search-chip': {
      group: 'layout',
      css: { 'font-size': '12px', color: 'var(--bear-text-muted)', 'border-color': 'var(--bear-border-default)', 'border-radius': '8px' },
    },
    'portal-kbd': {
      group: 'font',
      css: { 'font-family': "'Fira Code', 'Cascadia Code', 'JetBrains Mono', ui-monospace, monospace", 'font-size': '12px' },
    },
    'portal-bear-fg': {
      group: 'color',
      css: { color: 'var(--bear-text-primary)' },
    },
    'portal-icon-btn': {
      group: 'layout',
      css: { 'min-width': '40px' },
    },
    'portal-locale-btn': {
      group: 'font',
      css: {
        'font-size': '12px',
        'font-family': "'Fira Code', 'Cascadia Code', 'JetBrains Mono', ui-monospace, monospace",
      },
    },
    'portal-version-badge': {
      group: 'font',
      css: { 'font-size': '11px', 'font-family': "'Fira Code', 'Cascadia Code', 'JetBrains Mono', ui-monospace, monospace" },
    },
    'portal-premium-badge': {
      group: 'font',
      css: { 'font-size': '9px', 'text-transform': 'uppercase', 'letter-spacing': '0.04em' },
    },
    'portal-drawer': {
      group: 'layout',
      css: { padding: '16px' },
    },
    'portal-drawer-search': {
      group: 'layout',
      css: { 'justify-content': 'flex-start' },
    },
    'portal-drawer-icons': {
      group: 'layout',
      css: { 'margin-top': '8px' },
    },
    'portal-page': {
      group: 'layout',
      css: { 'max-width': '1000px', width: '100%', margin: '0 auto' },
    },
    'portal-page-lead': {
      group: 'layout',
      css: { 'max-width': '820px' },
    },
    'portal-recipe-card': {
      group: 'layout',
      css: { width: '100%', padding: '16px' },
    },
    'portal-preview-shell': {
      group: 'layout',
      css: { width: '100%', 'min-width': '0' },
    },
    'portal-table-wrap': {
      group: 'layout',
      css: {
        width: '100%',
        'min-width': '0',
        overflow: 'auto',
        'border-radius': '12px',
        border: '1px solid var(--bear-border-default)',
      },
    },
    'portal-grid-table': {
      group: 'layout',
      css: { width: '100%' },
    },
  },
});

export const BRAND = {
  primary: '#2563eb',
  primary500: '#3b82f6',
  secondary: '#a324dd',
  accent: '#ff8a3c',
  surface: '#140c1c',
  surfaceMuted: '#22112d',
};
