import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button, Drawer, Flex, Typography, Badge, useBear, BearIcons, Dropdown } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { useI18n } from '@i18n/index';
import type { Locale } from '@i18n/types';
import {
  ROUTES,
  AEROCRAFT_GITHUB_URL,
  AEROCRAFT_NPM_URL,
  AEROCRAFT_VERSION,
} from '@const/routes.const';
import { portalBrand } from '@config/portal.config';
import { TOPBAR_HEIGHT_PX } from '@const/numbers.const';

const LOCALE_META: Record<Locale, { flag: string; label: string }> = {
  en: { flag: 'EN', label: 'English' },
  es: { flag: 'ES', label: 'Español' },
};

const ICON_COLOR = 'var(--bear-text-primary)';

type TopNavbarProps = {
  onOpenSearch: () => void;
};

export function TopNavbar({ onOpenSearch }: TopNavbarProps) {
  const { t, locale, setLocale } = useI18n();
  const { toggleMode, mode } = useBear();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLink = (to: string, label: string) => (
    <Link to={to} onClick={() => setMobileOpen(false)}>
      <Button variant="ghost" size="sm" style={{ whiteSpace: 'nowrap' }}>
        {label}
      </Button>
    </Link>
  );

  const iconBtn = (icon: ReactNode, onClick: () => void, aria: string) => (
    <Button variant="ghost" size="sm" icon={icon} aria-label={aria} onClick={onClick} />
  );

  const localeItems = (Object.keys(LOCALE_META) as Locale[]).map((loc) => ({
    key: loc,
    label: `${LOCALE_META[loc].flag} — ${LOCALE_META[loc].label}`,
    onClick: () => setLocale(loc),
  }));

  const searchChip = (
    <Button
      variant="ghost"
      size="sm"
      leftIcon={<BearIcons.SearchIcon size="sm" style={{ color: ICON_COLOR, marginRight: 6 }} />}
      onClick={() => { onOpenSearch(); setMobileOpen(false); }}
      aria-label={t.commandPalette.open}
      style={{
        border: '1px solid var(--bear-border-default)',
        borderRadius: 8,
        color: 'var(--bear-text-muted)',
        fontSize: 12,
      }}
    >
      <span style={{ fontFamily: 'monospace' }}>⌘K</span>
    </Button>
  );

  const iconGroup = (
    <>
      {iconBtn(
        <BearIcons.PackageIcon size="sm" style={{ color: ICON_COLOR }} />,
        () => window.open(AEROCRAFT_NPM_URL, '_blank'),
        'npm',
      )}
      {iconBtn(
        <BearIcons.GithubIcon size="sm" style={{ color: ICON_COLOR }} />,
        () => window.open(AEROCRAFT_GITHUB_URL, '_blank'),
        t.nav.github,
      )}
      <Dropdown
        trigger={
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<BearIcons.GlobeIcon size="sm" style={{ color: ICON_COLOR, marginRight: 4 }} />}
            style={{ fontSize: 12, fontFamily: 'monospace' }}
          >
            {LOCALE_META[locale].flag}
          </Button>
        }
        items={localeItems}
        placement="bottom-end"
        size="sm"
      />
      {iconBtn(
        mode === 'dark'
          ? <BearIcons.SunIcon size="sm" style={{ color: ICON_COLOR }} />
          : <BearIcons.MoonIcon size="sm" style={{ color: ICON_COLOR }} />,
        toggleMode,
        t.commandPalette.open,
      )}
    </>
  );

  return (
    <header
      className="ac-top-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        minHeight: TOPBAR_HEIGHT_PX,
        borderBottom: '1px solid var(--bear-border-default)',
        backgroundColor: 'var(--bear-bg-secondary)',
      }}
    >
      <Flex
        direction="row"
        align="center"
        justify="between"
        style={{
          margin: '0 auto',
          padding: '8px 16px',
          gap: 12,
          flexWrap: 'nowrap',
        }}
      >
        <Link to={ROUTES.HOME}>
          <Flex direction="row" align="center" gap={3} style={{ flexShrink: 0 }}>
            <img src="/logo-mark.svg" alt="" width={32} height={32} />
            <Typography variant="h6" weight="bold">AeroCraft</Typography>
            <Badge variant="success" style={{ fontFamily: 'monospace', fontSize: 11 }}>
              v{AEROCRAFT_VERSION}
            </Badge>
          </Flex>
        </Link>

        <Flex
          direction="row"
          align="center"
          gap={1}
          style={{ flex: 1, justifyContent: 'center', display: 'none' }}
          className="ac-top-nav-links-desktop"
        >
          {navLink(ROUTES.HOME, t.nav.home)}
          {navLink(ROUTES.DOCS, t.nav.docs)}
          {navLink(ROUTES.STUDIO, t.nav.studio)}
          {navLink(ROUTES.PLAYGROUND, t.nav.playground)}
        </Flex>

        <Flex
          direction="row"
          align="center"
          gap={2}
          style={{ flexShrink: 0, display: 'none' }}
          className="ac-top-nav-links-desktop"
        >
          {searchChip}
          {iconGroup}
        </Flex>

        <Button
          variant="outline"
          size="sm"
          className="ac-top-nav-menu-mobile"
          style={{ flexShrink: 0 }}
          onClick={() => setMobileOpen(true)}
          icon={<BearIcons.Navigation.MenuIcon size="sm" style={{ color: ICON_COLOR }} />}
          aria-label={t.sidebar.menu}
        />
      </Flex>

      <Drawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} side="right" size="sm">
        <Flex direction="column" gap={2} style={{ padding: 16 }}>
          <Typography variant="caption" color="muted">{portalBrand.npmPackage}</Typography>
          <Flex direction="column" gap={1} align="stretch">
            {navLink(ROUTES.HOME, t.nav.home)}
            {navLink(ROUTES.DOCS, t.nav.docs)}
            {navLink(ROUTES.STUDIO, t.nav.studio)}
            {navLink(ROUTES.PLAYGROUND, t.nav.playground)}
            <Button
              variant="ghost"
              size="sm"
              style={{ justifyContent: 'flex-start' }}
              leftIcon={<BearIcons.SearchIcon size="sm" style={{ color: ICON_COLOR, marginRight: 6 }} />}
              onClick={() => { onOpenSearch(); setMobileOpen(false); }}
            >
              {t.commandPalette.open}
            </Button>
            <Flex direction="row" gap={2} align="center" style={{ marginTop: 8 }}>
              {iconGroup}
            </Flex>
          </Flex>
        </Flex>
      </Drawer>
    </header>
  );
}
