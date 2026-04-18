import { buildClassName } from '@forgedevstack/aerocraft';
import { portalAeroDemo } from '../config/portal.config';
import type { DocSection } from './docsSections.utils';

export function buildPortalDemoExampleMarkup(sec: DocSection): string {
  const names = sec.shortcuts.slice(0, 5).map((s) => s.name);
  const cls = names
    .map((n) => buildClassName(portalAeroDemo.prefix, portalAeroDemo.separator, n))
    .join(' ');
  return `<div class="${cls}">\n  <span>Preview</span>\n</div>`;
}
