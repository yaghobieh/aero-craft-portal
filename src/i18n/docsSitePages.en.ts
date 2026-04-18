import type { DocsSitePage } from './types';

const CODE_VITE_STEPS = `npm create vite@latest my-project
cd my-project
npm install
npm install @forgedevstack/aerocraft postcss`;

const CODE_VITE_CONFIG = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
});`;

const CODE_POSTCSS = `import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';
import config from './aerocraft.config';

export default {
  plugins: [aerocraftPlugin(config)],
};`;

const CODE_AERO_CONFIG = `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  prefix: '',
  separator: '-',
  mode: 'standalone',
  groups: 'all',
  responsive: true,
});`;

const CODE_CSS_ENTRY = `@aerocraft;

*, *::before, *::after { box-sizing: border-box; }`;

const CODE_IMPORT_PKG = `import '@forgedevstack/aerocraft/styles.css';`;

const CODE_IMPORT_AT = `@import "@forgedevstack/aerocraft/styles.css";`;

const CODE_POSTCSS_ALT = `import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';

export default {
  plugins: [aerocraftPlugin()],
};`;

const CODE_CLI = `npx aerocraft build ./dist/aerocraft.css

npx aerocraft init`;

export const DOCS_SITE_PAGES_EN: Record<string, DocsSitePage> = {
  'getting-started': {
    title: 'Getting started',
    lead: 'Install AeroCraft, import CSS, configure PostCSS, and optionally run the CLI. Open a page below for step-by-step instructions.',
    sections: [
      {
        title: 'Overview',
        body: 'The fastest path is Vite plus the PostCSS plugin so @aerocraft expands in your CSS entry. You can also import the pre-built stylesheet for prototypes.',
      },
    ],
    shortcuts: [
      { example: 'npm i @forgedevstack/aerocraft', note: 'Add the package' },
      { example: '@aerocraft', note: 'Directive in CSS' },
    ],
  },
  'core-concepts': {
    title: 'Core concepts',
    lead: 'How AeroCraft fits with themes, breakpoints, arbitrary values, and interaction states.',
    sections: [
      {
        title: 'Topics',
        body: 'Use the sidebar entries for dark mode, responsive classes, color tokens, custom styling, functions inside values, and hover or focus behavior.',
      },
    ],
    shortcuts: [
      { example: 'md:p-[24px]', note: 'Responsive + arbitrary' },
    ],
  },
  'getting-started/installation-vite': {
    title: 'Installation with Vite',
    lead: 'Create a Vite app, install AeroCraft, wire PostCSS, then add @aerocraft to your CSS entry.',
    sections: [
      {
        title: '1. Scaffold the project',
        body: 'Use the official Vite starter for your framework. Install dependencies before adding AeroCraft.',
      },
      {
        title: '2. Install AeroCraft',
        body: 'Install the library and PostCSS. PostCSS is required when you use the plugin pipeline instead of the pre-built stylesheet.',
      },
      {
        title: '3. Point Vite at PostCSS',
        body: 'Vite loads postcss.config.js automatically when it exists. Optionally set css.postcss explicitly.',
      },
      {
        title: '4. Config files',
        body: 'Add aerocraft.config.ts for shortcuts and postcss.config.js that registers aerocraftPlugin with that config.',
      },
    ],
    codeBlocks: [
      { title: 'Terminal', code: CODE_VITE_STEPS, language: 'bash' },
      { title: 'vite.config.ts', code: CODE_VITE_CONFIG, language: 'typescript' },
      { title: 'aerocraft.config.ts', code: CODE_AERO_CONFIG, language: 'typescript' },
      { title: 'postcss.config.js', code: CODE_POSTCSS, language: 'typescript' },
      { title: 'src/index.css', code: CODE_CSS_ENTRY, language: 'css' },
    ],
    shortcuts: [
      { example: 'flex-col-center', note: 'Layout after install' },
      { example: 'p-[18px]', note: 'Arbitrary padding' },
      { example: 'md:flex-row', note: 'Responsive flex direction' },
    ],
  },
  'getting-started/import-css': {
    title: 'Import AeroCraft CSS',
    lead: 'You can skip the PostCSS plugin and ship the pre-built stylesheet, or emit CSS with the CLI.',
    sections: [
      {
        title: 'ESM import',
        body: 'Import the published stylesheet from JavaScript or TypeScript so your bundler resolves the package path.',
      },
      {
        title: 'CSS @import',
        body: 'Inside a CSS file, import the package stylesheet by path. Your bundler must resolve node_modules.',
      },
    ],
    codeBlocks: [
      { title: 'main.tsx', code: CODE_IMPORT_PKG, language: 'typescript' },
      { title: 'app.css', code: CODE_IMPORT_AT, language: 'css' },
    ],
    shortcuts: [
      { example: 'gap-[12px]', note: 'Works with pre-built CSS + scan' },
      { example: 'w-[min(100%,480px)]', note: 'Arbitrary width' },
    ],
  },
  'getting-started/postcss': {
    title: 'PostCSS setup',
    lead: 'Register aerocraftPlugin from @forgedevstack/aerocraft/postcss. The plugin expands @aerocraft and can scan content for arbitrary classes.',
    sections: [
      {
        title: 'Minimal config',
        body: 'Import aerocraftPlugin and pass your resolved AeroCraft config. Use an array for plugins in PostCSS 8.',
      },
      {
        title: 'Name in postcss.config',
        body: 'Some setups use object-form plugins. Prefer importing aerocraftPlugin directly so options are typed.',
      },
    ],
    codeBlocks: [
      { title: 'postcss.config.js', code: CODE_POSTCSS, language: 'typescript' },
      { title: 'Alternative (plugin only)', code: CODE_POSTCSS_ALT, language: 'typescript' },
    ],
    shortcuts: [
      { example: 'h-[15px]', note: 'Bracket arbitrary value' },
      { example: 'gap-{{8px}}', note: 'Curly arbitrary value' },
    ],
  },
  'getting-started/cli': {
    title: 'AeroCraft CLI',
    lead: 'The aerocraft binary can emit CSS for CI pipelines and static sites.',
    sections: [
      {
        title: 'Commands',
        body: 'Build writes a CSS file from your config. Init can scaffold config files in a new or existing project.',
      },
    ],
    codeBlocks: [{ code: CODE_CLI, language: 'bash' }],
    shortcuts: [
      { example: 'npx aerocraft build ./out.css', note: 'Emit once in CI' },
    ],
  },
  'getting-started/cursor-plugin': {
    title: 'Cursor plugin',
    lead: 'A dedicated Cursor / VS Code extension for AeroCraft is planned as a separate repository. It will ship snippets, class search, and config hints.',
    sections: [
      {
        title: 'Status',
        body: 'Track the ForgeStack roadmap for the editor plugin. Until it ships, use the docs search in this portal and your CSS language service.',
      },
    ],
    shortcuts: [
      { example: '⌘K', note: 'Search in this portal' },
    ],
  },
  'getting-started/upgrade-guide': {
    title: 'Upgrade guide',
    lead: 'Patch releases keep config compatible. Check the changelog when jumping minor versions.',
    sections: [
      {
        title: 'npm',
        body: 'Bump @forgedevstack/aerocraft and run your build. Regenerate CSS if you commit emitted output.',
      },
      {
        title: 'Arbitrary syntax',
        body: 'Bracket classes like h-[12px] and curly ac-{{12px}} are both scanned. Prefer one style per codebase for consistency.',
      },
    ],
    shortcuts: [
      { example: 'npm i @forgedevstack/aerocraft@latest', note: 'Upgrade package' },
    ],
  },
  'core-concepts/dark-mode': {
    title: 'Dark mode',
    lead: 'AeroCraft utilities are theme-agnostic. Toggle a class or data attribute on the root and pair with your color tokens.',
    sections: [
      {
        title: 'Authoring',
        body: 'Use .dark or [data-theme=dark] selectors in your own CSS for brand colors. Utilities handle layout and spacing.',
      },
    ],
    shortcuts: [
      { example: 'dark:text-[#e2e8f0]', note: 'Optional responsive dark variant when enabled' },
    ],
  },
  'core-concepts/responsive': {
    title: 'Responsive',
    lead: 'Enable responsive: true in config to emit breakpoint prefixes such as sm: and md: that match your breakpoints map.',
    sections: [
      {
        title: 'Breakpoints',
        body: 'Defaults follow common min-width values. Override in aerocraft.config.ts to match your design grid.',
      },
    ],
    shortcuts: [
      { example: 'lg:grid-cols-3', note: 'Breakpoint-prefixed class' },
    ],
  },
  'core-concepts/colors': {
    title: 'Colors',
    lead: 'Use arbitrary text and background values for one-off brand colors. Keep scales in CSS variables when you reuse them.',
    sections: [
      {
        title: 'Tokens',
        body: 'Define --brand and --surface in :root, then reference them in custom CSS alongside AeroCraft layout classes.',
      },
    ],
    shortcuts: [
      { example: 'text-[#007FFF]', note: 'Arbitrary color' },
      { example: 'bg-[rgb(15_23_42)]', note: 'Modern color syntax' },
    ],
  },
  'core-concepts/custom-styling': {
    title: 'Custom styling',
    lead: 'Use customShortcuts in config for repeated patterns, or arbitrary bracket values for one-off declarations.',
    sections: [
      {
        title: 'Layers',
        body: 'Place AeroCraft in a @layer block so your components can override intentionally.',
      },
    ],
    shortcuts: [
      { example: 'rounded-[1.25rem]', note: 'Arbitrary radius' },
    ],
  },
  'core-concepts/brand-palette': {
    title: 'Brand palette',
    lead: 'A brand palette is the set of primary, secondary, and accent colors that define your product. AeroCraft is color-agnostic, so bring your own palette via CSS variables and reference it in arbitrary classes.',
    sections: [
      {
        title: 'What it is',
        body: 'Your brand palette usually has a primary color (actions, links), a secondary color (accents), text/muted shades, and semantic states (success/warning/danger). AeroCraft never prescribes one.',
      },
      {
        title: 'Define in CSS variables',
        body: 'Declare variables at :root (and .dark) and reference them with arbitrary values like bg-[var(--brand)]. Use utility classes for layout; keep color in variables so you can re-skin without touching markup.',
      },
      {
        title: 'Per-product scales',
        body: 'For larger apps, generate a 10-step scale (50…950) per brand color, matching Bear/Tailwind style. Keep the scale in one file and expose via CSS variables.',
      },
    ],
    codeBlocks: [
      {
        title: ':root tokens',
        language: 'css',
        code: `:root {
  --brand: #2563eb;
  --brand-2: #22d3ee;
  --surface: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
}
.dark {
  --surface: #0b1020;
  --text: #e5e7eb;
  --muted: #94a3b8;
}`,
      },
      {
        title: 'Usage',
        language: 'html',
        code: `<button class="p-3 cursor-pointer" style="background:var(--brand);color:#fff">Buy</button>
