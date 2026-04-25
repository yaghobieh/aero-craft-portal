import type { ReactNode } from 'react';
import { BearIcons, Flex, Typography } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { PORTAL_CATEGORIES } from '@const/portalCategories.const';
import { GradientTextAc } from '@components/GradientTextAc';
import { AC_GRADIENT_HERO } from '@const/theme.const';

const CATEGORY_ICON: Record<string, ReactNode> = {
  layout: <BearIcons.LayersIcon size="sm" />,
  flex: <BearIcons.AlignCenterIcon size="sm" />,
  grid: <BearIcons.GridIcon size="sm" />,
  spacing: <BearIcons.BoxIcon size="sm" />,
  sizing: <BearIcons.MaximizeIcon size="sm" />,
  typography: <BearIcons.TextFieldsIcon size="sm" />,
  backgrounds: <BearIcons.ImageIcon size="sm" />,
  borders: <BearIcons.BoxIcon size="sm" />,
  effects: <BearIcons.SparklesIcon size="sm" />,
  filters: <BearIcons.DropletIcon size="sm" />,
  tables: <BearIcons.TableIcon size="sm" />,
  transitions: <BearIcons.ZapIcon size="sm" />,
  transforms: <BearIcons.RefreshIcon size="sm" />,
  interactivity: <BearIcons.MouseIcon size="sm" />,
  svg: <BearIcons.EditIcon size="sm" />,
  a11y: <BearIcons.AccessibilityIcon size="sm" />,
};

export function HomeCategories() {
  const totalProps = PORTAL_CATEGORIES.reduce((acc, c) => acc + c.properties.length, 0);

  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2} align="center" className="ac-center-text">
        <Typography variant="caption" weight="semibold" className="ac-kicker">
          Every property, every value
        </Typography>
        <Typography variant="h2" weight="bold" className="ac-hero-title">
          <GradientTextAc colors={AC_GRADIENT_HERO}>{totalProps}</GradientTextAc> utility properties.
          <br />
          {PORTAL_CATEGORIES.length} categories. Zero missing.
        </Typography>
        <Typography variant="body1" color="muted" className="ac-lead">
          Layout, Flex, Grid, Typography, Filters, Transforms, Animation — pick a category, get a full reference
          page with quick-reference table, live previews, arbitrary values and every AeroCraft shortcut.
        </Typography>
      </Flex>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 14,
        }}
      >
        {PORTAL_CATEGORIES.map((cat) => (
          <Link key={cat.id} to={`/docs/reference#cat-${cat.id}`}>
            <div
              className="ac-card-hover"
              style={{
                padding: 18,
                borderRadius: 14,
                background: 'var(--bear-bg-secondary)',
                border: '1px solid var(--bear-border-default)',
                height: '100%',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.22), transparent 60%)',
                }}
              />
              <Flex direction="row" align="center" gap={2} className="ac-cat-icon-row">
                {CATEGORY_ICON[cat.id]}
                <Typography variant="body2" weight="semibold">
                  {cat.label}
                </Typography>
              </Flex>
              <Typography variant="caption" color="muted" className="ac-mt-10">
                {cat.properties.length} properties
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </Flex>
  );
}
