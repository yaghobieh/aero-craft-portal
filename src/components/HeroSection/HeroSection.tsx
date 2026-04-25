import { Flex, Typography, Button, Badge, BearIcons } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { GradientTextAc } from '../GradientTextAc';
import { useI18n } from '@i18n/index';
import { AEROCRAFT_VERSION, ROUTES } from '@const/routes.const';
import { AC_GRADIENT_HERO } from '@const/theme.const';
import { buildHeroCodeSample, buildHeroPreviewMarkup } from '@utils/heroDemoMarkup.utils';
import { HeroCodePreview } from '../HeroCodePreview';
import { HERO_FRAMEWORKS } from './HeroSection.const';

export function HeroSection() {
  const { t } = useI18n();
  const codeSample = buildHeroCodeSample(t.hero.demoButtonLabel);
  const previewMarkup = buildHeroPreviewMarkup(t.hero.demoButtonLabel);

  return (
    <section className="ac-hero-root">
      <div className="ac-hero-grid-inner">
        <Flex direction="column" gap={5} className="ac-hero-copy">
          <Badge variant="info" className="ac-badge-fit">{`v${AEROCRAFT_VERSION} — ${t.hero.badgeAvailability}`}</Badge>

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

        <HeroCodePreview codeText={codeSample} markup={previewMarkup} />
      </div>

    </section>
  );
}
