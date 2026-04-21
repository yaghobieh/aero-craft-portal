import { renderArbitraryStandaloneRule } from '@forgedevstack/aerocraft';
import { LIVE_PREVIEW_ARBITRARY_CLASS_RE, LIVE_PREVIEW_ARBITRARY_CONFIG } from './LivePreview.const';

const CLASS_ATTR_RE = /class\s*=\s*"([^"]+)"/g;

export function buildArbitraryCss(classes: string[]): string {
  const out: string[] = [];
  for (const cls of classes) {
    if (!LIVE_PREVIEW_ARBITRARY_CLASS_RE.test(cls)) continue;
    const rule = renderArbitraryStandaloneRule(LIVE_PREVIEW_ARBITRARY_CONFIG, cls);
    if (rule) out.push(rule);
  }
  return out.join('\n');
}

function escapeRegex(src: string): string {
  return src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cssHexEscape(ch: string): string {
  return `\\${ch.charCodeAt(0).toString(16)} `;
}

/**
 * AeroCraft CSS identifiers escape non-word chars. Replicate the same rules so we can grep the
 * emitted stylesheet for a class selector given its plain name.
 */
export function escapeCssSelector(name: string): string {
  let escaped = name.replace(/[^a-zA-Z0-9_-]/g, (ch) => `\\${ch}`);
  if (/^[0-9]/.test(escaped)) {
    escaped = cssHexEscape(escaped[0]) + escaped.slice(1);
  }
  return escaped;
}

/**
 * Returns the declaration block text for `.className { ... }` found in the given CSS source.
 * Returns an empty string when no rule is found (e.g. styles from inline style attributes).
 */
export function findRuleForClass(css: string, className: string): string {
  const selector = escapeCssSelector(className);
  const re = new RegExp(`\\.${escapeRegex(selector)}\\s*\\{([^}]*)\\}`, 'g');
  const parts: string[] = [];
  let match = re.exec(css);
  while (match) {
    parts.push(match[1].trim());
    match = re.exec(css);
  }
  return parts.join('\n').trim();
}

/**
 * Extracts a unique list of class names from HTML markup by reading class="..." attributes.
 */
export function extractClassesFromMarkup(markup: string): string[] {
  const seen = new Set<string>();
  let match = CLASS_ATTR_RE.exec(markup);
  while (match) {
    for (const cls of match[1].split(/\s+/)) {
      if (cls) seen.add(cls);
    }
    match = CLASS_ATTR_RE.exec(markup);
  }
  return Array.from(seen);
}

export function extractPreviewSampleFromDeclarations(decl: string): string | null {
  const t = decl.replace(/!important/gi, '').trim();
  if (!t) return null;
  const hex = t.match(/#[0-9a-fA-F]{3,8}\b/);
  if (hex) return hex[0];
  const rgb = t.match(/rgba?\([^)]+\)/);
  if (rgb) return rgb[0];
  const varRef = t.match(/var\([^)]+\)/);
  if (varRef) return varRef[0];
  return null;
}
