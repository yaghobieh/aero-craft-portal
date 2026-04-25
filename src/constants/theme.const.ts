import type { BearThemeOverride } from '@forgedevstack/bear';

export const AC_PRIMARY_SCALE = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
};

export const AC_SECONDARY_SCALE = {
  50: '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
  950: '#1e1b4b',
};

export const AC_ACCENT_SCALE = {
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',
};

export const AC_PRIMARY_HEX = AC_PRIMARY_SCALE[500];
export const AC_PRIMARY_HEX_500 = AC_PRIMARY_SCALE[500];
export const AC_SECONDARY_HEX = AC_SECONDARY_SCALE[500];
export const AC_ACCENT_HEX = AC_ACCENT_SCALE[500];

export const AC_GRADIENT_HERO = [
  AC_PRIMARY_SCALE[600],
  AC_PRIMARY_SCALE[400],
  AC_SECONDARY_SCALE[500],
  AC_SECONDARY_SCALE[700],
];

export const AC_GRADIENT_SOFT = `linear-gradient(135deg, ${AC_PRIMARY_SCALE[600]} 0%, ${AC_PRIMARY_SCALE[400]} 40%, ${AC_SECONDARY_SCALE[500]} 100%)`;

export const AC_ACCENT = AC_PRIMARY_SCALE[600];

export const AC_PRIMARY_SOFT_BG = 'rgba(59, 130, 246, 0.10)';
export const AC_PRIMARY_TILE_BG = 'rgba(59, 130, 246, 0.14)';
export const AC_PRIMARY_TILE_ACCENT_BG = 'rgba(59, 130, 246, 0.22)';
export const AC_PRIMARY_OUTLINE = 'rgba(59, 130, 246, 0.35)';
export const AC_SECONDARY_SOFT_BG = 'rgba(99, 102, 241, 0.12)';

const PLUS_JAKARTA_STACK = `'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif`;
const FIRA_CODE_STACK = `'Fira Code', 'Cascadia Code', 'JetBrains Mono', ui-monospace, monospace`;

export const AEROCRAFT_THEME: BearThemeOverride = {
  colors: {
    primary: AC_PRIMARY_SCALE,
    secondary: AC_SECONDARY_SCALE,
  },
  typography: {
    fontFamily: {
      sans: PLUS_JAKARTA_STACK,
      mono: FIRA_CODE_STACK,
    },
  },
};
