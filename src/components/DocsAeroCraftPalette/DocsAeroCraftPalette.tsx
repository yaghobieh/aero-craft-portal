import { Card, Flex, Typography } from '@forgedevstack/bear';
import {
  BLUE_SCALE,
  DOCS_PALETTE_STEP_KEYS,
  PINK_SCALE,
  RED_SCALE,
  YELLOW_SCALE,
} from '@const/extendedThemeColors.const';
import { AC_ACCENT_SCALE, AC_PRIMARY_SCALE, AC_SECONDARY_SCALE } from '@const/theme.const';
import { AC_DOCS_SEMANTIC_SWATCHES } from '@const/aerocraftDocsSemanticColors.const';

function sortedSteps(record: Record<number, string>): number[] {
  return Object.keys(record)
    .map((k) => Number(k))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);
}

function hexAt(scale: Record<string, string>, step: number): string | undefined {
  return scale[String(step)];
}

type CircleRowStringScaleProps = {
  title: string;
  subtitle?: string;
  scale: Record<string, string>;
  keys: readonly number[];
};

function CircleRowStringScale({ title, subtitle, scale, keys }: CircleRowStringScaleProps) {
  const present = keys.filter((k) => hexAt(scale, k) !== undefined);
  return (
    <div className="ac-docs-palette-panel">
      <Flex align="baseline" justify="between" className="ac-palette-row-head">
        <Typography variant="body2" weight="semibold">{title}</Typography>
        <Typography variant="caption" color="muted">{present.length}</Typography>
      </Flex>
      {subtitle ? (
        <Typography variant="caption" color="muted" className="ac-docs-palette-subtitle">{subtitle}</Typography>
      ) : null}
      <div className="ac-docs-palette-dots">
        {present.map((step) => {
          const fill = hexAt(scale, step) ?? '';
          return (
            <div key={step} className="ac-docs-palette-dot-cell">
              <svg className="ac-docs-palette-dot-svg" viewBox="0 0 40 40" aria-hidden>
                <circle cx="20" cy="20" r="17" fill={fill} className="ac-docs-palette-dot-shape" />
              </svg>
              <Typography variant="caption" color="muted" className="ac-docs-palette-dot-step">{step}</Typography>
              <Typography variant="caption" className="ac-palette-swatch-hex">{fill}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type CircleRowNumericScaleProps = {
  title: string;
  subtitle?: string;
  scale: Record<number, string>;
};

function CircleRowNumericScale({ title, subtitle, scale }: CircleRowNumericScaleProps) {
  const steps = sortedSteps(scale);
  return (
    <div className="ac-docs-palette-panel">
      <Flex align="baseline" justify="between" className="ac-palette-row-head">
        <Typography variant="body2" weight="semibold">{title}</Typography>
        <Typography variant="caption" color="muted">{steps.length}</Typography>
      </Flex>
      {subtitle ? (
        <Typography variant="caption" color="muted" className="ac-docs-palette-subtitle">{subtitle}</Typography>
      ) : null}
      <div className="ac-docs-palette-dots">
        {steps.map((step) => {
          const fill = scale[step];
          return (
            <div key={step} className="ac-docs-palette-dot-cell">
              <svg className="ac-docs-palette-dot-svg" viewBox="0 0 40 40" aria-hidden>
                <circle cx="20" cy="20" r="17" fill={fill} className="ac-docs-palette-dot-shape" />
              </svg>
              <Typography variant="caption" color="muted" className="ac-docs-palette-dot-step">{step}</Typography>
              <Typography variant="caption" className="ac-palette-swatch-hex">{fill}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SemanticCircles() {
  return (
    <div className="ac-docs-palette-panel">
      <Flex align="baseline" justify="between" className="ac-palette-row-head">
        <Typography variant="body2" weight="semibold">Surfaces (portal)</Typography>
        <Typography variant="caption" color="muted">{AC_DOCS_SEMANTIC_SWATCHES.length}</Typography>
      </Flex>
      <Typography variant="caption" color="muted" className="ac-docs-palette-subtitle">
        From <code className="ac-inline-code">theme.colors</code>
        {' '}→ <code className="ac-inline-code">background-surface</code>
        , <code className="ac-inline-code">background-surface-muted</code>
      </Typography>
      <div className="ac-docs-palette-dots ac-docs-palette-dots--tight">
        {AC_DOCS_SEMANTIC_SWATCHES.map(({ label, hex }) => (
          <div key={label} className="ac-docs-palette-dot-cell">
            <svg className="ac-docs-palette-dot-svg" viewBox="0 0 40 40" aria-hidden>
              <circle cx="20" cy="20" r="17" fill={hex} className="ac-docs-palette-dot-shape" />
            </svg>
            <Typography variant="caption" color="muted" className="ac-docs-palette-dot-step">{label}</Typography>
            <Typography variant="caption" className="ac-palette-swatch-hex">{hex}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DocsAeroCraftPalette() {
  return (
    <Card padding="lg" radius="lg" className="ac-docs-palette-root">
      <Flex direction="column" gap={6}>
        <Flex direction="column" gap={2}>
          <Typography variant="h4" weight="bold">Color wheels</Typography>
          <Typography variant="body2" color="muted" className="ac-docs-palette-lead">
            Pink, red, yellow, and blue scales ship inside <code className="ac-inline-code">@forgedevstack/aerocraft</code>
            {' '}as <code className="ac-inline-code">DEFAULT_THEME_COLORS</code>
            {' '}(merged into your <code className="ac-inline-code">theme.colors</code>
            ). Use <code className="ac-inline-code">color-pink-500</code>
            , <code className="ac-inline-code">background-red-600</code>
            , <code className="ac-inline-code">color-[#ffffff]</code>
            {' '}for literals. Override or add keys in your project config as needed.
          </Typography>
        </Flex>

        <CircleRowNumericScale
          title="ForgeStack primary (magenta)"
          subtitle="BearProvider / theme.const — not the same keys as theme.colors.pink"
          scale={AC_PRIMARY_SCALE}
        />
        <CircleRowNumericScale title="ForgeStack secondary (orchid)" scale={AC_SECONDARY_SCALE} />
        <CircleRowStringScale
          title="Pink (theme.colors.pink)"
          subtitle="color-pink-500 · background-pink-300 · …"
          scale={PINK_SCALE}
          keys={DOCS_PALETTE_STEP_KEYS}
        />
        <CircleRowStringScale
          title="Red (theme.colors.red)"
          scale={RED_SCALE}
          keys={DOCS_PALETTE_STEP_KEYS}
        />
        <CircleRowStringScale
          title="Yellow (theme.colors.yellow)"
          scale={YELLOW_SCALE}
          keys={DOCS_PALETTE_STEP_KEYS}
        />
        <CircleRowStringScale
          title="Blue (theme.colors.blue)"
          scale={BLUE_SCALE}
          keys={DOCS_PALETTE_STEP_KEYS}
        />
        <CircleRowNumericScale title="Accent (coral)" scale={AC_ACCENT_SCALE} />
        <SemanticCircles />
      </Flex>
    </Card>
  );
}
