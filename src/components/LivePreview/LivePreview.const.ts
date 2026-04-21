import { resolveConfig } from '@forgedevstack/aerocraft';

export const LIVE_PREVIEW_ARBITRARY_CONFIG = resolveConfig({
  prefix: '',
  separator: '-',
  mode: 'standalone',
  responsive: false,
});

export const LIVE_PREVIEW_ARBITRARY_CLASS_RE = /\[[^\]]*\]|\{\{[^}]+\}\}/;

export const LIVE_PREVIEW_BASE_CSS = `
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    color: inherit;
    padding: 16px;
    min-height: 100%;
    box-sizing: border-box;
  }
  [data-ac-block] { outline: 1px dashed rgba(249,31,125,0.35); border-radius: 8px; }
`;
