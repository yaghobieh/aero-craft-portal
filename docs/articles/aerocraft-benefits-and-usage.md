# AeroCraft: Less CSS, Faster UI Delivery

Repo: [https://github.com/yaghobieh/aerocraft](https://github.com/yaghobieh/aerocraft)  
Package: [https://www.npmjs.com/package/@forgedevstack/aerocraft](https://www.npmjs.com/package/@forgedevstack/aerocraft)
VS Code plugin: `../aero-craft-plugin`

AeroCraft is a utility and shortcut CSS engine for teams that want the speed of utility classes with better readability and stronger design consistency.

Instead of repeating 8-12 classes for every button, card, and shell, you compose higher-level shortcuts (and component recipes) from your config, then reuse them everywhere.

## Why AeroCraft?

Most teams hit the same pain points with CSS utility workflows:

- Long class strings are hard to scan in code reviews
- Repeated patterns drift across pages
- Design tokens live in one place, but UI classes don’t
- Migration between projects/frameworks gets noisy

AeroCraft addresses this by generating reusable shortcuts from config, with optional responsive variants and typed design tokens.

## Advantages vs Typical Utility-First Setup

### 1) Shorter, clearer class names

You can collapse repeated utility combinations into one semantic shortcut.

Instead of:

```html
<button class="flex-row-center gap-2 px-5 py-3 rounded-lg font-semibold cursor-pointer w-full transition-fast color-white">
  Buy now
</button>
```

You can define recipe classes and use:

```html
<button class="button-core button-touch-48 button-primary-rounded">
  Buy now
</button>
```

### 2) Config-driven design system

Your styles are generated from a single source of truth:

- `theme` for colors, spacing, fonts, radii, shadows
- `customShortcuts` for reusable layout/semantic helpers
- `componentRecipes` for real component-like classes

### 3) Framework-agnostic output

AeroCraft emits plain CSS. Use it with React, Vue, Angular, Svelte, or vanilla HTML without runtime lock-in.

### 4) Responsive-ready utilities

Enable `responsive: true` and get breakpoint variants from your config breakpoints.

### 5) Better scaling for teams

Teams get consistent naming and less copy-paste CSS noise in JSX/HTML.

## Quick Start

```bash
npm i @forgedevstack/aerocraft postcss
```

### `postcss.config.js`

```js
import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';
import config from './aerocraft.config.js';

export default {
  plugins: [aerocraftPlugin(config)],
};
```

### `src/styles/aerocraft.css`

```css
@aerocraft;
```

### `src/main.tsx` (or equivalent entry)

```ts
import './styles/aerocraft.css';
```

## Real Config Example

```ts
import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  responsive: true,
  theme: {
    colors: {
      brand: { DEFAULT: '#2563eb', 500: '#3b82f6', 600: '#1d4ed8' },
      accent: '#ff8a3c',
    },
    fontFamily: {
      display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  customShortcuts: {
    'background-brand-gradient': {
      group: 'background',
      css: { 'background-image': 'linear-gradient(90deg,#3b82f6,#6366f1)' },
    },
  },
  componentRecipes: {
    'button-core': {
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      gap: '0.5rem',
      width: '100%',
      'font-weight': '600',
      cursor: 'pointer',
      transition: 'all 180ms ease',
      border: '0',
    },
    'button-touch-48': {
      'min-height': '48px',
      padding: '0.75rem 1.25rem',
    },
    'button-primary-rounded': {
      color: '#ffffff',
      'border-radius': '0.75rem',
      'background-image': 'linear-gradient(90deg,#3b82f6,#6366f1)',
      border: '0',
    },
  },
});
```

## Usage Patterns

### A) Utility composition

```html
<section class="flex-col gap-4 p-4 rounded-xl">
  <h2 class="font-bold">Utility composition</h2>
  <p class="color-brand-500">Readable and fast.</p>
</section>
```

### B) Component-style composition

```html
<button class="button-core button-touch-48 button-primary-rounded">
  Continue
</button>
```

### C) Responsive usage

```html
<div class="flex-col md:flex-row gap-3">
  <aside class="w-full md:w-[280px]">Filters</aside>
  <main class="w-full">Results</main>
</div>
```

## When AeroCraft Fits Best

- You want utility-class speed without unreadable markup
- You need a config-driven bridge between design tokens and classes
- You ship across multiple frameworks and want one CSS strategy
- You want to define once and reuse patterns (`componentRecipes`)

## VS Code Plugin (AeroCraft + Bear)

If you also use the ForgeStack extension from `aero-craft-plugin`, you get:

- AeroCraft class completions in `class` / `className`
- Hover docs for class rules and color swatches
- Optional utility-alias suggestion mode
- Bear JSX snippets/autocomplete

Build and package locally:

```bash
cd ../aero-craft-plugin
npm install
npm run package
```

Install in VS Code/Cursor:

```bash
code --install-extension aerocraft-bear-forgestack-*.vsix
```

Recommended settings:

```json
{
  "aerocraft.enableCompletions": true,
  "aerocraft.utilityAliasMode": false,
  "bear.enableComponentSnippets": true
}
```

## Summary

AeroCraft keeps the productivity of utility CSS, but adds structure where teams need it most: naming, reuse, and config-driven consistency.

If your class strings are getting repetitive, AeroCraft gives you a clean path to shorter markup and scalable styling.

Repo: [https://github.com/yaghobieh/aerocraft](https://github.com/yaghobieh/aerocraft)