<p class="text-[var(--muted)]">Secondary copy</p>`,
      },
    ],
    shortcuts: [
      { example: 'bg-[var(--brand)]', note: 'Reference a token' },
      { example: 'text-[color:oklch(62%_0.18_265)]', note: 'Modern color' },
    ],
  },
  'core-concepts/fonts': {
    title: 'Using Google Fonts (or any font)',
    lead: 'AeroCraft does not embed fonts. Load them with <link>, @import, or font-face, then point font-family at your stack through the font utility or CSS.',
    sections: [
      {
        title: 'Via <link> in index.html',
        body: 'Preferred for SSR and landing pages — fonts are fetched in parallel with CSS.',
      },
      {
        title: 'Via @import in CSS',
        body: 'Simple and portable; works when you cannot edit index.html. Place at top of the file.',
      },
      {
        title: 'Self-host with @font-face',
        body: 'Best for performance and privacy. Ship .woff2 in public/, then point @font-face at the URL.',
      },
      {
        title: 'Apply with AeroCraft',
        body: 'Use font-[] arbitrary classes for family or weight, or set body { font-family } once in your global CSS.',
      },
    ],
    codeBlocks: [
      {
        title: 'index.html',
        language: 'html',
        code: `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">`,
      },
      {
        title: 'styles.css',
        language: 'css',
        code: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body { font-family: Inter, ui-sans-serif, system-ui, sans-serif; }`,
      },
      {
        title: 'Self-host',
        language: 'css',
        code: `@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}`,
      },
    ],
    shortcuts: [
      { example: 'font-[Inter,ui-sans-serif]', note: 'Arbitrary font-family' },
      { example: 'font-[600,Inter]', note: 'Weight + family shorthand' },
    ],
  },
  'core-concepts/apply': {
    title: 'Using @apply with AeroCraft classes',
    lead: 'Compose your own component classes by pulling AeroCraft shortcuts into plain CSS with PostCSS @apply. AeroCraft emits real CSS classes, so any @apply-compatible pipeline works.',
    sections: [
      {
        title: 'When to @apply',
        body: 'Use it for reused patterns (buttons, cards, chips) to keep markup readable. For one-offs, utilities inline in HTML are simpler.',
      },
      {
        title: 'Setup',
        body: 'Install postcss-apply (or tailwindcss @apply if you use it) alongside @forgedevstack/aerocraft/postcss. @aerocraft must be expanded first so shortcut classes exist before @apply resolves.',
      },
      {
        title: 'Name your components',
        body: 'Keep AeroCraft class names as-is in @apply directives. Override per-state with &:hover in nested selectors.',
      },
    ],
    codeBlocks: [
      {
        title: 'postcss.config.js',
        language: 'typescript',
        code: `import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';
