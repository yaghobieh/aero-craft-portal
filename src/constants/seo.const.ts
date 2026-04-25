export const SEO_SITE_NAME = 'AeroCraft';
export const SEO_DEFAULT_TITLE = 'AeroCraft — CSS shortcut utilities | ForgeStack';
export const SEO_DEFAULT_DESCRIPTION =
  'Shortcut-first utility classes for CSS via PostCSS. Design tokens, component presets, Studio, and docs. Part of ForgeStack.';
export const SEO_SITE_ORIGIN = 'https://aerocraftjs.com';
export const SEO_OG_IMAGE = `${SEO_SITE_ORIGIN}/logo-mark.svg`;
export const SEO_TWITTER_HANDLE = '@forgedevstack';

export type SeoConfig = {
  title: string;
  description: string;
};

const DOCS_SEO: SeoConfig = {
  title: 'Documentation | AeroCraft',
  description:
    'Guides, core concepts, property reference, recipes, and best practices for AeroCraft shortcut utilities and PostCSS.',
};

const STUDIO_SEO: SeoConfig = {
  title: 'Class Studio | AeroCraft',
  description:
    'Compose layout blocks, edit AeroCraft classes live, and export HTML. Visual class picker for every utility.',
};

const PLAYGROUND_SEO: SeoConfig = {
  title: 'Playground | AeroCraft',
  description: 'Paste HTML using AeroCraft classes and preview with the pre-built stylesheet.',
};

const GET_STARTED_SEO: SeoConfig = {
  title: 'Get started | AeroCraft',
  description: 'Install AeroCraft, add PostCSS, and ship your first shortcut classes.',
};

const COMPONENTS_SEO: SeoConfig = {
  title: 'Component presets | AeroCraft',
  description:
    'Ready-made AeroCraft class bundles for buttons, inputs, containers, and cards. Tune presets in config and copy markup into Studio.',
};

export function resolveSeoForPath(pathname: string): SeoConfig {
  if (pathname === '/' || pathname === '') {
    return { title: SEO_DEFAULT_TITLE, description: SEO_DEFAULT_DESCRIPTION };
  }
  if (pathname.startsWith('/components')) {
    return COMPONENTS_SEO;
  }
  if (pathname.startsWith('/docs')) {
    return DOCS_SEO;
  }
  if (pathname.startsWith('/studio')) {
    return STUDIO_SEO;
  }
  if (pathname.startsWith('/playground')) {
    return PLAYGROUND_SEO;
  }
  if (pathname.startsWith('/get-started')) {
    return GET_STARTED_SEO;
  }
  return { title: SEO_DEFAULT_TITLE, description: SEO_DEFAULT_DESCRIPTION };
}

export function toAbsoluteUrl(pathname: string): string {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SEO_SITE_ORIGIN}${p}`;
}
