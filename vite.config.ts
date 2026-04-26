import path from 'path';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { getAllSitemapPaths } from './src/constants/docsSitemapPaths.const';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ORIGIN = 'https://aerocraftjs.com';

function sitemapPriority(loc: string): string {
  if (loc === '/') return '1.0';
  if (loc === '/docs' || loc.startsWith('/docs/')) return '0.85';
  if (loc === '/components') return '0.82';
  if (loc === '/studio' || loc === '/playground') return '0.8';
  return '0.7';
}

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'aerocraft-sitemap',
      closeBundle() {
        const lastmod = new Date().toISOString().slice(0, 10);
        const urls = getAllSitemapPaths();
        const body = urls
          .map((loc) => {
            const pr = sitemapPriority(loc);
            return `  <url><loc>${SITE_ORIGIN}${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${pr}</priority></url>`;
          })
          .join('\n');
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
        writeFileSync(path.join(__dirname, 'dist', 'sitemap.xml'), xml);
      },
    },
  ],
  resolve: {
    alias: [
      { find: 'vue', replacement: path.resolve(__dirname, 'src/vue.ts') },
      { find: '@config', replacement: path.resolve(__dirname, 'src/config') },
      {
        find: /^@forgedevstack\/aerocraft$/,
        replacement: path.resolve(__dirname, 'src/shims/aerocraft-browser.ts'),
      },
    ],
  },
});
