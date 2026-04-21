export const HERO_FRAMEWORKS = [
  'React',
  'Vue',
  'Angular',
  'Svelte',
  'Next.js',
  'Nuxt',
  'Astro',
  'Solid',
] as const;

export const HERO_CODE_SAMPLE = `<button class="flex-row-center gap-2 px-4 py-2
                rounded-md cursor-pointer
                background-[#f91f7d] color-white
                transition-fast hover:scale-105">
  Try AeroCraft
</button>`;

export const HERO_CODE_TOKEN_RE =
  /(\bclass=|\b[a-z]+-[a-z0-9-/\[\]#:.]+|".*?"|\{[^}]*\}|<\/?\w+|\/\>|\/\/ .*)/g;
