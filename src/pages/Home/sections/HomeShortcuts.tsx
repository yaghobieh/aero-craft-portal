import { Flex, Typography } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { LivePreview } from '@components/LivePreview';
import { GradientTextAc } from '@components/GradientTextAc';
import { AC_GRADIENT_HERO } from '@const/theme.const';

interface ShortcutItem {
  cls: string;
  caption: string;
  markup: string;
  href: string;
  minHeight?: number;
}

const ITEMS: ShortcutItem[] = [
  {
    cls: 'flex-row-center',
    caption: 'Horizontal center + items-center',
    markup:
      '<div class="flex-row-center gap-3 w-full h-full"><span class="px-3 py-1 rounded-md" style="background:rgba(59,130,246,0.18);color:#93c5fd">centered</span></div>',
    href: '/docs/reference/justify-content',
  },
  {
    cls: 'absolute-center',
    caption: 'Dead-center over parent',
    markup:
      '<div style="position:relative;width:100%;height:120px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.08);border-radius:10px"><span class="absolute-center px-3 py-1 rounded-md" style="background:#3b82f6;color:#fff">absolute-center</span></div>',
    href: '/docs/reference/inset',
  },
  {
    cls: 'size-20',
    caption: 'width and height together',
    markup:
      '<div class="flex-row-center w-full h-full"><div class="size-20 rounded-md" style="background:linear-gradient(135deg,#3b82f6,#6366f1)"></div></div>',
    href: '/docs/reference/size',
  },
  {
    cls: 'text-clamp-2',
    caption: 'Line-clamp in one class',
    markup:
      '<p class="text-clamp-2 p-3" style="color:var(--bear-text-primary);max-width:240px;margin:0">One class gives you line clamping with plain CSS—no long chains of display, overflow, and box properties.</p>',
    href: '/docs/reference/line-clamp',
  },
  {
    cls: 'fixed-full',
    caption: 'Fixed overlay inset-0',
    markup:
      '<div style="position:relative;width:100%;height:120px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.08);border-radius:10px;overflow:hidden"><div style="position:absolute;top:0;right:0;bottom:0;left:0;background:radial-gradient(ellipse at center,rgba(59,130,246,0.35),transparent 65%)"></div><span class="absolute-center px-3 py-1 rounded-md" style="background:rgba(0,0,0,0.35);color:#fff">overlay</span></div>',
    href: '/docs/reference/position',
  },
  {
    cls: 'transition-fast',
    caption: 'All-property 150 ms ease',
    markup:
      '<div class="flex-row-center w-full h-full"><button class="px-4 py-2 rounded-md cursor-pointer transition-fast" style="background:linear-gradient(90deg,#3b82f6,#6366f1);color:#fff;border:0" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\'">hover me</button></div>',
    href: '/docs/reference/transition-duration',
  },
];

export function HomeShortcuts() {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2} align="center" className="ac-center-text">
        <Typography variant="caption" weight="semibold" className="ac-kicker">
          AeroCraft only
        </Typography>
        <Typography variant="h2" weight="bold" className="ac-hero-title">
          Shortcuts that <GradientTextAc colors={AC_GRADIENT_HERO}>save keystrokes</GradientTextAc>
        </Typography>
        <Typography variant="body1" color="muted" className="ac-lead">
          A handful of composite classes that make the 80% of layout work disappear. Every shortcut is catalogued,
          searchable, and linked from every relevant reference page.
        </Typography>
      </Flex>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}
      >
        {ITEMS.map((item) => (
          <Link key={item.cls} to={item.href}>
            <div
              className="ac-card-hover"
              style={{
                borderRadius: 14,
                border: '1px solid var(--bear-border-default)',
                background: 'var(--bear-bg-secondary)',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div style={{ padding: 10, background: '#100819' }}>
                <LivePreview
                  markup={item.markup}
                  label={item.cls}
                  minHeight={item.minHeight ?? 120}
                  background="#100819"
                  showClasses={false}
                />
              </div>
              <div style={{ padding: '14px 16px' }}>
                <Typography variant="body2" weight="semibold" className="ac-shortcut-cls">
                  {item.cls}
                </Typography>
                <Typography variant="caption" color="muted">
                  {item.caption}
                </Typography>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Flex>
  );
}
