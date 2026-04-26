import { Flex, Typography } from '@forgedevstack/bear';
import { GradientTextAc } from '@components/GradientTextAc';
import { AC_GRADIENT_HERO } from '@const/theme.const';

interface FeatureRow {
  feature: string;
  aerocraft: string;
  tailwind: string;
  advantage: boolean;
}

const ROWS: FeatureRow[] = [
  { feature: 'Utility-first CSS',              aerocraft: 'Yes',                    tailwind: 'Yes',                  advantage: false },
  { feature: 'Zero runtime',                   aerocraft: 'Yes',                    tailwind: 'Yes',                  advantage: false },
  { feature: 'Custom prefix',                  aerocraft: 'Any prefix (bear-, app-)', tailwind: 'Limited',           advantage: true },
  { feature: 'Built-in component recipes',     aerocraft: '25+ recipes',            tailwind: 'Requires plugin',      advantage: true },
  { feature: 'Runtime theme switching',         aerocraft: 'Native CSS vars',        tailwind: 'Needs rebuild',        advantage: true },
  { feature: 'Dark mode',                      aerocraft: 'Built into core',        tailwind: 'Built-in',             advantage: true },
  { feature: 'All variants in one plugin',     aerocraft: 'Single plugin',          tailwind: 'Single plugin',        advantage: false },
  { feature: 'Compound variants',             aerocraft: 'dark:hover: native',     tailwind: 'dark:hover: native',   advantage: false },
  { feature: 'Content scanning',              aerocraft: 'JIT-like, zero waste',   tailwind: 'JIT',                  advantage: false },
  { feature: 'Shortcut composition',          aerocraft: 'flex-row-center',        tailwind: '4+ classes needed',     advantage: true },
  { feature: 'Opacity on CSS variables',      aerocraft: 'color-mix() native',     tailwind: '--tw-opacity vars',     advantage: true },
  { feature: 'SVG fill/stroke utilities',     aerocraft: 'Full palette + dark',    tailwind: 'Basic',                advantage: true },
  { feature: 'Component-level presets',        aerocraft: 'btn, input, card, badge', tailwind: '@apply workaround', advantage: true },
  { feature: 'Bundle size (gzip)',             aerocraft: '~15KB',                  tailwind: '~25KB',                advantage: true },
];

export function HomeVsTailwind() {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2} align="center" className="ac-center-text">
        <Typography variant="caption" weight="semibold" className="ac-kicker">
          Why switch?
        </Typography>
        <Typography variant="h2" weight="bold" className="ac-hero-title">
          AeroCraft vs{' '}
          <GradientTextAc colors={AC_GRADIENT_HERO}>Others</GradientTextAc>
        </Typography>
        <Typography variant="body1" color="muted" className="ac-lead">
          Everything you love about x — plus runtime theming, shortcut composition,
          built-in component recipes, and a smaller bundle.
        </Typography>
      </Flex>

      <div className="portal-vs-table">
        <div className="portal-vs-header">
          <span>Feature</span>
          <span className="portal-vs-header-ac">AeroCraft</span>
          <span>Others</span>
        </div>

        {ROWS.map((row, i) => (
          <div
            key={row.feature}
            className={`portal-vs-row ${i === 0 ? '' : 'portal-vs-row-divider'}`}
          >
            <div className="portal-vs-cell">
              <Typography variant="body2" weight="medium">
                {row.feature}
              </Typography>
            </div>
            <div className={`portal-vs-cell portal-vs-cell-divider ${row.advantage ? 'portal-vs-cell-advantage' : ''}`}>
              <code className={row.advantage ? 'portal-vs-code-ac-adv' : 'portal-vs-code-ac'}>
                {row.aerocraft}
              </code>
            </div>
            <div className="portal-vs-cell portal-vs-cell-divider">
              <code className="portal-vs-code-other">
                {row.tailwind}
              </code>
            </div>
          </div>
        ))}
      </div>
    </Flex>
  );
}
