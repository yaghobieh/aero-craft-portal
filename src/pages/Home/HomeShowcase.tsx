import { Flex, Typography, Card, Divider } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { useI18n } from '../../i18n/index';
import { ROUTES } from '../../constants/routes.const';
import { AC_PRIMARY_SCALE, AC_SECONDARY_SCALE } from '../../constants/theme.const';

const SWATCH_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export function HomeShowcase() {
  const { t } = useI18n();

  return (
    <Flex direction="column" gap={10}>
      <Divider />

      <Flex direction="column" gap={4} align="center" style={{ textAlign: 'center' }}>
        <Typography variant="h2" weight="bold">{t.homeShowcase.colorsTitle}</Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 640 }}>{t.homeShowcase.colorsLead}</Typography>
      </Flex>

      <Card padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: 16 }}>{t.homeShowcase.primaryScale}</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 8 }}>
          {SWATCH_KEYS.map((k) => (
            <Flex key={k} direction="column" align="center" gap={1}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 8,
                  backgroundColor: AC_PRIMARY_SCALE[k],
                  border: '1px solid var(--bear-border-subtle)',
                }}
              />
              <Typography variant="caption" color="muted">{k}</Typography>
            </Flex>
          ))}
        </div>
      </Card>

      <Card padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: 16 }}>{t.homeShowcase.secondaryScale}</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 8 }}>
          {SWATCH_KEYS.map((k) => (
            <Flex key={k} direction="column" align="center" gap={1}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 8,
                  backgroundColor: AC_SECONDARY_SCALE[k],
                  border: '1px solid var(--bear-border-subtle)',
                }}
              />
              <Typography variant="caption" color="muted">{k}</Typography>
            </Flex>
          ))}
        </div>
      </Card>

      <Flex direction="column" gap={4} align="center" style={{ textAlign: 'center' }}>
        <Typography variant="h2" weight="bold">{t.homeShowcase.gridTitle}</Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 640 }}>{t.homeShowcase.gridLead}</Typography>
      </Flex>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 12,
        }}
      >
        {[t.homeShowcase.gridCellA, t.homeShowcase.gridCellB, t.homeShowcase.gridCellC].map((label) => (
          <Card key={label} padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)', minHeight: 96 }}>
            <Flex align="center" justify="center" style={{ height: '100%' }}>
              <Typography variant="body2" weight="medium">{label}</Typography>
            </Flex>
          </Card>
        ))}
      </div>

      <Flex direction="column" gap={4} align="center" style={{ textAlign: 'center' }}>
        <Typography variant="h2" weight="bold">{t.homeShowcase.motionTitle}</Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 640 }}>{t.homeShowcase.motionLead}</Typography>
      </Flex>

      <Card padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
        <Typography variant="body2" color="muted" style={{ marginBottom: 16 }}>{t.homeShowcase.motionHint}</Typography>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
          }}
        >
          <Card padding="md" radius="md" style={{ transition: 'transform 200ms ease, box-shadow 200ms ease', cursor: 'default' }} className="ac-home-motion-card">
            <Typography variant="body2">{t.homeShowcase.motionCard}</Typography>
          </Card>
          <Link to="/docs/transition">
            <Card padding="md" radius="md" style={{ cursor: 'pointer', height: '100%' }}>
              <Typography variant="body2" color="primary" weight="semibold">{t.homeShowcase.motionCta}</Typography>
            </Card>
          </Link>
        </div>
      </Card>

      <Flex direction="column" gap={4} align="center" style={{ textAlign: 'center' }}>
        <Typography variant="h2" weight="bold">{t.homeShowcase.cascadeTitle}</Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 640 }}>{t.homeShowcase.cascadeLead}</Typography>
      </Flex>

      <Card padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)', backgroundColor: 'var(--bear-bg-secondary)' }}>
        <pre style={{ margin: 0, overflowX: 'auto', fontSize: 12, lineHeight: 1.55 }}>
          <code style={{ color: 'var(--bear-text-secondary)', fontFamily: 'monospace' }}>{t.homeShowcase.cascadeCode}</code>
        </pre>
      </Card>

      <Flex direction="row" gap={3} style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/docs/cascade-layers">
          <Typography variant="body2" color="primary" weight="semibold">{t.homeShowcase.cascadeDoc}</Typography>
        </Link>
        <Link to={ROUTES.STUDIO}>
          <Typography variant="body2" color="primary" weight="semibold">{t.homeShowcase.openSandbox}</Typography>
        </Link>
      </Flex>

      <style>
        {`
          .ac-home-motion-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(226, 0, 116, 0.18);
          }
        `}
      </style>
    </Flex>
  );
}
