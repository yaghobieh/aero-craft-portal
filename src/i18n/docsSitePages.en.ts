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

const CODE_AEROCRAFT_DIRECTIVES = `/* Full bundle (same as bare @aerocraft) */
@aerocraft;

/* Focused layers (smaller CSS when you split entry files) */
@aerocraft base;
@aerocraft fonts;
@aerocraft layout;
@aerocraft motion;
@aerocraft all;`;

const CODE_THEME_COLORS = `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  theme: {
    colors: {
      myred: '#ef4444',
      brand: { DEFAULT: '#2563eb', 500: '#3b82f6' },
    },
  },
});`;

const CODE_FORGESTACK_PORTAL_THEME = `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  theme: {
    colors: {
      brand: { DEFAULT: '#2563eb', 500: '#3b82f6', 600: '#1d4ed8' },
      secondary: '#a324dd',
      accent: '#ff8a3c',
      surface: '#140c1c',
      'surface-muted': '#22112d',
    },
  },
});`;

const CODE_DARK_ROOT = `:root {
  --surface: #ffffff;
  --text: #0f172a;
}

.dark {
  --surface: #0f0716;
  --text: #f7ecf4;
}

.panel {
  background: var(--surface);
  color: var(--text);
}`;

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
      { title: 'src/aerocraft.css', code: CODE_CSS_ENTRY, language: 'css' },
    ],
    shortcuts: [
      { example: 'flex-col-center', note: 'Layout after install' },
      { example: 'p-[18px]', note: 'Arbitrary padding' },
      { example: 'md:flex-row', note: 'Responsive flex direction' },
    ],
  },
  'getting-started/import-css': {
    title: 'Import AeroCraft CSS',
    lead: 'Use the PostCSS plugin so @aerocraft expands in your entry CSS, import the pre-built bundle for prototypes, or emit a file with the CLI. Split layers with named directives when you want smaller chunks.',
    sections: [
      {
        title: '@aerocraft layers',
        body: 'In your main stylesheet, the bare directive pulls the full shortcut bundle. Pass a layer name to emit only that slice: base (display, flex, spacing, gap, size), fonts (typography), layout (flex, grid, position, display, gap), motion (transitions, cursor, interactive), or all (same as bare).',
      },
      {
        title: 'Pre-built package CSS',
        body: 'Import @forgedevstack/aerocraft/styles.css from JS or via @import when you are not running the PostCSS plugin. Pair with content scanning in config if you rely on arbitrary bracket classes.',
      },
      {
        title: 'Where the real CSS lives',
        body: 'Generated rules are written wherever @aerocraft expands (or prepended when injectWithoutDirective is true). The npm styles.css file is the precompiled full bundle. Your design tokens from aerocraft.config theme merge into that output as extra utility classes.',
      },
    ],
    codeBlocks: [
      { title: 'src/aerocraft.css (layers)', code: CODE_AEROCRAFT_DIRECTIVES, language: 'css' },
      { title: 'main.tsx', code: CODE_IMPORT_PKG, language: 'typescript' },
      { title: 'app.css', code: CODE_IMPORT_AT, language: 'css' },
    ],
    shortcuts: [
      { example: '@aerocraft base', note: 'Layout + spacing slice' },
      { example: 'gap-[12px]', note: 'Arbitrary value utilities' },
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
    title: 'Editor extension (VS Code & Cursor)',
    lead: 'The aero-craft-plugin workspace ships a VS Code–compatible extension: class completions, Bear component hints, and an optional compatibility mode that surfaces both AeroCraft shortcuts and familiar utility names.',
    sections: [
      {
        title: 'Repository',
        body: 'Open the aero-craft-plugin folder, run npm install && npm run compile, then launch the Extension Development Host from VS Code. Publish the .vsix to your team registry or sideload locally.',
      },
      {
        title: 'Settings',
        body: 'aerocraft.enableCompletions toggles markup completions. aerocraft.utilityAliasMode mirrors common utility naming when you are migrating an existing class list. bear.enableComponentSnippets adds Bear imports and props stubs in TSX.',
      },
    ],
    shortcuts: [
      { example: '⌘K', note: 'Search in this portal' },
    ],
  },
  'getting-started/upgrade-guide': {
    title: 'Upgrade guide',
    lead: 'Patch releases keep config compatible. Review the CHANGELOG on GitHub before minor bumps.',
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
    lead: 'AeroCraft does not emit Tailwind-style `dark:` or `light:` prefixes on its own utilities. Responsive variants use breakpoint keys (for example `md:`). For theme switching, drive **CSS variables** or **parent selectors**; layout shortcuts stay the same. When you also use **Tailwind** (or another engine) with a class-based dark mode strategy, `dark:` applies to *those* classes on the same element — pair them with variable-backed AeroCraft color utilities.',
    sections: [
      {
        title: 'What is not a AeroCraft prefix',
        body: 'Strings such as `dark:flex-row` or `light:bg-white` are **not** generated by the AeroCraft PostCSS plugin. If you need that shape, add Tailwind (or your stack’s variant layer), or write plain CSS with `.dark .card { ... }` / `@media (prefers-color-scheme: light)`.',
      },
      {
        title: 'System preference',
        body: 'Use @media (prefers-color-scheme: dark) in your base layer to flip CSS variables. AeroCraft classes keep working for layout; point color utilities at `var(--...)` so one class works in both schemes.',
      },
      {
        title: 'Manual toggle (class on html)',
        body: 'Bear’s BearProvider adds `dark` and `bear-dark` on the document root when the user picks dark mode. Redefine `--bear-bg-*`, `--bear-text-*`, or your own `--surface` / `--ink` under `.dark` so a single `background-[var(--surface)]` (or your theme’s color utilities) tracks the mode.',
      },
      {
        title: 'Tailwind `dark:` next to AeroCraft (hybrid)',
        body: 'In a Vite + Tailwind setup you might write `<div class="dark:bg-slate-900 p-4 flex-col">` where `dark:` comes from Tailwind and `p-4` / `flex-col` from AeroCraft. Ensure Tailwind is configured with `darkMode: \'class\'` so it reacts to the same `dark` class Bear puts on `html`.',
      },
      {
        title: 'Does `light:` exist?',
        body: 'Tailwind v3 does not ship a `light:` variant by default. Prefer `@media (prefers-color-scheme: light)` for automatic light styling, or scope defaults to `:root` and override under `.dark`.',
      },
      {
        title: 'With Bear (this site)',
        body: 'The portal uses BearProvider: toggling light/dark updates CSS variables. AeroCraft marketing markup often uses `text-[var(--bear-text-primary)]` so the live preview follows the active Bear theme without duplicate class strings.',
      },
    ],
    codeBlocks: [
      { title: 'Token swap (CSS variables)', code: CODE_DARK_ROOT, language: 'css' },
      {
        title: 'Hybrid HTML (illustrative)',
        language: 'html',
        code: `<!-- Tailwind dark: on the same node as AeroCraft layout utilities -->
<div class="dark:bg-slate-900 p-6 rounded-lg flex-col gap-3 text-[var(--bear-text-primary)]">
  <span class="text-sm">Surface follows Bear tokens; dark:bg-* from Tailwind if installed.</span>
</div>`,
      },
    ],
    shortcuts: [
      { example: 'background-[var(--surface)]', note: 'One utility, variable tracks theme' },
      { example: 'md:flex-row', note: 'AeroCraft responsive prefix (not dark:)' },
    ],
  },
  'core-concepts/theme': {
    title: 'Theme tokens',
    lead: 'The theme block in aerocraft.config is where you declare colors, font stacks, spacing keys, radii, shadows, and screen breakpoints. AeroCraft turns each token into real utility classes—no hand-written maps of bg-* and text-*.',
    sections: [
      {
        title: 'Colors',
        body: 'A string color emits bg-name, text-name, and border-name. An object with DEFAULT and numeric keys emits bg-name, bg-name-500, text-name-500, and the same for borders.',
      },
      {
        title: 'Fonts, spacing, radii, shadows',
        body: 'fontFamily keys become font-* utilities. spacing keys expand to padding, margin, and gap utilities. borderRadius becomes rounded-*; boxShadow becomes shadow-*.',
      },
      {
        title: 'extend',
        body: 'Use theme.extend to add tokens without replacing the built-in shortcut catalog. Values merge with your base theme object.',
      },
    ],
    codeBlocks: [{ title: 'aerocraft.config', code: CODE_THEME_COLORS, language: 'typescript' }],
    shortcuts: [
      { example: 'color-myred', note: 'From theme.colors.myred string' },
      { example: 'background-brand-500', note: 'From theme.colors.brand object' },
    ],
  },
  'core-concepts/component-recipes': {
    title: 'Component presets (minimum classes)',
    lead:
      'Use componentRecipes in aerocraft.config to emit small, reusable class shells—rounded icon buttons, full-width inputs, and anything else you want as a single class name. Defaults ship for circle-button and input-rounded; you override by using the same key and merging declarations.',
    sections: [
      {
        title: 'Built-in presets',
        body: 'circle-button is a fixed-size circular control shell (inline-flex, centered, pill radius). input-rounded is a full-width field shell with padding, radius, and border. Both are plain CSS: use them on button, a, input, or wrappers.',
      },
      {
        title: 'Override and extend',
        body: 'Pass componentRecipes with the same name as a default to shallow-merge: only the properties you set replace the built-in map. Add a new key (for example promo-card) to define a brand-new class with a full declaration block.',
      },
      {
        title: 'Prefix and class names',
        body: 'Generated selectors respect prefix and separator like every other AeroCraft utility. With prefix ac and separator -, circle-button becomes .ac-circle-button.',
      },
    ],
    codeBlocks: [
      {
        title: 'aerocraft.config.ts',
        language: 'typescript',
        code: `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  prefix: '',
  separator: '-',
  componentRecipes: {
    'circle-button': {
      width: '3rem',
      height: '3rem',
    },
    'input-rounded': {
      'border-color': '#94a3b8',
    },
  },
});`,
      },
      {
        title: 'Markup',
        language: 'html',
        code: `<button type="button" class="circle-button" aria-label="Open menu">☰</button>
<input class="input-rounded" type="email" name="email" placeholder="you@example.com" />`,
      },
    ],
    shortcuts: [
      { example: 'circle-button', note: 'Preset class from config' },
      { example: 'input-rounded', note: 'Preset field shell' },
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
    lead: 'Theme colors emit AeroCraft utilities: color-* (foreground), background-* (fill), border-color-* (stroke). The package ships a default palette (pink, red, yellow, blue, white, black) merged into theme.colors; override keys in your config. Use bracket forms such as color-[#fff] or background-[rgba(0,0,0,0.5)] for one-off values.',
    sections: [
      {
        title: 'theme.colors',
        body: 'Each key becomes background-<name>, color-<name>, and border-color-<name>. A string value maps to the DEFAULT shade; an object with numeric keys (25, 50, …, 950) maps to color-<name>-500 style utilities. Hyphenated keys such as surface-muted become background-surface-muted.',
      },
      {
        title: 'Why a color class might do nothing',
        body: 'If you removed that key from theme.colors and it is not in the default palette, no rule is generated. Use an arbitrary value such as color-[#ef4444] or add the token back under theme.colors.',
      },
      {
        title: 'Bracket literals',
        body: 'color-[#ffffff], background-[#0f0716], color-[var(--x)], and background-[rgba(0,0,0,0.4)] compile when the class appears in processed sources. Underscores inside brackets become spaces.',
      },
      {
        title: 'Bear and AeroCraft together',
        body: 'BearProvider still drives component tokens; duplicate brand-critical names in aerocraft.config so static HTML and React both share the same utility names.',
      },
    ],
    codeBlocks: [
      { title: 'ForgeStack portal (excerpt)', code: CODE_FORGESTACK_PORTAL_THEME, language: 'typescript' },
    ],
    shortcuts: [
      { example: 'color-red-600', note: 'Default palette or theme.colors.red' },
      { example: 'background-pink-400', note: 'Default palette or theme.colors.pink' },
      { example: 'color-[#ffffff]', note: 'Arbitrary foreground color' },
      { example: 'background-brand-500', note: 'From theme.colors.brand steps' },
    ],
  },
  'core-concepts/custom-styling': {
    title: 'Custom styling',
    lead: 'Combine @layer base/components/utilities with AeroCraft output, arbitrary bracket utilities, and customShortcuts for patterns the generator does not know yet.',
    sections: [
      {
        title: 'Layers',
        body: 'Import or emit AeroCraft inside @layer utilities { @aerocraft; } so your component CSS in @layer components can win when specificity matches. Base rules belong in @layer base alongside optional resets.',
      },
      {
        title: 'Resets and normalize',
        body: 'AeroCraft is not a browser reset. If you need consistent baselines, add modern-normalize or a ten-line box-sizing + line-height preset in @layer base. Many apps already get this from their UI kit (Bear includes sensible defaults via its CSS).',
      },
      {
        title: 'Escaping constraints',
        body: 'Use arbitrary values such as top-[117px], bg-[url(...)], or multi-property escapes when a token does not exist yet, then promote repeated values into theme or customShortcuts.',
      },
    ],
    codeBlocks: [
      {
        title: 'Layered entry',
        language: 'css',
        code: `@layer base {
  :root { color-scheme: dark light; }
}
@layer utilities {
  @aerocraft;
}`,
      },
    ],
    shortcuts: [
      { example: 'rounded-[1.25rem]', note: 'Arbitrary radius' },
      { example: 'customShortcuts', note: 'Advanced patterns in config' },
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
        body: 'For larger apps, maintain a step scale (for example 50 through 950) per brand color—same shape Bear expects—and expose shared steps via CSS variables where helpful.',
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
        code: `<button class="p-3 cursor-pointer bg-[var(--brand)] text-[#fff]">Buy</button>
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
        body: 'Install postcss-apply (or another @apply-capable PostCSS plugin) alongside @forgedevstack/aerocraft/postcss. @aerocraft must be expanded first so shortcut classes exist before @apply resolves.',
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
  'core-concepts/use-with-mui': {
    title: 'Use AeroCraft with MUI (Material UI)',
    lead: 'AeroCraft composes perfectly with MUI: keep MUI for accessibility, theming, and complex components (DatePicker, DataGrid), use AeroCraft utilities for every layout, spacing, and one-off responsive tweak. Share CSS variables between MUI and AeroCraft so one token update recolors both.',
    sections: [
      {
        title: '1. Install side-by-side',
        body: 'MUI and AeroCraft are independent. Install both, import MUI’s CssBaseline once, then import AeroCraft from your global stylesheet. AeroCraft adds ~30 kB gzipped for the full set (less when content scanning is on).',
      },
      {
        title: '2. Share a single source of truth (CSS variables)',
        body: 'Declare brand tokens as CSS variables on :root. Reference them from MUI’s theme and from AeroCraft customShortcuts. Changing a variable recolors both MUI components and utility classes at once — no rebuild needed.',
      },
      {
        title: '3. Layer order wins every cascade fight',
        body: 'Declare @layer mui, aerocraft, app in your global CSS. MUI base styles land in the first layer, AeroCraft utilities in the second, your component overrides in the third. This follows the familiar base / components / utilities ordering.',
      },
      {
        title: '4. Apply AeroCraft to MUI components via className',
        body: 'Every MUI component accepts className. Use it for layout (flex-row-center, gap-3), spacing (p-4, mx-auto), sizing (w-full, max-w-screen-md), and responsive (md:flex-row). Reserve MUI’s sx prop for component-specific tokens.',
      },
      {
        title: '5. When MUI uses !important',
        body: 'MUI occasionally emits rules with higher specificity. Either bump AeroCraft into a later @layer or, for one-offs, use the `!important` variant: className="!p-4".',
      },
    ],
    codeBlocks: [
      {
        title: 'theme-tokens.css (shared with MUI + AeroCraft)',
        language: 'css',
        code: `:root {
  --brand-500: #3b82f6;
  --brand-600: #2563eb;
  --surface: #170b20;
  --on-surface: #f7ecf4;

  --bear-primary-500: var(--brand-500);
  --bear-primary-600: var(--brand-600);
}

@layer mui, aerocraft, app;
@layer aerocraft { @aerocraft; }`,
      },
      {
        title: 'theme.ts (MUI)',
        language: 'typescript',
        code: `import { createTheme } from '@mui/material/styles';

const rootStyles = getComputedStyle(document.documentElement);
const read = (name: string) => rootStyles.getPropertyValue(name).trim();

export const theme = createTheme({
  palette: {
    primary: { main: read('--brand-500'), dark: read('--brand-600') },
    background: { default: read('--surface') },
    text: { primary: read('--on-surface') },
  },
});`,
      },
      {
        title: 'aerocraft.config.ts (custom utilities bound to tokens)',
        language: 'typescript',
        code: `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  mode: 'standalone',
  customShortcuts: {
    'background-brand': { css: { 'background-color': 'var(--brand-500)' }, group: 'background' },
    'color-brand': { css: { color: 'var(--brand-500)' }, group: 'color' },
    'background-surface': { css: { 'background-color': 'var(--surface)' }, group: 'background' },
  },
});`,
      },
      {
        title: 'Checkout.tsx (MUI + AeroCraft)',
        language: 'tsx',
        code: `import { Button, TextField, Paper } from '@mui/material';

export function Checkout() {
  return (
    <Paper className="flex-col gap-4 p-6 max-w-md mx-auto rounded-xl">
      <h2 className="text-xl font-bold">Checkout</h2>
      <TextField label="Email" fullWidth className="w-full" />
      <TextField label="Card" fullWidth className="w-full" />
      <div className="flex-row items-center justify-between gap-3">
        <span className="text-sm color-brand">Total: $29</span>
        <Button variant="contained" color="primary" className="!px-5 !py-3 !rounded-md">
          Pay now
        </Button>
      </div>
    </Paper>
  );
}`,
      },
    ],
    shortcuts: [
      { example: 'className="flex-row-center gap-3"', note: 'Layout on any MUI component' },
      { example: 'className="!p-4"', note: 'Beat MUI !important rules' },
      { example: 'var(--brand-500)', note: 'Shared token for MUI + utilities' },
      { example: '@layer mui, aerocraft, app', note: 'Cascade order' },
    ],
  },
  'core-concepts/use-with-bear': {
    title: 'Use AeroCraft with Bear',
    lead: 'Bear is the design system that ships this portal. AeroCraft is the utility layer underneath. Together: Bear handles component semantics (Button variants, Typography scale, accessible Modal), AeroCraft handles every layout, spacing, and one-off tweak. Same token source, same theme.',
    sections: [
      {
        title: '1. Tokens: Bear owns colors, AeroCraft reads them',
        body: 'Bear exposes CSS variables like --bear-primary-600, --bear-bg-secondary, --bear-border-default. In aerocraft.config.ts, declare customShortcuts that reference these variables. You never hardcode hex values in your utilities.',
      },
      {
        title: '2. Use Bear for the component, AeroCraft for layout',
        body: 'Every Bear component accepts className. Use it for layout utilities (flex-col, gap-3, size-10). Keep the semantic variants on the Bear prop (variant="primary"), so dark mode, focus rings, and disabled states still work out of the box.',
      },
      {
        title: '3. Do not pass inline style to Bear components',
        body: 'Inline style props bypass the design system. Instead: compose AeroCraft classes on className, or wrap in a bearStyled block if you need something the system does not yet provide. This keeps Bear upgradable.',
      },
      {
        title: '4. Dark mode + responsive',
        body: 'Bear switches theme via .bear-dark on <html>. AeroCraft utilities work the same in either mode. For responsive variants, prefix the utility (md:flex-row) and let Bear resolve the component theme.',
      },
    ],
    codeBlocks: [
      {
        title: 'aerocraft.config.ts (Bear-aware utilities)',
        language: 'typescript',
        code: `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  mode: 'standalone',
  customShortcuts: {
    'background-bear': { css: { 'background-color': 'var(--bear-bg-secondary)' }, group: 'background' },
    'color-bear': { css: { color: 'var(--bear-text-primary)' }, group: 'color' },
    'color-bear-muted': { css: { color: 'var(--bear-text-muted)' }, group: 'color' },
    'border-color-bear': { css: { 'border-color': 'var(--bear-border-default)' }, group: 'border' },
  },
});`,
      },
      {
        title: 'ProductCard.tsx (Bear + AeroCraft, no inline style)',
        language: 'tsx',
        code: `import { Card, Button, Typography, Badge } from '@forgedevstack/bear';

export function ProductCard() {
  return (
    <Card radius="lg" padding="md" className="flex-col gap-3 max-w-sm">
      <div className="w-full rounded-lg aspect-[16/9] background-brand-gradient" />
      <div className="flex-row-center-between gap-2">
        <Typography variant="body1" weight="semibold">Aurora Sneaker</Typography>
        <Badge variant="primary">$120</Badge>
      </div>
      <Typography variant="body2" color="muted">
        Reactive foam sole, mesh upper. Free shipping over $50.
      </Typography>
      <Button variant="primary" size="md" className="w-full">
        Add to cart
      </Button>
    </Card>
  );
}`,
      },
      {
        title: 'Avoid: inline style on Bear components',
        language: 'tsx',
        code: `// ✗ Do not do this
<Card style={{ padding: 24, display: 'flex', gap: 12 }}>…</Card>

// ✓ Do this instead
<Card padding="md" className="flex-col gap-3">…</Card>`,
      },
    ],
    shortcuts: [
      { example: 'className="flex-col gap-3"', note: 'Layout on Bear components' },
      { example: 'var(--bear-primary-600)', note: 'Shared token' },
      { example: 'background-bear color-bear-muted', note: 'Custom utility using Bear vars' },
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
