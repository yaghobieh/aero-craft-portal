import { Flex, Typography } from '@forgedevstack/bear';
import { GradientTextAc } from '@components/GradientTextAc';
import {
  AC_GRADIENT_HERO,
  AC_PRIMARY_SCALE,
  AC_SECONDARY_SCALE,
  AC_ACCENT_SCALE,
} from '@const/theme.const';

const SWATCH_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const ACCENT_KEYS = [300, 400, 500, 600] as const;

export function HomePalette() {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2} align="center" className="ac-center-text">
        <Typography variant="caption" weight="semibold" className="ac-kicker">
          Brand system
        </Typography>
        <Typography variant="h2" weight="bold" className="ac-hero-title">
          Crafted <GradientTextAc colors={AC_GRADIENT_HERO}>with intent</GradientTextAc>
        </Typography>
        <Typography variant="body1" color="muted" className="ac-lead">
          A blue-to-indigo primary scale with a violet secondary. Pull tokens via
          <code className="ac-inline-code"> var(--bear-primary-500)</code>,
          <code className="ac-inline-code"> var(--bear-secondary-500)</code>, or the hex maps in <code className="ac-inline-code">theme.const.ts</code>.
        </Typography>
      </Flex>

      <PaletteRow label="Primary — Blue" scale={AC_PRIMARY_SCALE} keys={SWATCH_KEYS} />
      <PaletteRow label="Secondary — Indigo" scale={AC_SECONDARY_SCALE} keys={SWATCH_KEYS} />
      <PaletteRow label="Accent — Violet" scale={AC_ACCENT_SCALE} keys={ACCENT_KEYS} />
    </Flex>
  );
}

interface PaletteRowProps {
  label: string;
  scale: Record<number, string>;
  keys: readonly number[];
}

function PaletteRow({ label, scale, keys }: PaletteRowProps) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid var(--bear-border-default)',
        background: 'var(--bear-bg-secondary)',
        padding: 18,
      }}
    >
      <Flex align="baseline" justify="between" className="ac-palette-row-head">
        <Typography variant="body2" weight="semibold">
          {label}
        </Typography>
        <Typography variant="caption" color="muted">
          {keys.length} stops
        </Typography>
      </Flex>
      <div className="ac-palette-grid" style={{ gridTemplateColumns: `repeat(${keys.length}, minmax(0, 1fr))` }}>
        {keys.map((k) => (
          <Flex key={k} direction="column" gap={1} className="ac-palette-col">
            <div
              className="ac-palette-swatch"
              style={{ background: scale[k] }}
            />
            <Flex align="baseline" justify="between" className="ac-palette-swatch-row">
              <Typography variant="caption" color="muted" className="ac-palette-swatch-key">
                {k}
              </Typography>
              <Typography variant="caption" className="ac-palette-swatch-hex">
                {scale[k]}
              </Typography>
            </Flex>
          </Flex>
        ))}
      </div>
    </div>
  );
}
