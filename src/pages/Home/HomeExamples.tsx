import { CodeBlock, Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { LivePreview } from '@components/LivePreview';
import { GradientTextAc } from '@components/GradientTextAc';
import { AC_GRADIENT_HERO } from '@const/theme.const';

const CODE_BUTTONS = `<div class="flex-row gap-4 flex-wrap items-center p-4">
  <button type="button" class="px-4 py-2 rounded-md cursor-pointer font-semibold" style="background:#f91f7d;color:#fff;border:0">Primary</button>
  <button type="button" class="px-4 py-2 rounded-md cursor-pointer font-semibold" style="background:transparent;color:#ff86bb;border:1px solid rgba(249,31,125,0.5)">Secondary</button>
  <button type="button" class="px-4 py-2 rounded-md cursor-pointer font-semibold" style="background:rgba(255,255,255,0.06);color:#f7ecf4;border:0">Ghost</button>
</div>`;

const CODE_CAROUSEL = `<div class="flex-row overflow-x-auto gap-3 p-4 scroll-smooth w-full">
  <div class="flex-col-center flex-shrink-0 px-6 py-8 rounded-lg" style="background:linear-gradient(135deg,rgba(249,31,125,0.22),rgba(195,77,247,0.18));color:#fff;min-width:160px;font-weight:600">Slide 1</div>
  <div class="flex-col-center flex-shrink-0 px-6 py-8 rounded-lg" style="background:rgba(249,31,125,0.14);color:#ffb6d7;min-width:160px;font-weight:600">Slide 2</div>
  <div class="flex-col-center flex-shrink-0 px-6 py-8 rounded-lg" style="background:rgba(195,77,247,0.16);color:#eeb2ff;min-width:160px;font-weight:600">Slide 3</div>
  <div class="flex-col-center flex-shrink-0 px-6 py-8 rounded-lg" style="background:rgba(255,255,255,0.04);color:#f7ecf4;min-width:160px;font-weight:600">Slide 4</div>
</div>`;

const CODE_NAV = `<header class="flex-row-center-between p-4 w-full gap-4" style="background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.08);border-radius:12px">
  <div class="flex-row items-center gap-3">
    <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#f91f7d,#c34df7)"></div>
    <span class="font-bold" style="color:#f7ecf4">AeroCraft</span>
    <nav class="flex-row gap-4 flex-wrap" style="margin-left:12px">
      <a href="#docs" style="opacity:.85;color:#d0b7cd">Docs</a>
      <a href="#studio" style="opacity:.85;color:#d0b7cd">Studio</a>
      <a href="#github" style="opacity:.85;color:#d0b7cd">GitHub</a>
    </nav>
  </div>
  <div class="flex-row gap-2 items-center">
    <button type="button" class="px-3 py-1.5 rounded-md cursor-pointer text-sm font-semibold" style="background:linear-gradient(90deg,#f91f7d,#c34df7);color:#fff;border:0">Get started</button>
  </div>
</header>`;

interface ExampleCard {
  title: string;
  code: string;
  minHeight: number;
}

export function HomeExamples() {
  const { t } = useI18n();

  const examples: ExampleCard[] = [
    { title: t.homeExamples.buttonTitle, code: CODE_BUTTONS, minHeight: 110 },
    { title: t.homeExamples.carouselTitle, code: CODE_CAROUSEL, minHeight: 170 },
    { title: t.homeExamples.navbarTitle, code: CODE_NAV, minHeight: 120 },
  ];

  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2} align="center" className="ac-center-text">
        <Typography variant="caption" weight="semibold" className="ac-kicker">
          Composition
        </Typography>
        <Typography variant="h2" weight="bold" className="ac-hero-title">
          {t.homeExamples.title} — <GradientTextAc colors={AC_GRADIENT_HERO}>live</GradientTextAc>
        </Typography>
        <Typography variant="body1" color="muted" className="ac-lead">
          {t.homeExamples.subtitle}
        </Typography>
      </Flex>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 16,
        }}
      >
        {examples.map((ex) => (
          <div
            key={ex.title}
            className="ac-card-hover"
            style={{
              borderRadius: 14,
              border: '1px solid var(--bear-border-default)',
              background: 'var(--bear-bg-secondary)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: 14, background: '#100819' }}>
              <LivePreview markup={ex.code} label={ex.title} minHeight={ex.minHeight} background="#100819" showClasses={false} />
            </div>
            <div style={{ padding: 16 }}>
              <Typography variant="body2" weight="semibold" className="ac-example-title">
                {ex.title}
              </Typography>
              <CodeBlock code={ex.code} language="html" showLineNumbers={false} copyable />
            </div>
          </div>
        ))}
      </div>
    </Flex>
  );
}
