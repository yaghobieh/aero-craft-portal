import { AppBar, Flex, Typography, Button, Badge, useBear } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { useI18n } from '@i18n/index';
import { ROUTES, AEROCRAFT_GITHUB_URL, AEROCRAFT_VERSION } from '@const/routes.const';

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const { toggleMode, mode } = useBear();

  const toggleLocale = () => setLocale(locale === 'en' ? 'es' : 'en');

  return (
    <AppBar
      position="sticky"
      elevation
      leftContent={
        <Link to={ROUTES.HOME}>
          <Flex direction="row" align="center" gap={3}>
            <img src="/logo-mark.svg" alt="" width={32} height={32} />
            <Typography variant="h6" weight="bold">AeroCraft</Typography>
            <Badge variant="info">{AEROCRAFT_VERSION}</Badge>
          </Flex>
        </Link>
      }
      centerContent={
        <Flex direction="row" align="center" gap={2}>
          <Link to={ROUTES.HOME}>
            <Button variant="ghost" size="sm">{t.nav.home}</Button>
          </Link>
          <Link to={ROUTES.DOCS}>
            <Button variant="ghost" size="sm">{t.nav.docs}</Button>
          </Link>
          <Link to={ROUTES.STUDIO}>
            <Button variant="ghost" size="sm">{t.nav.studio}</Button>
          </Link>
          <Link to={ROUTES.PLAYGROUND}>
            <Button variant="ghost" size="sm">{t.nav.playground}</Button>
          </Link>
        </Flex>
      }
      rightContent={
        <Flex direction="row" align="center" gap={2}>
          <Button variant="ghost" size="sm" onClick={toggleLocale}>
            {locale === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleMode}>
            {mode === 'dark' ? '☀️' : '🌙'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(AEROCRAFT_GITHUB_URL, '_blank')}
          >
            GitHub ↗
          </Button>
        </Flex>
      }
    />
  );
}
