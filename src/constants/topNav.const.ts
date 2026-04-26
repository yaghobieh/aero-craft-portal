import { ROUTES } from './routes.const';

export type TopNavItem = {
  to: string;
  label: 'home' | 'docs' | 'components' | 'plugin' | 'studio' | 'playground';
  premium: boolean;
};

export const TOP_NAV_ITEMS: TopNavItem[] = [
  { to: ROUTES.HOME, label: 'home', premium: false },
  { to: ROUTES.DOCS, label: 'docs', premium: false },
  { to: ROUTES.COMPONENTS, label: 'components', premium: false },
  { to: ROUTES.DOCS_PLUGIN, label: 'plugin', premium: false },
  { to: ROUTES.STUDIO, label: 'studio', premium: false },
  { to: ROUTES.PLAYGROUND, label: 'playground', premium: false },
];

export const LOCALE_DISPLAY = {
  en: { code: 'EN' },
  es: { code: 'ES' },
} as const;
