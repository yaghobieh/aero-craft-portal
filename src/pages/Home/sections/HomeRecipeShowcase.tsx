import { Flex, Typography } from '@forgedevstack/bear';
import { GradientTextAc } from '@components/GradientTextAc';
import { AC_GRADIENT_HERO } from '@const/theme.const';

interface RecipeDemo {
  name: string;
  html: string;
  desc: string;
}

const RECIPES: RecipeDemo[] = [
  {
    name: 'btn-primary',
    html: '<button class="bear-btn-primary">Get Started</button>',
    desc: 'One class. Full button with padding, colors, transitions, rounded corners.',
  },
  {
    name: 'btn-outline',
    html: '<button class="bear-btn-outline">Learn More</button>',
    desc: 'Outlined button variant. Border, hover states, all included.',
  },
  {
    name: 'input',
    html: '<input class="bear-input" placeholder="Enter email..." />',
    desc: 'Fully styled input. Border, padding, radius, focus transition — one class.',
  },
  {
    name: 'input-pill',
    html: '<input class="bear-input-pill" placeholder="Search..." />',
    desc: 'Pill-shaped input. Perfect for search bars.',
  },
  {
    name: 'card',
    html: '<div class="bear-card">\n  <h3>Card Title</h3>\n  <p>Card content here.</p>\n</div>',
    desc: 'Card with border, padding, radius. Ready to use.',
  },
  {
    name: 'badge',
    html: '<span class="bear-badge">New</span>',
    desc: 'Inline badge. Pill shape, small text, centered.',
  },
  {
    name: 'avatar',
    html: '<div class="bear-avatar">JY</div>',
    desc: 'Circle avatar with centered text or image.',
  },
  {
    name: 'container',
    html: '<div class="bear-container">...</div>',
    desc: 'Responsive container. max-width 1280px, auto margins, padding.',
  },
];

export function HomeRecipeShowcase() {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2} align="center" className="ac-center-text">
        <Typography variant="caption" weight="semibold" className="ac-kicker">
          Component recipes
        </Typography>
        <Typography variant="h2" weight="bold" className="ac-hero-title">
          One class.{' '}
          <GradientTextAc colors={AC_GRADIENT_HERO}>Full component.</GradientTextAc>
        </Typography>
        <Typography variant="body1" color="muted" className="ac-lead">
          Stop writing 6 utility classes for a button. AeroCraft ships 25+ component recipes —
          production-ready presets that give you a complete component in a single class.
        </Typography>
      </Flex>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {RECIPES.map((r) => (
          <div
            key={r.name}
            style={{
              borderRadius: 14,
              border: '1px solid var(--bear-border-default)',
              background: 'var(--bear-bg-secondary)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid var(--bear-border-default)',
              }}
            >
              <Flex direction="row" align="center" gap={2}>
                <code
                  style={{
                    fontFamily: 'Fira Code, ui-monospace, monospace',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--bear-primary-400)',
                  }}
                >
                  .bear-{r.name}
                </code>
              </Flex>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <pre
                style={{
                  fontFamily: 'Fira Code, ui-monospace, monospace',
                  fontSize: 12,
                  color: 'var(--bear-text-secondary)',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  lineHeight: 1.6,
                }}
              >
                {r.html}
              </pre>
              <Typography
                variant="caption"
                color="muted"
                style={{ marginTop: 12, display: 'block' }}
              >
                {r.desc}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <Flex direction="column" align="center" gap={2} className="ac-center-text">
        <Typography variant="body2" color="muted">
          Tailwind requires <code style={{ color: 'var(--bear-text-secondary)' }}>@apply</code> or
          plugin workarounds. AeroCraft ships these{' '}
          <strong style={{ color: 'var(--bear-text-primary)' }}>out of the box</strong>.
        </Typography>
      </Flex>
    </Flex>
  );
}
