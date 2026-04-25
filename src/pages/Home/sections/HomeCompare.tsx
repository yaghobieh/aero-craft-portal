import { Flex, Typography } from '@forgedevstack/bear';
import { GradientTextAc } from '@components/GradientTextAc';
import { AC_GRADIENT_HERO } from '@const/theme.const';

interface CompareRow {
  utilityStack: string;
  aerocraft: string;
  label: string;
}

const ROWS: CompareRow[] = [
  {
    label: 'Horizontal center',
    utilityStack: 'flex flex-row items-center justify-center',
    aerocraft: 'flex-row-center',
  },
  {
    label: 'Full-bleed fixed',
    utilityStack: 'fixed top-0 right-0 bottom-0 left-0',
    aerocraft: 'fixed-full',
  },
  {
    label: 'Square card',
    utilityStack: 'w-16 h-16',
    aerocraft: 'size-16',
  },
  {
    label: 'Clamp to 2 lines',
    utilityStack: 'overflow-hidden text-ellipsis display-webkit-box line-clamp-2',
    aerocraft: 'text-clamp-2',
  },
  {
    label: 'Absolute center',
    utilityStack: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    aerocraft: 'absolute-center',
  },
  {
    label: 'Grid 3 auto',
    utilityStack: 'grid grid-cols-3 gap-4',
    aerocraft: 'grid-cols-3 gap-4',
  },
];

export function HomeCompare() {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2} align="center" className="ac-center-text">
        <Typography variant="caption" weight="semibold" className="ac-kicker">
          No more copy-paste
        </Typography>
        <Typography variant="h2" weight="bold" className="ac-hero-title">
          One intent. <GradientTextAc colors={AC_GRADIENT_HERO}>One class.</GradientTextAc>
        </Typography>
        <Typography variant="body1" color="muted" className="ac-lead">
          Stop memorising six-word combinations. AeroCraft collapses the patterns you use every day into
          a single, predictable shortcut — the CSS it emits is identical.
        </Typography>
      </Flex>

      <div
        style={{
          borderRadius: 18,
          border: '1px solid var(--bear-border-default)',
          background: 'var(--bear-bg-secondary)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '14px 20px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--bear-text-muted)',
            background: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid var(--bear-border-default)',
          }}
        >
          <span>Utility stack</span>
          <span>AeroCraft</span>
        </div>

        {ROWS.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderTop: i === 0 ? 'none' : '1px solid var(--bear-border-default)',
            }}
          >
            <div style={{ padding: '16px 20px', borderRight: '1px solid var(--bear-border-default)' }}>
              <Typography variant="caption" color="muted" className="ac-muted-caption-sm">
                {row.label}
              </Typography>
              <code
                style={{
                  display: 'block',
                  marginTop: 6,
                  fontFamily: 'Fira Code, ui-monospace, monospace',
                  fontSize: 13,
                  color: 'var(--bear-text-secondary)',
                  wordBreak: 'break-word',
                }}
              >
                {row.utilityStack}
              </code>
            </div>
            <div
              style={{
                padding: '16px 20px',
                background: 'linear-gradient(100deg, rgba(59,130,246,0.10), rgba(99,102,241,0.08))',
              }}
            >
              <Typography variant="caption" className="ac-accent-caption">
                Shortcut
              </Typography>
              <code
                style={{
                  display: 'block',
                  marginTop: 6,
                  fontFamily: 'Fira Code, ui-monospace, monospace',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--bear-primary-400)',
                }}
              >
                {row.aerocraft}
              </code>
            </div>
          </div>
        ))}
      </div>
    </Flex>
  );
}
