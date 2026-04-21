export interface Recipe {
  id: string;
  title: string;
  description: string;
  markup: string;
  minHeight: number;
  tags: string[];
}

const BUTTON_PRIMARY = `<div class="flex-col gap-3 p-4 w-full">
  <button type="button" class="flex-row-center gap-2 px-5 py-3 rounded-lg font-semibold cursor-pointer w-full transition-fast color-white" style="background:linear-gradient(90deg,#f91f7d,#c34df7);border:0;min-height:48px">
    Buy now · $29
  </button>
  <button type="button" class="flex-row-center gap-2 px-5 py-3 rounded-lg font-semibold cursor-pointer w-full transition-fast" style="background:transparent;color:#ff86bb;border:1px solid rgba(249,31,125,0.6);min-height:48px">
    Learn more
  </button>
  <button type="button" class="flex-row-center gap-2 px-5 py-3 rounded-lg font-semibold cursor-pointer w-full transition-fast" style="background:rgba(255,255,255,0.06);color:#f7ecf4;border:0;min-height:48px">
    Ghost
  </button>
</div>`;

const CARD_PRODUCT = `<div class="flex-col gap-3 p-4 rounded-xl" style="background:#170b20;border:1px solid #2c1a3a;max-width:340px">
  <div class="w-full rounded-lg" style="aspect-ratio:16/10;background:linear-gradient(135deg,#f91f7d,#c34df7);"></div>
  <div class="flex-row-center-between gap-2">
    <span class="font-semibold" style="color:#f7ecf4">Aurora Sneaker</span>
    <span class="text-sm font-semibold" style="color:#ff86bb">$120</span>
  </div>
  <p class="text-sm" style="color:#d0b7cd;margin:0">Reactive foam sole with lightweight mesh upper. Free shipping over $50.</p>
  <button type="button" class="flex-row-center gap-2 px-4 py-2 rounded-md font-semibold cursor-pointer color-white w-full transition-fast" style="background:#f91f7d;border:0;min-height:44px">
    Add to cart
  </button>
</div>`;

const GRID_GALLERY = `<div class="w-full p-3" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px">
  <div class="rounded-lg" style="aspect-ratio:1/1;background:linear-gradient(135deg,#f91f7d,#c34df7)"></div>
  <div class="rounded-lg" style="aspect-ratio:1/1;background:linear-gradient(135deg,#c34df7,#670e8e)"></div>
  <div class="rounded-lg" style="aspect-ratio:1/1;background:linear-gradient(135deg,#ff86bb,#f91f7d)"></div>
  <div class="rounded-lg" style="aspect-ratio:1/1;background:linear-gradient(135deg,#ff8a3c,#f91f7d)"></div>
  <div class="rounded-lg" style="aspect-ratio:1/1;background:linear-gradient(135deg,#670e8e,#140c1c)"></div>
  <div class="rounded-lg" style="aspect-ratio:1/1;background:linear-gradient(135deg,#a324dd,#ff86bb)"></div>
</div>`;

const NAVBAR_MOBILE = `<header class="flex-row-center-between p-3 w-full gap-3 rounded-xl" style="background:rgba(20,12,28,0.8);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(12px)">
  <div class="flex-row items-center gap-2">
    <div class="rounded-md" style="width:28px;height:28px;background:linear-gradient(135deg,#f91f7d,#c34df7)"></div>
    <span class="font-bold" style="color:#f7ecf4;font-size:15px">AeroCraft</span>
  </div>
  <button type="button" class="flex-row-center rounded-md cursor-pointer" style="width:40px;height:40px;background:rgba(255,255,255,0.06);color:#f7ecf4;border:0" aria-label="menu">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
  </button>
</header>`;

