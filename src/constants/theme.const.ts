import type { BearThemeOverride } from '@forgedevstack/bear';
import { portalBrand } from '../config/portal.config';

export const AC_PRIMARY_SCALE = {
  50: '#fdf2f8',
  100: '#fce7f3',
  200: '#fbcfe8',
  300: '#f9a8d4',
  400: '#f472b6',
  500: '#ec4899',
  600: portalBrand.primaryHex,
  700: '#be185d',
  800: '#9d174d',
  900: '#831843',
  950: '#500724',
};

export const AC_SECONDARY_SCALE = {
  50: '#fdf4ff',
  100: '#fae8ff',
  200: '#f5d0fe',
  300: '#f0abfc',
  400: '#e879f9',
  500: '#d946ef',
  600: '#c026d3',
  700: '#a21caf',
  800: '#86198f',
  900: '#701a75',
  950: '#4a044e',
};

export const AC_GRADIENT_HERO = [AC_PRIMARY_SCALE[600], AC_PRIMARY_SCALE[400], AC_SECONDARY_SCALE[400]];

export const AC_ACCENT = AC_PRIMARY_SCALE[600];

export const AC_PRIMARY_SOFT_BG = 'rgba(236, 72, 153, 0.10)';
export const AC_PRIMARY_TILE_BG = 'rgba(236, 72, 153, 0.14)';
export const AC_PRIMARY_TILE_ACCENT_BG = 'rgba(236, 72, 153, 0.24)';
export const AC_PRIMARY_OUTLINE = 'rgba(236, 72, 153, 0.38)';

export const AEROCRAFT_THEME: BearThemeOverride = {
  colors: {
    primary: AC_PRIMARY_SCALE,
    secondary: AC_SECONDARY_SCALE,
  },
};
