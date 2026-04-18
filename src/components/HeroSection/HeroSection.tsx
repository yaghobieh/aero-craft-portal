import { Flex, Typography, Button, Badge } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { GradientTextAc } from '../GradientTextAc';
import { useI18n } from '../../i18n/index';
import { AEROCRAFT_VERSION, ROUTES } from '../../constants/routes.const';
import { AC_GRADIENT_HERO } from '../../constants/theme.const';

const FRAMEWORKS = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt'];

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section style={{ position: 'relative', paddingTop: 48, paddingBottom: 64, overflow: 'hidden' }}>
      <div
        aria-hidden
        className="ac-home-grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.24), transparent)',
        }}
      />
      <Flex direction="column" align="center" justify="center" gap={5} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Badge variant="info">{t.hero.badge}</Badge>

        <Typography variant="h1" weight="bold" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1, whiteSpace: 'pre-line', maxWidth: 720 }}>
          <GradientTextAc colors={AC_GRADIENT_HERO} style={{ fontSize: 'inherit', fontWeight: 800 }}>
            {t.hero.title}
          </GradientTextAc>
        </Typography>

        <Typography variant="body1" color="muted" style={{ maxWidth: 560, fontSize: 18, lineHeight: 1.6 }}>
          {t.hero.subtitle}
        </Typography>

        <div className="ac-hero-ctas" style={{ maxWidth: 480 }}>
          <Link to="/docs/getting-started" style={{ display: 'block' }}>
            <Button variant="primary" size="lg" style={{ width: '100%' }}>{t.hero.ctaStart}</Button>
          </Link>
          <Link to={ROUTES.DOCS} style={{ display: 'block' }}>
            <Button variant="outline" size="lg" style={{ width: '100%' }}>{t.hero.ctaDocs}</Button>
          </Link>
          <Link to={ROUTES.STUDIO} style={{ display: 'block' }}>
            <Button variant="outline" size="lg" style={{ width: '100%' }}>{t.hero.ctaStudio}</Button>
          </Link>
        </div>

        <Flex direction="row" gap={2} style={{ flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
          {FRAMEWORKS.map((fw) => (
            <Badge key={fw} variant="secondary">{fw}</Badge>
          ))}
        </Flex>

        <Typography variant="caption" color="muted">
          {t.hero.version} {AEROCRAFT_VERSION} · Zero dependencies · TypeScript · PostCSS
        </Typography>
      </Flex>
    </section>
  );
}