const FORM_LOGIN = `<form class="flex-col gap-3 p-4 w-full rounded-xl" style="background:#170b20;border:1px solid #2c1a3a;max-width:360px">
  <div class="flex-col gap-1">
    <label class="text-sm font-semibold" style="color:#d0b7cd">Email</label>
    <input type="email" placeholder="you@acme.com" class="px-3 py-2 rounded-md" style="background:#0f0716;border:1px solid #2c1a3a;color:#f7ecf4;min-height:44px" />
  </div>
  <div class="flex-col gap-1">
    <label class="text-sm font-semibold" style="color:#d0b7cd">Password</label>
    <input type="password" placeholder="••••••••" class="px-3 py-2 rounded-md" style="background:#0f0716;border:1px solid #2c1a3a;color:#f7ecf4;min-height:44px" />
  </div>
  <label class="flex-row items-center gap-2 text-sm" style="color:#d0b7cd">
    <input type="checkbox" />
    Remember me
  </label>
  <button type="submit" class="flex-row-center gap-2 px-4 py-3 rounded-md font-semibold cursor-pointer color-white transition-fast" style="background:linear-gradient(90deg,#f91f7d,#c34df7);border:0;min-height:48px">Sign in</button>
</form>`;

const MOBILE_MENU = `<aside class="flex-col p-4 w-full rounded-xl gap-2" style="background:#170b20;border:1px solid #2c1a3a;max-width:320px">
  <span class="text-xs font-semibold" style="color:#927d95;letter-spacing:0.12em;text-transform:uppercase">Menu</span>
  <a href="#" class="flex-row items-center gap-3 px-3 py-3 rounded-md" style="color:#f7ecf4;text-decoration:none;background:rgba(249,31,125,0.14);min-height:48px">
    <span style="width:8px;height:8px;border-radius:50%;background:#f91f7d"></span> Home
  </a>
  <a href="#" class="flex-row items-center gap-3 px-3 py-3 rounded-md" style="color:#d0b7cd;text-decoration:none;min-height:48px">Products</a>
  <a href="#" class="flex-row items-center gap-3 px-3 py-3 rounded-md" style="color:#d0b7cd;text-decoration:none;min-height:48px">Pricing</a>
  <a href="#" class="flex-row items-center gap-3 px-3 py-3 rounded-md" style="color:#d0b7cd;text-decoration:none;min-height:48px">Contact</a>
</aside>`;

const FEATURE_LIST = `<div class="flex-col gap-3 w-full p-3">
  <div class="flex-row items-start gap-3 p-3 rounded-lg" style="background:rgba(249,31,125,0.06);border:1px solid rgba(249,31,125,0.18)">
    <div class="flex-row-center rounded-md" style="width:36px;height:36px;background:rgba(249,31,125,0.22);color:#ff86bb;flex-shrink:0">⚡</div>
    <div class="flex-col gap-1">
      <span class="font-semibold" style="color:#f7ecf4">Zero runtime</span>
      <span class="text-sm" style="color:#d0b7cd">All utilities compile to plain CSS at build time.</span>
    </div>
  </div>
  <div class="flex-row items-start gap-3 p-3 rounded-lg" style="background:rgba(195,77,247,0.06);border:1px solid rgba(195,77,247,0.2)">
    <div class="flex-row-center rounded-md" style="width:36px;height:36px;background:rgba(195,77,247,0.22);color:#dd7dff;flex-shrink:0">✦</div>
    <div class="flex-col gap-1">
      <span class="font-semibold" style="color:#f7ecf4">One class, whole intent</span>
      <span class="text-sm" style="color:#d0b7cd">Replace 6 Tailwind utilities with a single shortcut.</span>
    </div>
  </div>
  <div class="flex-row items-start gap-3 p-3 rounded-lg" style="background:rgba(255,138,60,0.06);border:1px solid rgba(255,138,60,0.22)">
    <div class="flex-row-center rounded-md" style="width:36px;height:36px;background:rgba(255,138,60,0.2);color:#ffbd8b;flex-shrink:0">☁</div>
    <div class="flex-col gap-1">
      <span class="font-semibold" style="color:#f7ecf4">Works everywhere</span>
      <span class="text-sm" style="color:#d0b7cd">React, Vue, Svelte, Astro, vanilla HTML — anywhere CSS runs.</span>
    </div>
  </div>
</div>`;

