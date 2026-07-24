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
    lead: 'The aero-craft-plugin workspace ships a VS Code–compatible extension: class completions from the live `@forgedevstack/aerocraft` catalog (1.0.6+), Bear component hints, and optional alias mode. Completions respect `prefix` / `separator` from `aerocraft.config.*` in the workspace.',
    sections: [
      {
        title: 'Install',
        body: 'Open the aero-craft-plugin folder, run npm install (postinstall builds out/), then Extensions → Install from VSIX after `npx vsce package`, or press F5 for the Extension Development Host. Requires `@forgedevstack/aerocraft@^1.0.6`.',
      },
      {
        title: 'Config-aware prefix',
        body: 'When `aerocraft.config.js` (or .mjs/.cjs/.ts) is present, suggestions use that config’s `prefix` and `separator` (for example `bear-flex` when `prefix: \'bear\'`). Without a config, the library default (empty prefix) is used.',
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
    lead: 'Patch releases keep config compatible. Review the CHANGELOG on GitHub before minor bumps. Highlights for 1.0.6 below.',
    sections: [
      {
        title: 'npm',
        body: 'Bump to @forgedevstack/aerocraft@1.0.6 and run your build. Regenerate CSS if you commit emitted output.',
      },
      {
        title: '1.0.6 behavioral notes',
        body: 'space-x / space-y now use sibling margins (not gap) — swap to gap-* if you relied on the old alias. Gradients use --ac-gradient-* (from/via/to compose with bg-gradient-to-*). Default palette is unified (zinc/gray/slate/neutral + hues). Optional runtime: import from @forgedevstack/aerocraft/runtime.',
      },
      {
        title: 'Arbitrary syntax',
        body: 'Bracket classes like h-[12px] and curly ac-{{12px}} are both scanned. Prefer one style per codebase for consistency.',
      },
    ],
    shortcuts: [
      { example: 'npm i @forgedevstack/aerocraft@1.0.6', note: 'Upgrade package' },
    ],
  },
  'core-concepts/dark-mode': {
    title: 'Dark mode',
    lead: 'Dark mode is built into AeroCraft’s PostCSS plugin. With `content` scanning enabled, `dark:` and compound variants like `dark:hover:` are generated natively — no companion variant plugin and no Tailwind required for AeroCraft classes. Default `darkSelector` is `.dark, .bear-dark` (Bear-friendly). Pair that with CSS variables for theme tokens.',
    sections: [
      {
        title: 'Native `dark:` variants',
        body: 'Strings such as `dark:bear-flex-row` or `dark:bear-bg-zinc-900` **are** generated when those class names appear in your scanned sources. AeroCraft wraps the utility declarations under your `darkSelector` (default `.dark, .bear-dark`). Compounds work too: `dark:hover:bear-bg-primary-700`.',
      },
      {
        title: 'Configure content + darkSelector',
        body: 'Set `content: [\'./src/**/*.{ts,tsx}\']` so the plugin can find variant classes. Override `darkSelector` if your app uses a different root class. Bear’s BearProvider already toggles `dark` and `bear-dark` on the document root.',
      },
      {
        title: 'System preference',
        body: 'You can still flip CSS variables with `@media (prefers-color-scheme: dark)` for token-driven colors. Layout shortcuts stay the same; point color utilities at `var(--...)` so one class works in both schemes.',
      },
      {
        title: 'Manual toggle (class on html)',
        body: 'Add `dark` (and optionally `bear-dark`) on `html` or a parent. Redefine `--bear-bg-*`, `--bear-text-*`, or your own `--surface` / `--ink` under `.dark` so variable-backed utilities track the mode.',
      },
      {
        title: 'Hybrid stacks',
        body: 'If you also run Tailwind on the same markup, both engines can react to the same `dark` class. AeroCraft owns its prefixed utilities; Tailwind owns its own. No need for a separate AeroCraft variant companion.',
      },
      {
        title: 'Does `light:` exist?',
        body: 'AeroCraft does not ship a `light:` variant. Prefer `:root` defaults overridden under `.dark`, or `@media (prefers-color-scheme: light)` for automatic light styling.',
      },
      {
        title: 'With Bear (this site)',
        body: 'The portal uses BearProvider: toggling light/dark updates CSS variables and root classes. AeroCraft marketing markup often uses `text-[var(--bear-text-primary)]` so previews follow the active Bear theme.',
      },
    ],
    codeBlocks: [
      { title: 'Token swap (CSS variables)', code: CODE_DARK_ROOT, language: 'css' },
      {
        title: 'Native dark utilities',
        language: 'html',
        code: `<div class="bear-bg-white dark:bear-bg-zinc-900 bear-text-zinc-900 dark:bear-text-zinc-100 bear-p-6">
  Surface follows dark: variants + tokens
</div>`,
      },
    ],
    shortcuts: [
      { example: 'dark:bear-bg-zinc-900', note: 'Native dark variant (content scan)' },
      { example: 'dark:hover:bear-bg-primary-700', note: 'Compound dark + hover' },
      { example: 'md:flex-row', note: 'Responsive prefix (independent of dark:)' },
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

  /* ── release notes ─────────────────────────────────────────────── */

  'getting-started/whats-new': {
    title: "What's new in AeroCraft 1.0.6",
    lead: 'Unified default palette, fixed gradients and space-x/y, molten runtime (Typed OM), Vitest regression suite, publish CI, and docs synced with native variants from 1.0.3–1.0.5.',
    sections: [
      {
        title: 'Unified default palette',
        body: 'DEFAULT_THEME_COLORS is now the single source of truth for zinc, gray, slate, neutral, red, green, blue, yellow, orange, amber, emerald, cyan, purple, pink (+ white/black). Theme utilities, scanner colors, and ring/divide helpers all derive from it. Gray is true gray — no more slate hex under the gray name.',
      },
      {
        title: 'Gradient composition fixed',
        body: 'bg-gradient-to-* and from-*/via-*/to-* share --ac-gradient-* tokens (no more --tw-* mismatch). Static stop shortcuts ship out of the box so gradients work without relying solely on content scanning.',
      },
      {
        title: 'space-x / space-y sibling spacing',
        body: 'space-x-* and space-y-* now use nested > * + * margins (margin-inline-start / margin-block-start), matching established utility semantics. gap-* utilities are unchanged. This is a behavioral fix if you previously relied on the accidental gap alias.',
      },
      {
        title: 'Runtime module (molten)',
        body: 'Import @forgedevstack/aerocraft/runtime for high-frequency numeric style updates via CSS Typed OM (attributeStyleMap / CSS.px) with element.style fallback and an optional WeakMap registry. Class shortcuts remain the static path for layout.',
      },
      {
        title: 'Tests + publish CI',
        body: 'Vitest covers PostCSS expansion, native variants, gradients, space/divide nesting, the plugin API, and runtime fallback. GitHub Actions publish.yml follows the ForgeStack pattern (typecheck → test → build → publish).',
      },
      {
        title: 'From 1.0.5 (still current)',
        body: 'Container queries, plugin system, 50+ variants (print, aria-*, data-*, motion-*, supports-*), first-class ring/divide/content, and env() support all remain as shipped in 1.0.5.',
      },
    ],
    codeBlocks: [
      {
        title: 'Gradient',
        language: 'html',
        code: `<div class="bear-bg-gradient-to-r bear-from-blue-500 bear-to-pink-500"></div>`,
      },
      {
        title: 'Runtime',
        language: 'ts',
        code: `import { applyStyle } from '@forgedevstack/aerocraft/runtime';
applyStyle(el, { width: 120, opacity: { value: 0.8, unit: 'number' } });`,
      },
    ],
    shortcuts: [
      { example: 'bear-space-x-4', note: 'Sibling spacing (not gap)' },
      { example: 'bear-from-blue-500', note: 'Gradient stop (--ac-gradient-from)' },
      { example: 'dark:bear-bg-zinc-900', note: 'Native dark variant' },
    ],
  },

  'getting-started/whats-new-1-0-5': {
    title: "What's new in AeroCraft 1.0.5",
    lead: 'Container queries, plugin system, 50+ new variants, first-class ring and divide utilities, env() support, and feature-detection variants. The biggest feature release yet.',
    sections: [
      {
        title: 'Container query variant',
        body: 'Use @container: to wrap utilities in CSS container queries. Supports named containers via @container/sidebar:. Pair with container-type-[inline-size] on parent elements for responsive component-level design.',
      },
      {
        title: 'Plugin system',
        body: 'A Tailwind-like plugin API lets third-party plugins register custom utilities and components. Add plugins to your config and they receive { addUtilities, addComponents, theme, config } — exactly like Tailwind plugins, but for AeroCraft.',
      },
      {
        title: 'print: variant',
        body: 'The print: variant wraps rules in @media print. Use print:bear-hidden to hide elements when printing, or print:bear-text-black to force black text on paper.',
      },
      {
        title: 'aria-* / data-* variants',
        body: 'Dynamic attribute-based variants. aria-selected:bear-bg-blue-500 targets [aria-selected="true"]. data-active:bear-text-white targets [data-active]. Any aria or data attribute name works — no predefined list needed.',
      },
      {
        title: 'Full peer: / group: variant set',
        body: 'Beyond group-hover, AeroCraft now supports: group-focus, group-active, group-focus-within, group-focus-visible, group-disabled, group-checked, group-invalid, peer-hover, peer-focus, peer-focus-visible, peer-active, peer-checked, peer-disabled, peer-invalid, peer-required, peer-placeholder-shown.',
      },
      {
        title: 'Ring utilities (first-class)',
        body: 'ring-0 through ring-8, ring-inset, ring-offset-0 through ring-offset-8, and ring color utilities (ring-blue-500, ring-gray-400, etc.) — all powered by the --ac-ring-color CSS custom property. No more arbitrary-only ring widths.',
      },
      {
        title: 'Divide utilities',
        body: 'divide-x and divide-y with width scale (0, 1, 2, 4, 8), divide-solid/dashed/dotted/double/none, and divide color utilities. Uses the > * + * nested selector for proper child-element dividers.',
      },
      {
        title: 'Content utility & env()',
        body: 'content-none and content-empty as static shortcuts. Arbitrary content-[\'…\'] via bracket notation. Plus env() support: p-(env-safe-area-inset-top) resolves to padding: env(safe-area-inset-top) — essential for mobile PWAs with notched displays.',
      },
      {
        title: 'Motion & feature-detection variants',
        body: 'motion-reduce: and motion-safe: for prefers-reduced-motion. supports-grid:, supports-flex:, supports-[display:grid]: for @supports queries. contrast-more: and contrast-less: for prefers-contrast. portrait: and landscape: for orientation.',
      },
      {
        title: 'Additional pseudo variants',
        body: 'visited, checked, required, invalid, valid, empty, enabled, indeterminate, read-only, read-write, only-child, first-of-type, last-of-type, only-of-type, before, after, selection, marker, first-line, first-letter — all available as variant prefixes.',
      },
    ],
    codeBlocks: [
      { title: 'Plugin system (aerocraft.config.js)', code: `import { defineConfig } from '@forgedevstack/aerocraft';

function myPlugin({ addUtilities, addComponents }) {
  addUtilities({
    '.scrollbar-hide': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
    },
  });
  addComponents({
    '.btn-gradient': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      padding: '0.5rem 1rem',
      'border-radius': '0.5rem',
    },
  });
}

export default defineConfig({
  plugins: [myPlugin],
});`, language: 'typescript' },
      { title: 'New variants in action', code: `<!-- Container queries -->
<div class="container-type-[inline-size]">
  <div class="@container:bear-flex-col @container:bear-p-4">…</div>
</div>

<!-- Print styling -->
<nav class="print:bear-hidden">…</nav>

<!-- Accessibility -->
<div class="aria-selected:bear-bg-blue-100" aria-selected="true">…</div>
<input class="peer-invalid:bear-border-red-500" />

<!-- Motion -->
<div class="motion-reduce:bear-transition-none">…</div>

<!-- Feature detection -->
<div class="supports-grid:bear-grid supports-grid:bear-grid-cols-3">…</div>`, language: 'html' },
    ],
    shortcuts: [
      { example: '@container:bear-flex-col', note: 'Container query variant' },
      { example: 'print:bear-hidden', note: 'Print media variant' },
      { example: 'aria-selected:bear-bg-blue-500', note: 'ARIA attribute variant' },
      { example: 'peer-checked:bear-bg-green-100', note: 'Peer checked variant' },
      { example: 'ring-2', note: 'First-class ring utility' },
      { example: 'divide-y', note: 'Divide utility' },
      { example: 'motion-reduce:bear-transition-none', note: 'Reduced motion variant' },
      { example: 'supports-grid:bear-grid', note: 'Feature detection variant' },
    ],
  },

  'core-concepts/variants': {
    title: 'Variants (dark, hover, focus)',
    lead: 'AeroCraft generates state variants natively — no extra plugin needed. Just use variant prefixes in your class names and set content in your config.',
    sections: [
      {
        title: 'How it works',
        body: 'When you set content: ["./src/**/*.{ts,tsx}"] in your config, AeroCraft scans those files for variant class patterns like dark:bear-bg-zinc-900 or hover:bear-text-primary-500. It then generates only the CSS rules you actually use.',
      },
      {
        title: 'Available variants',
        body: 'dark: — dark mode (wraps in .dark or custom selector). hover: — :hover pseudo-class. focus: — :focus. focus-visible: — :focus-visible. focus-within: — :focus-within. active: — :active. disabled: — :disabled. group-hover: — parent .bear-group:hover. placeholder: — ::placeholder. first: — :first-child. last: — :last-child. odd: — :nth-child(odd). even: — :nth-child(even).',
      },
      {
        title: 'Compound variants',
        body: 'Stack multiple variants: dark:hover:bear-bg-zinc-700 generates .dark .dark\\:hover\\:bear-bg-zinc-700:hover. Responsive compounds like sm:dark:bear-text-white are also supported.',
      },
      {
        title: 'Custom dark selector',
        body: 'By default, dark: wraps rules in .dark and .bear-dark selectors. Override with darkSelector in your PostCSS config: aerocraftPlugin({ ...config, darkSelector: ".my-dark-class" }).',
      },
      {
        title: 'Opacity modifiers',
        body: 'Opacity works with variants: dark:bear-bg-primary-900/30 generates color-mix(in srgb, var(--bear-primary-900) 30%, transparent). Works with hex colors too: hover:bear-bg-black/60 generates rgba(0, 0, 0, 0.6).',
      },
      {
        title: '!important modifier',
        body: 'Prefix or suffix with ! for important: !bear-flex or bear-flex! both generate .bear-flex { display: flex !important; }. Works with variants: dark:!bear-bg-white.',
      },
    ],
    codeBlocks: [
      { title: 'Usage in JSX', code: `<div className="bear-bg-white dark:bear-bg-zinc-900 bear-text-zinc-900 dark:bear-text-zinc-100">
  Automatically adapts to dark mode
</div>

<button className="bear-btn-primary hover:bear-bg-primary-600 focus:bear-ring-primary-500/50">
  Interactive button
</button>

<input className="bear-input focus:bear-border-primary-500 disabled:bear-opacity-50" />`, language: 'html' },
      { title: 'aerocraft.config.js', code: `export default {
  prefix: 'bear',
  separator: '-',
  mode: 'standalone',
  groups: 'all',
  content: ['./src/**/*.{ts,tsx}'],  // required for variant scanning
};`, language: 'typescript' },
    ],
    shortcuts: [
      { example: 'dark:bear-bg-zinc-900', note: 'Dark mode background' },
      { example: 'hover:bear-text-primary-500', note: 'Hover text color' },
      { example: 'focus:bear-ring-primary-500/50', note: 'Focus ring with opacity' },
      { example: 'dark:hover:bear-bg-zinc-700', note: 'Compound: dark + hover' },
      { example: 'disabled:bear-opacity-50', note: 'Disabled state' },
      { example: '!bear-flex', note: 'Important modifier' },
    ],
  },

  'core-concepts/models': {
    title: 'Models (component API)',
    lead: 'A runtime registry that maps component + model name to CSS class. No CSS generated — pure JS lookup. Works with React, Angular, Vue, or vanilla JS.',
    sections: [
      {
        title: 'The model() function',
        body: 'Import model from @forgedevstack/aerocraft. Call model("input", "rounded") and it returns "bear-input-rounded". Call model("button", "primary") and get "bear-btn-primary". The second argument defaults to "default" if omitted.',
      },
      {
        title: 'React — useModel() hook',
        body: 'Import useModel from @forgedevstack/aerocraft/react. It memoizes the lookup: const cls = useModel("input", model). Use it in your component props.',
      },
      {
        title: 'Any framework — className approach',
        body: 'The class-based approach works everywhere. In React: className="bear-input-rounded". In Angular: class="bear-input-rounded". In Vue: :class="\'bear-input-rounded\'". In HTML: class="bear-input-rounded". The model() function is just a convenience wrapper.',
      },
      {
        title: 'Custom models — registerModels()',
        body: 'Extend the registry with your own models: registerModels({ alert: { success: { className: "alert-success" } } }). Then model("alert", "success") returns "bear-alert-success".',
      },
      {
        title: 'Available models',
        body: 'button: default, primary, outline, ghost, icon, circle, sm, lg. input: default, rounded, pill, underline. textarea: default. select: default. card: default, hover, flat. badge: default. avatar: default, sm, lg. container: default. divider: default. skeleton: default. overlay: default.',
      },
    ],
    codeBlocks: [
      { title: 'Core — model() function', code: `import { model } from '@forgedevstack/aerocraft';

model('input', 'rounded')   // → 'bear-input-rounded'
model('button', 'primary')  // → 'bear-btn-primary'
model('card')               // → 'bear-card'
model('card', 'hover')      // → 'bear-card-hover'
model('avatar', 'lg')       // → 'bear-avatar-lg'`, language: 'typescript' },
      { title: 'React — useModel() hook', code: `import { useModel } from '@forgedevstack/aerocraft/react';

function MyInput({ model = 'default', className, ...props }) {
  const cls = useModel('input', model);
  return <input className={\`\${cls} \${className ?? ''}\`} {...props} />;
}

// Usage:
<MyInput model="rounded" placeholder="Search..." />
// renders: <input class="bear-input-rounded" />

<MyInput model="pill" />
// renders: <input class="bear-input-pill" />`, language: 'tsx' },
      { title: 'Any framework — just use classes', code: `<!-- React -->
<input className="bear-input-rounded" />

<!-- Angular -->
<input class="bear-input-rounded" />

<!-- Vue -->
<input :class="'bear-input-rounded'" />

<!-- HTML -->
<input class="bear-input-rounded" />
<button class="bear-btn-primary">Click</button>
<div class="bear-card">Content</div>`, language: 'html' },
      { title: 'Register custom models', code: `import { registerModels, model } from '@forgedevstack/aerocraft';

registerModels({
  alert: {
    success: { className: 'alert-success' },
    error:   { className: 'alert-error' },
    warning: { className: 'alert-warning' },
  },
});

model('alert', 'success')  // → 'bear-alert-success'`, language: 'typescript' },
    ],
    shortcuts: [
      { example: 'bear-btn-primary', note: 'model("button", "primary")' },
      { example: 'bear-input-rounded', note: 'model("input", "rounded")' },
      { example: 'bear-input-pill', note: 'model("input", "pill")' },
      { example: 'bear-card-hover', note: 'model("card", "hover")' },
      { example: 'bear-avatar-lg', note: 'model("avatar", "lg")' },
      { example: 'bear-container', note: 'model("container")' },
    ],
  },
};
