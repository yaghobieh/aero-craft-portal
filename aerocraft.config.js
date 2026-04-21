import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  responsive: true,
  theme: {
    colors: {
      brand: {
        DEFAULT: '#d70f66',
        500: '#f91f7d',
        600: '#d70f66',
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
      css: { 'background-image': 'linear-gradient(90deg, #f91f7d, #a324dd)' },
      group: 'background',
    },
  },
});

export const BRAND = {
  primary: '#d70f66',
  primary500: '#f91f7d',
  secondary: '#a324dd',
  accent: '#ff8a3c',
  surface: '#140c1c',
  surfaceMuted: '#22112d',
};
