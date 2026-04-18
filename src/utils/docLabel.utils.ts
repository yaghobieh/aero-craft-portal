import type { Messages } from '../i18n/types';

export function formatCssPropertySlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function docNavLabel(t: Messages, path: string): string {
  const nav = t.docsNav[path];
  if (nav) return nav;
  const last = path.split('/').pop() ?? path;
  return formatCssPropertySlug(last);
}
