import { Card, CodeBlock, Divider, Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '../../i18n/index';
import { LivePreview } from '../../components/LivePreview';

const CODE_BUTTONS = `<div class="flex-row gap-4 flex-wrap items-center p-4">
  <button type="button" class="p-3 cursor-pointer" style="background:#2563eb;color:#fff;border:0;border-radius:8px">Primary</button>
  <button type="button" class="p-3 cursor-pointer" style="background:transparent;color:#2563eb;border:1px solid #2563eb;border-radius:8px">Secondary</button>
</div>`;

const CODE_CAROUSEL = `<div class="flex-row overflow-x-auto gap-3 p-4 scroll-smooth w-full">
  <div class="p-8 flex-col-center flex-shrink-0" style="background:rgba(37,99,235,.12);border-radius:10px;min-width:140px">1</div>
  <div class="p-8 flex-col-center flex-shrink-0" style="background:rgba(37,99,235,.12);border-radius:10px;min-width:140px">2</div>
  <div class="p-8 flex-col-center flex-shrink-0" style="background:rgba(37,99,235,.12);border-radius:10px;min-width:140px">3</div>
</div>`;

const CODE_NAV = `<header class="flex-row items-center justify-between p-4 w-full gap-4" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px">
  <div class="flex-row items-center gap-3">
    <span class="font-bold">Brand</span>
    <nav class="flex-row gap-4 flex-wrap">
      <a href="#docs" style="opacity:.85">Docs</a>
      <a href="#studio" style="opacity:.85">Studio</a>
    </nav>
  </div>
  <div class="flex-row gap-2 items-center">
    <button type="button" class="p-2 cursor-pointer" style="background:#2563eb;color:#fff;border:0;border-radius:6px">GitHub</button>
  </div>
</header>`;

export function HomeExamples() {
  const { t } = useI18n();

  return (
    <Flex direction="column" gap={6}>
      <Divider />
      <Flex direction="column" gap={2} align="center" style={{ textAlign: 'center' }}>
        <Typography variant="h2" weight="bold">{t.homeExamples.title}</Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 640 }}>{t.homeExamples.subtitle}</Typography>
      </Flex>

      <Card padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>{t.homeExamples.buttonTitle}</Typography>
        <CodeBlock code={CODE_BUTTONS} language="html" showLineNumbers={false} copyable />
        <LivePreview markup={CODE_BUTTONS} label="Live preview" minHeight={110} />
      </Card>

      <Card padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>{t.homeExamples.carouselTitle}</Typography>
        <CodeBlock code={CODE_CAROUSEL} language="html" showLineNumbers={false} copyable />
        <LivePreview markup={CODE_CAROUSEL} label="Live preview" minHeight={160} />
      </Card>

      <Card padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
        <Typography variant="h6" weight="semibold" style={{ marginBottom: 12 }}>{t.homeExamples.navbarTitle}</Typography>
        <CodeBlock code={CODE_NAV} language="html" showLineNumbers={false} copyable />
        <LivePreview markup={CODE_NAV} label="Live preview" minHeight={120} />
      </Card>
    </Flex>
  );
}
