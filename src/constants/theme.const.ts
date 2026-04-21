import type { BearThemeOverride } from '@forgedevstack/bear';
import { portalBrand } from '../config/portal.config';

export const AC_PRIMARY_SCALE = {
  50: '#fff1f7',
  100: '#ffdcec',
  200: '#ffb6d7',
  300: '#ff86bb',
  400: '#ff4f9b',
  500: '#f91f7d',
  600: portalBrand.primaryHex,
  700: '#ae0a53',
  800: '#7d0740',
  900: '#4f032a',
  950: '#2a0116',
};

export const AC_SECONDARY_SCALE = {
  50: '#fdf2ff',
  100: '#f8dcff',
  200: '#eeb2ff',
  300: '#dd7dff',
  400: '#c34df7',
  500: '#a324dd',
  600: '#8315b5',
  700: '#670e8e',
  800: '#4a096a',
  900: '#2d0544',
  950: '#180128',
};

export const AC_ACCENT_SCALE = {
  300: '#ffbd8b',
  400: '#ffa362',
  500: '#ff8a3c',
  600: '#e66a1f',
};

export const AC_PRIMARY_HEX = AC_PRIMARY_SCALE[600];
export const AC_PRIMARY_HEX_500 = AC_PRIMARY_SCALE[500];
export const AC_SECONDARY_HEX = AC_SECONDARY_SCALE[500];
export const AC_ACCENT_HEX = AC_ACCENT_SCALE[500];

export const AC_GRADIENT_HERO = [
  AC_PRIMARY_SCALE[600],
  AC_PRIMARY_SCALE[400],
  AC_SECONDARY_SCALE[400],
  AC_SECONDARY_SCALE[700],
];

export const AC_GRADIENT_SOFT = `linear-gradient(135deg, ${AC_PRIMARY_SCALE[600]} 0%, ${AC_PRIMARY_SCALE[400]} 40%, ${AC_SECONDARY_SCALE[500]} 100%)`;

export const AC_ACCENT = AC_PRIMARY_SCALE[600];

export const AC_PRIMARY_SOFT_BG = 'rgba(249, 31, 125, 0.10)';
export const AC_PRIMARY_TILE_BG = 'rgba(249, 31, 125, 0.14)';
export const AC_PRIMARY_TILE_ACCENT_BG = 'rgba(249, 31, 125, 0.22)';
export const AC_PRIMARY_OUTLINE = 'rgba(249, 31, 125, 0.35)';
export const AC_SECONDARY_SOFT_BG = 'rgba(163, 36, 221, 0.12)';

export const AEROCRAFT_THEME: BearThemeOverride = {
  colors: {
    primary: AC_PRIMARY_SCALE,
    secondary: AC_SECONDARY_SCALE,
  },
};
