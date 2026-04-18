import type { FrameworkEntry } from './FrameworkTabs.types';

const POSTCSS_CONFIG = `import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';
import config from './aerocraft.config';

export default { plugins: [aerocraftPlugin(config)] };`;

const AERO_CONFIG = `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  prefix: '',
  separator: '-',
  mode: 'standalone',
  content: ['src/**/*.{ts,tsx,js,jsx,vue,svelte,html}'],
  responsive: true,
});`;

const CSS_ENTRY = `@aerocraft;

*, *::before, *::after { box-sizing: border-box; }`;

export const FRAMEWORKS: FrameworkEntry[] = [
  {
    id: 'react',
    label: 'React',
    install: 'npm i @forgedevstack/aerocraft postcss',
    entryImport: `import './styles/index.css';`,
    blocks: [
      { title: 'src/main.tsx', language: 'typescript', code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);` },
      { title: 'App.tsx', language: 'tsx', code: `export default function App() {
  return (
    <main className="flex-col-center gap-4 p-8">
      <h1 className="font-bold">AeroCraft + React</h1>
      <p className="text-[#94a3b8]">Composable classes. Zero runtime.</p>
    </main>
  );
}` },
      { title: 'postcss.config.ts', language: 'typescript', code: POSTCSS_CONFIG },
      { title: 'aerocraft.config.ts', language: 'typescript', code: AERO_CONFIG },
      { title: 'src/styles/index.css', language: 'css', code: CSS_ENTRY },
    ],
    note: 'Works out of the box with Vite, CRA, Next.js, and any bundler that runs PostCSS.',
  },
  {
    id: 'vue',
    label: 'Vue',
    install: 'npm i @forgedevstack/aerocraft postcss',
    entryImport: `import './styles/index.css';`,
    blocks: [
      { title: 'src/main.ts', language: 'typescript', code: `import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.css';

createApp(App).mount('#app');` },
      { title: 'App.vue', language: 'html', code: `<template>
  <main class="flex-col-center gap-4 p-8">
    <h1 class="font-bold">AeroCraft + Vue</h1>
    <p class="text-[#94a3b8]">Use curly {{ '{{...}}' }} arbitrary values in templates.</p>
  </main>
</template>` },
      { title: 'postcss.config.ts', language: 'typescript', code: POSTCSS_CONFIG },
      { title: 'aerocraft.config.ts', language: 'typescript', code: AERO_CONFIG },
    ],
    note: 'Prefer curly arbitrary values gap-{{12px}} inside Vue templates to avoid colliding with v-bind.',
  },
  {
    id: 'angular',
    label: 'Angular',
    install: 'npm i @forgedevstack/aerocraft postcss postcss-loader',
    entryImport: `@import "./styles/index.css";`,
    blocks: [
      { title: 'src/styles.scss', language: 'scss', code: `@import "./styles/index.css";

/* Angular passes SCSS through PostCSS; @aerocraft expands normally. */` },
      { title: 'app.component.html', language: 'html', code: `<main class="flex-col-center gap-4 p-8">
  <h1 class="font-bold">AeroCraft + Angular</h1>
  <p class="text-[#94a3b8]">All utilities are plain classes — no directive needed.</p>
</main>` },
      { title: 'postcss.config.js', language: 'javascript', code: `module.exports = {
  plugins: [require('@forgedevstack/aerocraft/postcss').aerocraftPlugin(require('./aerocraft.config'))],
};` },
      { title: 'aerocraft.config.js', language: 'javascript', code: `const { defineConfig } = require('@forgedevstack/aerocraft');
module.exports = defineConfig({ responsive: true, content: ['src/**/*.{ts,html}'] });` },
    ],
    note: 'Angular CLI loads postcss.config.js automatically from the project root.',
  },
  {
    id: 'svelte',
    label: 'Svelte',
    install: 'npm i -D @forgedevstack/aerocraft postcss svelte-preprocess',
    entryImport: `import './styles/index.css';`,
    blocks: [
      { title: 'svelte.config.js', language: 'javascript', code: `import sveltePreprocess from 'svelte-preprocess';
import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';

export default {
  preprocess: sveltePreprocess({ postcss: { plugins: [aerocraftPlugin()] } }),
};` },
      { title: 'src/main.ts', language: 'typescript', code: `import App from './App.svelte';
import './styles/index.css';

new App({ target: document.getElementById('app')! });` },
      { title: 'App.svelte', language: 'html', code: `<main class="flex-col-center gap-4 p-8">
  <h1 class="font-bold">AeroCraft + Svelte</h1>
  <p class="text-[#94a3b8]">Style scopes still apply; utilities coexist.</p>
</main>` },
    ],
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    install: 'npm i @forgedevstack/aerocraft postcss',
    entryImport: `import './globals.css';`,
    blocks: [
      { title: 'postcss.config.js', language: 'javascript', code: POSTCSS_CONFIG },
      { title: 'app/globals.css', language: 'css', code: CSS_ENTRY },
      { title: 'app/layout.tsx', language: 'tsx', code: `import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex-col gap-0">{children}</body>
    </html>
  );
}` },
      { title: 'app/page.tsx', language: 'tsx', code: `export default function Page() {
  return (
    <main className="flex-col-center gap-4 p-8">
      <h1 className="font-bold">AeroCraft + Next.js</h1>
    </main>
  );
}` },
    ],
    note: 'Next.js App Router reads postcss.config.js automatically; no extra Webpack config.',
  },
  {
    id: 'nuxt',
    label: 'Nuxt',
    install: 'npm i @forgedevstack/aerocraft postcss',
    entryImport: `css: ['~/assets/index.css']`,
    blocks: [
      { title: 'nuxt.config.ts', language: 'typescript', code: `import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';

export default defineNuxtConfig({
  css: ['~/assets/index.css'],
  postcss: { plugins: { '@forgedevstack/aerocraft/postcss': {} } },
});` },
      { title: 'assets/index.css', language: 'css', code: CSS_ENTRY },
      { title: 'pages/index.vue', language: 'html', code: `<template>
  <main class="flex-col-center gap-4 p-8">
    <h1 class="font-bold">AeroCraft + Nuxt</h1>
  </main>
</template>` },
    ],
  },
  {
    id: 'vanilla',
    label: 'HTML / Vanilla',
    install: 'npm i @forgedevstack/aerocraft',
    entryImport: `<link rel="stylesheet" href="./aerocraft.css" />`,
    blocks: [
      { title: 'Build CSS once', language: 'bash', code: `npx aerocraft build ./aerocraft.css` },
      { title: 'index.html', language: 'html', code: `<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="./aerocraft.css" />
  </head>
  <body>
    <main class="flex-col-center gap-4 p-8">
      <h1 class="font-bold">AeroCraft + Vanilla</h1>
    </main>
  </body>
</html>` },
    ],
    note: 'No bundler required — use the CLI to emit CSS, drop into any static host.',
  },
];