import apply from 'postcss-apply';
import config from './aerocraft.config';

export default { plugins: [aerocraftPlugin(config), apply] };`,
      },
      {
        title: 'components.css',
        language: 'css',
        code: `@aerocraft;

.btn { @apply flex-row items-center justify-center p-3 cursor-pointer; }
.card { @apply p-6 flex-col gap-3; border: 1px solid var(--line); border-radius: 12px; }`,
      },
    ],
    shortcuts: [
      { example: '@apply flex-row items-center', note: 'Compose utilities' },
      { example: '@apply md:grid-cols-3 gap-4', note: 'Responsive in @apply' },
    ],
  },
  'core-concepts/override-ui': {
    title: 'Override MUI / Bear / any UI kit',
    lead: 'AeroCraft shortcuts emit plain class selectors and therefore participate in the normal cascade. Pair with @layer so you can intentionally override third-party UI kits (MUI, Bear, Radix, etc.) without fighting specificity.',
    sections: [
      {
        title: 'Cascade layers',
        body: 'Define ordered layers so AeroCraft wins over library base styles but loses to explicit component overrides. Put library CSS first, AeroCraft utilities next, your own components last.',
      },
      {
        title: 'Override MUI',
        body: 'MUI injects emotion classes. Because your global stylesheet loads after MUI, AeroCraft utilities applied via className win. If MUI uses !important, add .\\!important variants in your own layer or style.',
      },
      {
        title: 'Override Bear',
        body: 'Bear accepts style and className on every component. Pass AeroCraft classes to className for layout/spacing, keep colors on Bear theme tokens.',
      },
    ],
    codeBlocks: [
      {
        title: 'styles.css (layer order)',
        language: 'css',
        code: `@layer mui, aerocraft, app;

