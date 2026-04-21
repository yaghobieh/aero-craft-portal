import { Flex, Typography, Button, Badge, BearIcons } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { GradientTextAc } from '../GradientTextAc';
import { LivePreview } from '../LivePreview';
import { useI18n } from '@i18n/index';
import { AEROCRAFT_VERSION, ROUTES } from '@const/routes.const';
import { AC_GRADIENT_HERO } from '@const/theme.const';
import { HERO_PREVIEW_MIN_HEIGHT_PX } from '@const/numbers.const';
import { HERO_PREVIEW_BACKGROUND_HEX } from '@const/strings.const';
import { buildHeroDemoMarkup } from '@utils/heroDemoMarkup.utils';
import { HERO_CODE_SAMPLE, HERO_CODE_TOKEN_RE, HERO_FRAMEWORKS } from './HeroSection.const';
import type { HeroCodePreviewProps } from './HeroSection.types';

export function HeroSection() {
  const { t } = useI18n();
  const demoMarkup = buildHeroDemoMarkup(t.hero);

  return (
    <section className="ac-hero-root">
      <div className="ac-hero-grid ac-hero-grid-inner">
        <Flex direction="column" gap={5} className="ac-hero-copy">
          <Badge variant="info" className="ac-badge-fit">{t.hero.badge}</Badge>

          <Typography variant="h1" weight="bold" className="ac-hero-h1">
            <span className="ac-hero-title-plain">{t.hero.titlePlain}</span>
            <br />
            <GradientTextAc colors={AC_GRADIENT_HERO} className="ac-hero-gradient-title">
              {t.hero.titleGradient}
            </GradientTextAc>
          </Typography>

          <Typography variant="body1" color="muted" className="ac-hero-lead">
            {t.hero.lead}
          </Typography>

          <div className="ac-hero-ctas">
            <Link to="/docs/getting-started">
              <Button variant="primary" size="lg" className="ac-hero-cta-primary">
                {t.hero.ctaGetStarted}
              </Button>
            </Link>
            <Link to={ROUTES.DOCS}>
              <Button variant="outline" size="lg">{t.hero.ctaReference}</Button>
            </Link>
            <Link to={ROUTES.STUDIO}>
              <Button variant="ghost" size="lg">
                <Flex align="center" gap={2}>
                  <BearIcons.PlayCircleIcon size="sm" />
                  {t.hero.ctaStudio}
                </Flex>
              </Button>
            </Link>
          </div>

          <div className="ac-hero-npm-row">
            <span className="ac-hero-npm-prompt">{t.hero.npmPrompt}</span>
            <span className="ac-hero-npm-cmd">{t.hero.npmCommand}</span>
            <Badge variant="secondary" className="ac-hero-npm-badge">v{AEROCRAFT_VERSION}</Badge>
          </div>

          <Flex direction="row" gap={2} className="ac-hero-fw-row">
            <Typography variant="caption" color="muted" className="ac-hero-fw-label">
              {t.hero.worksWith}
            </Typography>
            {HERO_FRAMEWORKS.map((fw) => (
              <span key={fw} className="ac-hero-fw-chip">{fw}</span>
            ))}
          </Flex>
        </Flex>

        <HeroCodePreview codeText={HERO_CODE_SAMPLE} markup={demoMarkup} />
      </div>

      <style>
        {`
          @media (min-width: 960px) {
            .ac-hero-grid {
              grid-template-columns: 1.1fr 1fr !important;
            }
          }
        `}
      </style>
    </section>
  );
}

function HeroCodePreview({ codeText, markup }: HeroCodePreviewProps) {
  const { t } = useI18n();
  return (
    <div className="ac-hero-code-shell">
      <div className="ac-hero-code-inner">
        <Flex align="center" gap={2} className="ac-hero-code-chrome">
          <span className="ac-hero-code-dot ac-hero-code-dot--red" />
          <span className="ac-hero-code-dot ac-hero-code-dot--amber" />
          <span className="ac-hero-code-dot ac-hero-code-dot--green" />
          <span className="ac-hero-code-filename">{t.hero.appFileLabel}</span>
          <span className="ac-hero-code-spacer">{t.hero.chromeBrand}</span>
        </Flex>

        <pre className="ac-hero-code-pre">
          <code>{renderHeroCode(codeText)}</code>
        </pre>

        <div className="ac-hero-code-hr" />

        <div className="ac-hero-code-preview">
          <LivePreview
            markup={markup}
            label={t.hero.previewLabel}
            minHeight={HERO_PREVIEW_MIN_HEIGHT_PX}
            showClasses={false}
            background={HERO_PREVIEW_BACKGROUND_HEX}
          />
        </div>
      </div>
    </div>
  );
}

function renderHeroCode(code: string) {
  const parts = code.split(HERO_CODE_TOKEN_RE).filter(Boolean);
  return parts.map((p, i) => {
    if (/<\/?\w+/.test(p)) return <span key={i} className="ac-hero-syntax-tag">{p}</span>;
    if (p === '/>' || p === '/' || p === '>') return <span key={i} className="ac-hero-syntax-tag">{p}</span>;
    if (p === 'class=' || p === 'className=') return <span key={i} className="ac-hero-syntax-attr">{p}</span>;
    if (/^"[\s\S]*"$/.test(p)) return <span key={i} className="ac-hero-syntax-string">{p}</span>;
    if (/^\/\/ /.test(p)) return <span key={i} className="ac-hero-syntax-comment">{p}</span>;
    if (/^[a-z]+-[a-z0-9-/\[\]#:.]+/.test(p)) return <span key={i} className="ac-hero-syntax-class">{p}</span>;
    return <span key={i}>{p}</span>;
  });
}
