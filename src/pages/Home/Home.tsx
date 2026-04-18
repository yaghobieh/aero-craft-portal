import { Flex, Typography, Divider, Card, Badge, Button, CodeBlock, BearIcons } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { HeroSection } from '../../components/HeroSection';
import { FeatureCard } from '../../components/FeatureCard';
import { HomeShowcase } from './HomeShowcase';
import { HomeExamples } from './HomeExamples';
import { useI18n } from '../../i18n/index';
import { FEATURE_CARD_COUNT } from '../../constants/numbers.const';
import { ROUTES, AEROCRAFT_VERSION } from '../../constants/routes.const';

const FEATURE_ICONS = ['⚡', '🎨', '🌐', '🌀', '🔧', '🧩'];

export function Home() {
  const { t } = useI18n();
  const featureEntries = Object.entries(t.features.items).slice(0, FEATURE_CARD_COUNT);

  return (
    <Flex direction="column" gap={10}>
      <HeroSection />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          alignItems: 'stretch',
        }}
      >
        <Card padding="xl" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
          <Flex direction="column" gap={3}>
            <Typography variant="h4" weight="bold">{t.homeLanding.aboutTitle}</Typography>
            <Typography variant="body1" color="muted" style={{ lineHeight: 1.65 }}>{t.homeLanding.aboutLead}</Typography>
            <Link to="/docs/getting-started">
              <Button variant="outline" size="sm">{t.homeLanding.linkDocs}</Button>
            </Link>
          </Flex>
        </Card>

        <Card
          padding="xl"
          radius="lg"
          style={{
            border: '1px dashed var(--bear-border-default)',
            backgroundColor: 'var(--bear-bg-secondary)',
          }}
        >
          <Flex direction="column" gap={3} align="center" style={{ textAlign: 'center' }}>
            <BearIcons.PlayCircleIcon size="lg" style={{ opacity: 0.5 }} />
            <Badge variant="secondary">{t.homeLanding.videoTitle}</Badge>
            <Typography variant="body2" color="muted" style={{ lineHeight: 1.6 }}>{t.homeLanding.videoLead}</Typography>
          </Flex>
        </Card>
      </div>

      <Card padding="xl" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
        <Flex direction="column" gap={3}>
          <Typography variant="h4" weight="bold">{t.homeLanding.cliTitle}</Typography>
          <Typography variant="body1" color="muted" style={{ maxWidth: 720 }}>{t.homeLanding.cliLead}</Typography>
          <CodeBlock code={t.homeLanding.cliCode} language="bash" title="CLI" showLineNumbers={false} copyable />
          <Link to="/docs/getting-started/cli">
            <Button variant="ghost" size="sm">{t.homeLanding.linkDocs}</Button>
          </Link>
        </Flex>
      </Card>

      <HomeExamples />

      <HomeShowcase />

      <Divider />

      <Flex direction="column" gap={4} align="center" style={{ textAlign: 'center' }}>
        <Typography variant="h2" weight="bold">{t.features.title}</Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 560 }}>{t.features.subtitle}</Typography>
      </Flex>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {featureEntries.map(([key, item], i) => (
          <FeatureCard key={key} icon={FEATURE_ICONS[i]} title={item.title} desc={item.desc} />
        ))}
      </div>

      <Divider />

      <Flex direction="column" gap={4} align="center" style={{ textAlign: 'center' }}>
        <Typography variant="h2" weight="bold">{t.quickStart.title}</Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 500 }}>{t.quickStart.subtitle}</Typography>
      </Flex>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {[t.quickStart.step1, t.quickStart.step2, t.quickStart.step3].map((step, i) => (
          <Card key={step.title} padding="lg" radius="lg">
            <Flex direction="column" gap={3}>
              <Typography variant="h4" color="primary" weight="bold">0{i + 1}</Typography>
              <Typography variant="h6" weight="semibold">{step.title}</Typography>
              <Typography variant="body2" color="muted">{step.desc}</Typography>
            </Flex>
          </Card>
        ))}
      </div>

      <Card padding="xl" radius="lg" color="primary">
        <Flex direction="column" align="center" gap={3} style={{ textAlign: 'center' }}>
          <Typography variant="h5" weight="bold" style={{ fontFamily: 'monospace', color: '#fff' }}>
            npm install @forgedevstack/aerocraft
          </Typography>
          <Typography variant="body2" style={{ opacity: 0.85, color: '#fff' }}>
            {t.homeLanding.npmTagline}
            {' · v'}
            {AEROCRAFT_VERSION}
          </Typography>
          <Link to={ROUTES.DOCS}>
            <Button variant="outline" size="sm" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}>
              {t.nav.docs}
            </Button>
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
}