@layer aerocraft { @aerocraft; }
@layer app {
  .card-override { @apply p-6 gap-4; background: var(--surface-elevated); }
}`,
      },
      {
        title: 'MUI usage',
        language: 'tsx',
        code: `import Button from '@mui/material/Button';

<Button variant="contained" className="p-3 flex-row items-center gap-2">
  Submit
</Button>`,
      },
      {
        title: 'Bear usage',
        language: 'tsx',
        code: `import { Button } from '@forgedevstack/bear';

<Button variant="primary" className="w-full justify-center">
  Continue
</Button>`,
      },
    ],
    shortcuts: [
      { example: '@layer aerocraft', note: 'Scope utilities' },
      { example: 'className="p-3 flex-row"', note: 'Override layout on MUI/Bear' },
    ],
  },
  'core-concepts/bundle-size': {
    title: 'Bundle size: AeroCraft vs hand-written CSS',
    lead: 'AeroCraft ships one small runtime-free stylesheet. Two identical pages can be much smaller with utilities than hand-written CSS thanks to deduplication and content-aware emission.',
    sections: [
      {
        title: 'Why it is smaller',
        body: 'Every utility is defined once; every place you use it shares the same class. Writing custom CSS per component duplicates padding/flex rules across files. More components = bigger CSS.',
      },
      {
        title: 'Content scan in PostCSS',
        body: 'Set content: ["src/**/*.{ts,tsx,html}"] in aerocraft.config.ts. Only shortcuts you actually use (including arbitrary) end up in the CSS. Adding a one-off p-[9px] costs one tiny rule.',
      },
      {
        title: 'Standalone ~30 kB gzipped',
        body: 'The pre-built stylesheet is roughly 30–35 kB gzipped for the full shortcut set. With scan on, most real apps ship 8–15 kB.',
      },
    ],
    codeBlocks: [
      {
        title: 'aerocraft.config.ts',
        language: 'typescript',
        code: `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  content: ['src/**/*.{ts,tsx,html,vue,svelte}'],
  groups: 'all',
  responsive: true,
});`,
      },
    ],
    shortcuts: [
      { example: 'content: [...]', note: 'Scan opts into tree-shaking' },
      { example: 'groups: \\{ text: false \\}', note: 'Drop unused groups' },
    ],
  },
  'core-concepts/advantages': {
    title: 'What AeroCraft does better',
    lead: 'What makes AeroCraft different compared to other utility-class systems. No names, just facts.',
    sections: [
      {
        title: 'Composable shortcuts with semantic names',
        body: 'flex-col-center > items-center + justify-center + display:flex + flex-direction:column. You write intent once, not four classes.',
      },
      {
        title: 'First-class arbitrary with two syntaxes',
        body: 'Bracket h-[15px] and curly h-{{15px}} both work, so template languages (Vue, Angular) that reserve special chars do not break.',
      },
      {
        title: 'PostCSS @aerocraft presets',
        body: 'Inject just what a page needs: @aerocraft base, @aerocraft fonts, @aerocraft layout, @aerocraft motion — no custom config file round-trip.',
      },
      {
        title: 'Framework-agnostic by design',
        body: 'One CSS output works in React, Vue, Angular, Svelte, Next, Nuxt, and plain HTML. No framework shims.',
      },
      {
        title: 'Typed config + CLI + React hook',
        body: 'defineConfig is fully typed. An aerocraft CLI emits CSS for CI. useAero() lets you mutate classes by selector at runtime in React.',
      },
      {
        title: 'Small, boring, predictable',
        body: 'Zero runtime. Plain CSS classes. No proprietary syntax to learn. Your dev tools still show the rules that apply.',
      },
    ],
    shortcuts: [
      { example: 'flex-col-center', note: 'Semantic shortcut' },
      { example: 'useAero({ "#root": "p-4 flex-col" })', note: 'Runtime class control' },
    ],
  },
  'getting-started/frameworks': {
    title: 'Install per framework',
    lead: 'AeroCraft is framework-agnostic. Pick your stack below for the minimum integration.',
    sections: [
      {
        title: 'Pattern',
        body: 'Install @forgedevstack/aerocraft, add @forgedevstack/aerocraft/postcss to your PostCSS config, then @aerocraft in your CSS entry. The rest is per-framework plumbing.',
      },
    ],
    shortcuts: [
      { example: 'npm i @forgedevstack/aerocraft', note: 'Universal install' },
    ],
  },
  'core-concepts/functions': {
    title: 'Functions',
    lead: 'CSS functions like min(), max(), and clamp() work inside arbitrary values when you quote them for the scanner.',
    sections: [
      {
        title: 'Examples',
        body: 'Use w-[min(100%,1200px)] for fluid widths. Keep spaces consistent with your separator settings.',
      },
    ],
    shortcuts: [
      { example: 'w-[min(100%,64rem)]', note: 'clamp fluid width' },
    ],
  },
  'core-concepts/states': {
    title: 'Hover, focus, active',
    lead: 'Pseudo-class variants are emitted when enabled in config. Pair utilities with accessible focus styles in your base CSS.',
    sections: [
      {
        title: 'Interaction',
        body: 'Use transition utilities from the Transition group, then add :hover rules in your stylesheet for motion.',
      },
    ],
    shortcuts: [
      { example: 'hover:opacity-80', note: 'When hover variant is enabled' },
    ],
  },
};
