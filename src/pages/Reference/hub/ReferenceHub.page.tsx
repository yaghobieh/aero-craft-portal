import { Card, Flex, Typography } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';

const GROUPS: Array<{
  title: string;
  items: Array<{ to: string; name: string; css: string }>;
}> = [
  {
    title: 'Flexbox & Grid — items',
    items: [
      { to: '/docs/reference/flex', name: 'flex', css: 'flex-1, flex-auto, flex-none, flex-[3_1_auto]' },
      { to: '/docs/reference/flex-direction', name: 'flex-direction', css: 'flex-row, flex-col, flex-row-reverse' },
      { to: '/docs/reference/flex-wrap', name: 'flex-wrap', css: 'flex-wrap, flex-nowrap, flex-wrap-reverse' },
      { to: '/docs/reference/flex-basis', name: 'flex-basis', css: 'basis-1/2, basis-64, basis-[220px]' },
      { to: '/docs/reference/flex-grow', name: 'flex-grow', css: 'grow, grow-0, grow-[2]' },
      { to: '/docs/reference/flex-shrink', name: 'flex-shrink', css: 'shrink, shrink-0, shrink-[0.5]' },
      { to: '/docs/reference/order', name: 'order', css: 'order-1, order-first, order-last' },
      { to: '/docs/reference/justify-content', name: 'justify-content', css: 'justify-center, justify-between, justify-evenly' },
      { to: '/docs/reference/align-items', name: 'align-items', css: 'items-center, items-stretch, items-baseline' },
      { to: '/docs/reference/align-self', name: 'align-self', css: 'self-center, self-stretch, self-end' },
      { to: '/docs/reference/align-content', name: 'align-content', css: 'content-start, content-between, content-evenly' },
      { to: '/docs/reference/gap', name: 'gap', css: 'gap-4, gap-x-8, gap-[5px]' },
    ],
  },
  {
    title: 'Flexbox & Grid — grid',
    items: [
      { to: '/docs/reference/grid-template-columns', name: 'grid-template-columns', css: 'grid-cols-3, grid-cols-[200px_1fr], grid-cols-none' },
      { to: '/docs/reference/grid-column', name: 'grid-column', css: 'col-span-2, col-span-full, col-start-3' },
      { to: '/docs/reference/grid-template-rows', name: 'grid-template-rows', css: 'grid-rows-3, grid-rows-[auto_1fr_auto]' },
      { to: '/docs/reference/grid-row', name: 'grid-row', css: 'row-span-2, row-span-full, row-start-2' },
      { to: '/docs/reference/grid-auto-flow', name: 'grid-auto-flow', css: 'grid-flow-row, grid-flow-col, grid-flow-row-dense' },
      { to: '/docs/reference/grid-auto-columns', name: 'grid-auto-columns', css: 'auto-cols-auto, auto-cols-fr, auto-cols-[200px]' },
      { to: '/docs/reference/grid-auto-rows', name: 'grid-auto-rows', css: 'auto-rows-fr, auto-rows-min, auto-rows-[80px]' },
      { to: '/docs/reference/justify-items', name: 'justify-items', css: 'justify-items-center, justify-items-start' },
      { to: '/docs/reference/justify-self', name: 'justify-self', css: 'justify-self-center, justify-self-end' },
      { to: '/docs/reference/place-content', name: 'place-content', css: 'place-content-center, place-content-between' },
      { to: '/docs/reference/place-items', name: 'place-items', css: 'place-items-center, place-items-start' },
      { to: '/docs/reference/place-self', name: 'place-self', css: 'place-self-center, place-self-stretch' },
    ],
  },
  {
    title: 'Sizing',
    items: [
      { to: '/docs/reference/width', name: 'width', css: 'w-16, w-1/2, w-full, w-[22rem]' },
      { to: '/docs/reference/min-width', name: 'min-width', css: 'min-w-0, min-w-full, min-w-[24rem]' },
      { to: '/docs/reference/max-width', name: 'max-width', css: 'max-w-md, max-w-7xl, max-w-[65ch]' },
      { to: '/docs/reference/height', name: 'height', css: 'h-10, h-full, h-screen, h-[100dvh]' },
      { to: '/docs/reference/min-height', name: 'min-height', css: 'min-h-0, min-h-screen, min-h-[70vh]' },
      { to: '/docs/reference/max-height', name: 'max-height', css: 'max-h-40, max-h-screen, max-h-[75vh]' },
      { to: '/docs/reference/size', name: 'size', css: 'size-8, size-full, size-[2.25rem]' },
    ],
  },
];

export function ReferenceHubPage() {
  return (
    <Flex direction="column" gap={6} style={{ paddingBottom: 48 }}>
      <Flex direction="column" gap={2}>
        <Typography
          variant="caption"
          weight="semibold"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--bear-text-muted)',
            fontSize: 12,
          }}
        >
          Utility reference
        </Typography>
        <Typography variant="h1" weight="bold" style={{ fontSize: 44, lineHeight: 1.05 }}>
          Reference
        </Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 820, fontSize: 16 }}>
          Every AeroCraft utility, one page per property \u2014 with live previews, quick-reference
          tables, custom-value syntax, responsive variants and our composite shortcuts.
        </Typography>
      </Flex>

      {GROUPS.map((g) => (
        <Flex key={g.title} direction="column" gap={3}>
          <Typography variant="h3" weight="bold">
            {g.title}
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 12,
            }}
          >
            {g.items.map((item) => (
              <Link key={item.to} to={item.to}>
                <Card
                  padding="md"
                  radius="lg"
                  style={{
                    backgroundColor: 'var(--bear-bg-secondary)',
                    border: '1px solid var(--bear-border-default)',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="h5" weight="semibold" style={{ fontFamily: 'Fira Code, ui-monospace, monospace', color: 'var(--bear-primary-400)' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="muted" style={{ marginTop: 6, fontSize: 12 }}>
                    {item.css}
                  </Typography>
                </Card>
              </Link>
            ))}
          </div>
        </Flex>
      ))}
    </Flex>
  );
}