const PRICING = `<div class="flex-col gap-3 p-4 rounded-xl w-full" style="background:#170b20;border:1px solid rgba(249,31,125,0.4);max-width:320px;position:relative">
  <span class="text-xs font-semibold px-2 py-1 rounded-full" style="position:absolute;top:-10px;left:16px;background:linear-gradient(90deg,#f91f7d,#c34df7);color:#fff;letter-spacing:0.08em;text-transform:uppercase">Most popular</span>
  <span class="text-sm font-semibold" style="color:#ff86bb">Pro</span>
  <div class="flex-row items-baseline gap-1">
    <span class="font-bold" style="color:#f7ecf4;font-size:36px;line-height:1">$29</span>
    <span class="text-sm" style="color:#927d95">/ month</span>
  </div>
  <ul class="flex-col gap-2" style="padding:0;margin:0;list-style:none">
    <li class="flex-row items-center gap-2 text-sm" style="color:#d0b7cd">✓ Unlimited projects</li>
    <li class="flex-row items-center gap-2 text-sm" style="color:#d0b7cd">✓ Priority support</li>
    <li class="flex-row items-center gap-2 text-sm" style="color:#d0b7cd">✓ Team seats</li>
    <li class="flex-row items-center gap-2 text-sm" style="color:#d0b7cd">✓ Custom domains</li>
  </ul>
  <button type="button" class="flex-row-center gap-2 px-4 py-3 rounded-md font-semibold cursor-pointer color-white transition-fast" style="background:linear-gradient(90deg,#f91f7d,#c34df7);border:0;min-height:48px">Start 14-day trial</button>
</div>`;

export const RECIPES: Record<string, Recipe> = {
  button: {
    id: 'button',
    title: 'Buttons',
    description: 'Primary, outline, and ghost buttons sized for 48px mobile touch targets.',
    markup: BUTTON_PRIMARY,
    minHeight: 230,
    tags: ['flex-row-center', 'rounded-lg', 'transition-fast'],
  },
  card: {
    id: 'card',
    title: 'Product card',
    description: 'Stack image, title, price, and CTA with real mobile proportions.',
    markup: CARD_PRODUCT,
    minHeight: 340,
    tags: ['flex-col', 'rounded-xl', 'aspect-ratio'],
  },
  grid: {
    id: 'grid',
    title: 'Auto-fill gallery',
    description: 'A responsive grid that reflows at every breakpoint without media queries.',
    markup: GRID_GALLERY,
    minHeight: 260,
    tags: ['grid', 'aspect-ratio', 'gap'],
  },
  navbar: {
    id: 'navbar',
    title: 'Translucent navbar',
    description: 'Blurred translucent navbar with logo mark and tap-friendly menu button.',
    markup: NAVBAR_MOBILE,
    minHeight: 80,
    tags: ['flex-row-center-between', 'backdrop-filter'],
  },
  form: {
    id: 'form',
    title: 'Sign-in form',
    description: 'Mobile-optimised form with 44px inputs and clear focus states.',
    markup: FORM_LOGIN,
    minHeight: 360,
    tags: ['flex-col', 'rounded-md'],
  },
  'mobile-menu': {
    id: 'mobile-menu',
    title: 'Mobile menu',
    description: 'Full-width tappable menu with highlighted active route.',
    markup: MOBILE_MENU,
    minHeight: 280,
    tags: ['flex-col', 'rounded-md'],
  },
  'feature-list': {
    id: 'feature-list',
    title: 'Feature list',
    description: 'Icon + title + description rows for landing pages.',
    markup: FEATURE_LIST,
    minHeight: 300,
    tags: ['flex-row', 'rounded-lg'],
  },
  pricing: {
    id: 'pricing',
    title: 'Pricing card',
    description: 'Highlighted pricing tier with badge, big price, and CTA.',
    markup: PRICING,
    minHeight: 380,
    tags: ['flex-col', 'rounded-xl'],
  },
};

export const RECIPE_ORDER: string[] = [
  'button',
  'card',
  'grid',
  'navbar',
  'form',
  'mobile-menu',
  'feature-list',
  'pricing',
];

export function getRecipe(slug: string): Recipe | undefined {
  return RECIPES[slug];
}
