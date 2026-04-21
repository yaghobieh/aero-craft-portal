import { Card, Flex, Typography } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { PORTAL_CATEGORIES } from '@const/portalCategories.const';
import { useI18n } from '@i18n/index';

export function ReferenceHubPage() {
  const { t } = useI18n();
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
          Every AeroCraft utility, one page per property — with live previews, quick-reference
          tables, custom-value syntax, responsive variants and our composite shortcuts.
        </Typography>
      </Flex>

      {PORTAL_CATEGORIES.map((cat) => (
        <Flex key={cat.id} id={`cat-${cat.id}`} direction="column" gap={3} style={{ scrollMarginTop: 96 }}>
          <Flex align="baseline" gap={3} style={{ flexWrap: 'wrap' }}>
            <Typography variant="h3" weight="bold">
              {t.docsNav[`reference/cat/${cat.id}`] ?? cat.label}
            </Typography>
            <Typography variant="caption" color="muted">
              {cat.properties.length}
              {' '}
              properties
            </Typography>
          </Flex>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 10,
            }}
          >
            {cat.properties.map((prop) => (
              <Link key={prop} to={`/docs/reference/${prop}`}>
                <Card
                  padding="md"
                  radius="md"
                  style={{
                    backgroundColor: 'var(--bear-bg-secondary)',
                    border: '1px solid var(--bear-border-default)',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    variant="body2"
                    weight="semibold"
                    style={{
                      fontFamily: 'Fira Code, ui-monospace, monospace',
                      color: 'var(--bear-primary-400)',
                      fontSize: 13,
                    }}
                  >
                    {prop}
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
