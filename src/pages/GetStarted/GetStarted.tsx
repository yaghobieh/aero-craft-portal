import { Flex, Typography, Card, Badge, Divider } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { AEROCRAFT_VERSION } from '@const/routes.const';

function CodeBlock({ code }: { code: string }) {
  return (
    <Card padding="md" radius="md" style={{ background: '#0f172a' }}>
      <pre style={{ margin: 0, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}>
        <code style={{ color: '#e2e8f0', fontFamily: 'monospace' }}>{code}</code>
      </pre>
    </Card>
  );
}

function InfoBox({ type, message }: { type: 'info' | 'warning' | 'success'; message: string }) {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    info:    { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
    warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
    success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#14532d' },
  };
  const c = colors[type];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: '12px 16px' }}>
      <Typography variant="body2" style={{ color: c.text }}>{message}</Typography>
    </div>
  );
}

const CODE_INSTALL = `npm install @forgedevstack/aerocraft postcss`;

const CODE_CONFIG = `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({
  prefix: '',
  separator: '-',
  mode: 'standalone',
  groups: 'all',
  responsive: true,
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
});`;

const CODE_POSTCSS = `import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';
import config from './aerocraft.config';

export default {
  plugins: [aerocraftPlugin(config)],
};`;

const CODE_CSS = `@aerocraft;

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }`;

const CODE_USAGE = `<div class="flex-col-center size-full p-4">
  <p class="text-ellipsis">Hello AeroCraft</p>
</div>

<div class="flex-col md:flex-row gap-4">...</div>

<div class="ui_flex-col-center">...</div>`;

const CODE_STANDALONE = `export default defineConfig({
  mode: 'standalone',
  prefix: '',
  groups: { flex: true, position: true, spacing: true },
});`;

const CODE_APPLY = `export default defineConfig({
  mode: 'apply',
  prefix: '',
  groups: 'all',
});`;

const CODE_IMPORT = `import '@forgedevstack/aerocraft/styles.css';`;

const CODE_CLI = `npx aerocraft build ./public/aerocraft.css

npx aerocraft init`;

export function GetStarted() {
  const { t } = useI18n();

  return (
    <Flex direction="column" gap={8} style={{ maxWidth: 820 }}>
      <Flex direction="column" gap={2}>
        <Flex direction="row" align="center" gap={3}>
          <Typography variant="h2" weight="bold">{t.getStarted.title}</Typography>
          <Badge variant="primary">v{AEROCRAFT_VERSION}</Badge>
        </Flex>
        <Typography variant="body1" color="muted">Up and running in under 5 minutes.</Typography>
      </Flex>

      <Divider />

      <Flex direction="column" gap={4}>
        <Typography variant="h4" weight="semibold">{t.getStarted.install.title}</Typography>
        <CodeBlock code={CODE_INSTALL} />
        <InfoBox type="info" message="AeroCraft has no runtime dependencies — only PostCSS as a peer." />
      </Flex>

      <Flex direction="column" gap={4}>
        <Typography variant="h4" weight="semibold">{t.getStarted.setup.title}</Typography>
        <Typography variant="body2" color="muted">1. Create <code>aerocraft.config.ts</code> at your project root:</Typography>
        <CodeBlock code={CODE_CONFIG} />
        <Typography variant="body2" color="muted">2. Register the PostCSS plugin:</Typography>
        <CodeBlock code={CODE_POSTCSS} />
      </Flex>

      <Flex direction="column" gap={4}>
        <Typography variant="h4" weight="semibold">{t.getStarted.usage.title}</Typography>
        <Typography variant="body2" color="muted">Add the <code>@aerocraft</code> directive to your CSS entry:</Typography>
        <CodeBlock code={CODE_CSS} />
        <Typography variant="body2" color="muted">Use shortcut classes anywhere in your markup:</Typography>
        <CodeBlock code={CODE_USAGE} />
      </Flex>

      <Divider />

      <Flex direction="column" gap={4}>
        <Typography variant="h4" weight="semibold">{t.getStarted.modes.title}</Typography>
        <InfoBox type="success" message={t.getStarted.modes.standalone} />
        <CodeBlock code={CODE_STANDALONE} />
        <InfoBox type="info" message={t.getStarted.modes.apply} />
        <CodeBlock code={CODE_APPLY} />
      </Flex>

      <Flex direction="column" gap={4}>
        <Typography variant="h4" weight="semibold">Zero-config Import</Typography>
        <Typography variant="body2" color="muted">Skip PostCSS entirely — import the pre-built stylesheet:</Typography>
        <CodeBlock code={CODE_IMPORT} />
        <InfoBox type="warning" message="The pre-built stylesheet uses the library defaults. Use the PostCSS plugin to customize prefix, breakpoints, and enabled groups." />
      </Flex>

      <Divider />

      <Flex direction="column" gap={4}>
        <Typography variant="h4" weight="semibold">{t.getStarted.cli.title}</Typography>
        <Typography variant="body2" color="muted">{t.getStarted.cli.body}</Typography>
        <CodeBlock code={CODE_CLI} />
      </Flex>
    </Flex>
  );
}
