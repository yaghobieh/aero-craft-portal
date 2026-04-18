export const GUIDE_SLUGS = ['cascade-layers', 'transitions-and-animations', 'theme-colors'] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export const GUIDE_SLUG_TO_I18N: Record<GuideSlug, 'cascadeLayers' | 'transitions' | 'themeColors'> = {
  'cascade-layers': 'cascadeLayers',
  'transitions-and-animations': 'transitions',
  'theme-colors': 'themeColors',
};

export function isGuideSlug(s: string | undefined): s is GuideSlug {
  return !!s && (GUIDE_SLUGS as readonly string[]).includes(s);
}
