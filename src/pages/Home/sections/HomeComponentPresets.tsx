import { Badge, Button, Flex, Typography } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { LivePreview } from '@components/LivePreview';
import { GradientTextAc } from '@components/GradientTextAc';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/routes.const';
import { AC_GRADIENT_HERO } from '@const/theme.const';
import { COMPONENT_PRESET_CARD_PREVIEW_MIN_HEIGHT_PX } from '@const/numbers.const';
import { HERO_PREVIEW_BACKGROUND_HEX } from '@const/strings.const';
import {
  PRESET_DEMO_CIRCLE_BUTTON_MARKUP,
  PRESET_DEMO_INPUT_MARKUP,
  buildPresetDemoBoxMarkup,
  buildPresetDemoSelectMarkup,
} from '@const/homeComponentPresetsDemo.const';

export function HomeComponentPresets() {
  const { t } = useI18n();
  const p = t.homeComponentPresets;
  const cards = [
    { title: p.cardButton, markup: PRESET_DEMO_CIRCLE_BUTTON_MARKUP },
    { title: p.cardInput, markup: PRESET_DEMO_INPUT_MARKUP },
    {
      title: p.cardSelect,
      markup: buildPresetDemoSelectMarkup(p.selectOptionA, p.selectOptionB),
    },
    { title: p.cardBox, markup: buildPresetDemoBoxMarkup(p.boxBody) },
  ];

  return (
    <Flex direction="column" gap={6} className="ac-home-presets">
      <Flex direction="column" gap={2} align="center" className="ac-center-text">
        <Flex align="center" gap={2} className="ac-presets-badges">
          <Badge variant="info" className="ac-kicker">
            {p.kicker}
          </Badge>
          <Badge variant="secondary">{p.badgePremium}</Badge>
        </Flex>
        <Typography variant="h2" weight="bold" className="ac-hero-title">
          {p.title}{' '}
          <GradientTextAc colors={AC_GRADIENT_HERO} className="ac-hero-gradient-title">
            {p.titleGradient}
          </GradientTextAc>
        </Typography>
        <Typography variant="body1" color="muted" className="ac-lead ac-presets-lead">
          {p.lead}
        </Typography>
        <Flex direction="row" gap={3} className="ac-presets-ctas" align="center">
          <Link to={ROUTES.STUDIO}>
            <Button variant="primary" size="md">
              {p.ctaStudio}
            </Button>
          </Link>
          <Link to="/docs/core-concepts/component-recipes">
            <Button variant="outline" size="md">
              {p.ctaDocs}
            </Button>
          </Link>
        </Flex>
      </Flex>

      <div
        className="ac-presets-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16,
        }}
      >
        {cards.map((c) => (
          <div
            key={c.title}
            className="ac-card-hover"
            style={{
              borderRadius: 14,
              border: '1px solid var(--bear-border-default)',
              background: 'var(--bear-bg-secondary)',
              overflow: 'hidden',
            }}
          >
            <Flex direction="row" align="center" justify="between" className="ac-presets-card-head">
              <Typography variant="body2" weight="semibold">
                {c.title}
              </Typography>
            </Flex>
            <div className="ac-presets-card-preview">
              <LivePreview
                markup={c.markup}
                minHeight={COMPONENT_PRESET_CARD_PREVIEW_MIN_HEIGHT_PX}
                showClasses={false}
                background={HERO_PREVIEW_BACKGROUND_HEX}
              />
            </div>
          </div>
        ))}
      </div>
    </Flex>
  );
}
