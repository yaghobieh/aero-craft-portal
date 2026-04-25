export const DOCS_CLASS_PREFIX = '';

export const DOCS_CLASS_SEPARATOR = '-';

export function parseDocsPathParam(splat: string | undefined): string | undefined {
  const raw = splat ?? '';
  return raw.replace(/^\/+|\/+$/g, '') || undefined;
}
