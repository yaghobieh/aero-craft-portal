import { Flex, Typography, Card, Badge, Divider } from '@forgedevstack/bear';
import { useI18n } from '../../i18n/index';
import { AEROCRAFT_VERSION } from '../../constants/routes.const';

const RELEASE_DATE = '2026-04-14';

const CHANGES = [
  'PostCSS plugin (@forgedevstack/aerocraft/postcss) for shortcut class generation',
  '10 class groups: flex, grid, position, size, text, display, overflow, cursor, transition, interactive',
  '70+ built-in shortcut classes',
  'Configurable prefix, separator, and mode via aerocraft.config.ts',
  'mode: "tailwind" — uses @apply for Tailwind-based builds',
  'mode: "standalone" — outputs real CSS values, no Tailwind required',
  'defineConfig helper with full TypeScript support',
  'Custom shortcuts via customShortcuts config option',
  'Pre-built dist/styles.css for zero-config usage',
  '@aerocraft directive for explicit CSS injection',
];

export function Changelog() {
  const { t } = useI18n();

  return (
    <Flex direction="column" gap={8} style={{ maxWidth: 820 }}>
      <Typography variant="h2" weight="bold">{t.changelog.title}</Typography>

      <Card padding="xl" radius="lg">
        <Flex direction="column" gap={5}>
          <Flex direction="row" align="center" gap={3}>
            <Badge variant="primary">v{AEROCRAFT_VERSION}</Badge>
            <Typography variant="body2" color="muted">{RELEASE_DATE}</Typography>
            <Badge variant="success">{t.changelog.initial}</Badge>
          </Flex>

          <Divider />

          <Flex direction="column" gap={3}>
            {CHANGES.map((change) => (
              <Flex key={change} direction="row" align="start" gap={3}>
                <Typography variant="body2" color="primary" style={{ flexShrink: 0, marginTop: 1 }}>✓</Typography>
                <Typography variant="body2">{change}</Typography>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
