import { useState, type ReactNode } from 'react';
import { Button, Drawer, Flex, Typography, Badge, useBear, BearIcons, Dropdown } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { useI18n } from '@i18n/index';
import type { Locale } from '@i18n/types';
import { usePathname } from '@hooks/usePathname';
import {
  ROUTES,
  AEROCRAFT_GITHUB_URL,
  AEROCRAFT_NPM_URL,
  AEROCRAFT_VERSION,
} from '@const/routes.const';
import { portalBrand } from '@config/portal.config';
import {
  PORTAL_BEAR_FG,
  PORTAL_BRAND_LINK,
  PORTAL_DRAWER,
  PORTAL_DRAWER_ICONS,
  PORTAL_DRAWER_SEARCH,
  PORTAL_ICON_BTN,
  PORTAL_KBD,
  PORTAL_LOCALE_BTN,
  PORTAL_NAV_ACTIONS,
  PORTAL_NAV_MOBILE,
  PORTAL_NAV_RAIL,
  PORTAL_PREMIUM_BADGE,
  PORTAL_SEARCH_CHIP,
  PORTAL_TOP_INNER,
  PORTAL_TOP_SHELL,
  PORTAL_VERSION_BADGE,
} from '@const/portalShell.classes';
import { LOCALE_DISPLAY, TOP_NAV_ITEMS } from '@const/topNav.const';
import { topNavLinkClassName } from '@utils/navLinkActive.utils';

type TopNavbarProps = {
  onOpenSearch: () => void;
};

export function TopNavbar({ onOpenSearch }: TopNavbarProps) {
  const { t, locale, setLocale } = useI18n();
  const { toggleMode, mode } = useBear();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItem = (to: string, label: string, premium: boolean) => (
    <Link to={to} onClick={() => setMobileOpen(false)} key={to}>
      <Button variant="ghost" size="sm" className={topNavLinkClassName(pathname, to)}>
        <Flex align="center" justify="center" gap={2} className="w-full">
          <span>{label}</span>
          {premium && (
            <Badge variant="secondary" className={PORTAL_PREMIUM_BADGE}>
              {t.nav.premium}
            </Badge>
          )}
        </Flex>
      </Button>
    </Link>
  );

  const iconBtn = (icon: ReactNode, onClick: () => void, aria: string) => (
    <Button
      variant="ghost"
      size="sm"
      className={PORTAL_ICON_BTN}
      icon={icon}
      aria-label={aria}
      onClick={onClick}
    />
  );

  const localeItems = (Object.keys(LOCALE_DISPLAY) as Locale[]).map((loc) => {
    const code = LOCALE_DISPLAY[loc]?.code ?? loc.toUpperCase();
    const label = loc === 'en' ? t.nav.localeEn : t.nav.localeEs;
    return {
      key: loc,
      label: `${code} — ${label}`,
      onClick: () => setLocale(loc),
    };
  });

  const searchChip = (
    <Button
      variant="outline"
      size="sm"
      className={PORTAL_SEARCH_CHIP}
      leftIcon={<BearIcons.SearchIcon size="sm" className={PORTAL_BEAR_FG} />}
      onClick={() => {
        onOpenSearch();
        setMobileOpen(false);
      }}
      aria-label={t.commandPalette.open}
    >
      <span className={PORTAL_KBD} aria-hidden>
        {t.nav.searchShortcut} · ⌘K
      </span>
    </Button>
  );

  const iconGroup = (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={PORTAL_ICON_BTN}
        aria-label={t.hero.ctaStudio}
        onClick={() => window.open(ROUTES.STUDIO, '_self')}
      >
        ST
      </Button>
      {iconBtn(
        <BearIcons.PackageIcon size="sm" className={PORTAL_BEAR_FG} />,
        () => window.open(AEROCRAFT_NPM_URL, '_blank'),
        t.nav.openNpm,
      )}
      {iconBtn(
        <BearIcons.GithubIcon size="sm" className={PORTAL_BEAR_FG} />,
        () => window.open(AEROCRAFT_GITHUB_URL, '_blank'),
        t.nav.openGithub,
      )}
      <Dropdown
        trigger={(
          <Button
            variant="ghost"
            size="sm"
            className={PORTAL_LOCALE_BTN}
            leftIcon={<BearIcons.GlobeIcon size="sm" className={PORTAL_BEAR_FG} />}
          >
            {LOCALE_DISPLAY[locale]?.code ?? 'EN'}
          </Button>
        )}
        items={localeItems}
        placement="bottom-end"
        size="sm"
      />
      {iconBtn(
        mode === 'dark'
          ? <BearIcons.SunIcon size="sm" className={PORTAL_BEAR_FG} />
          : <BearIcons.MoonIcon size="sm" className={PORTAL_BEAR_FG} />,
        toggleMode,
        mode === 'dark' ? t.nav.themeLight : t.nav.themeDark,
      )}
    </>
  );

  return (
    <header className={PORTAL_TOP_SHELL}>
      <div className={PORTAL_TOP_INNER}>
        <Link to={ROUTES.HOME} className={PORTAL_BRAND_LINK}>
          <Flex direction="row" align="center" gap={3}>
            <img src="/logo-mark.svg" alt="" width={32} height={32} />
            <Typography variant="h6" weight="bold">AeroCraft</Typography>
            <Badge variant="info" className={PORTAL_VERSION_BADGE}>
              v
              {AEROCRAFT_VERSION}
            </Badge>
          </Flex>
        </Link>

        <div className={PORTAL_NAV_RAIL}>
          {TOP_NAV_ITEMS.map((item) => navItem(item.to, t.nav[item.label], item.premium))}
        </div>

        <div className={PORTAL_NAV_ACTIONS}>
          {searchChip}
          {iconGroup}
        </div>

        <Button
          variant="outline"
          size="sm"
          className={PORTAL_NAV_MOBILE}
          onClick={() => setMobileOpen(true)}
          icon={<BearIcons.Navigation.MenuIcon size="sm" className={PORTAL_BEAR_FG} />}
          aria-label={t.sidebar.menu}
        />
      </div>

      <Drawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} side="right" size="sm">
        <Flex direction="column" gap={2} className={PORTAL_DRAWER}>
          <Typography variant="caption" color="muted">{portalBrand.npmPackage}</Typography>
          <Flex direction="column" gap={1} align="stretch">
            {TOP_NAV_ITEMS.map((item) => navItem(item.to, t.nav[item.label], item.premium))}
            <Button
              variant="ghost"
              size="sm"
              className={PORTAL_DRAWER_SEARCH}
              leftIcon={<BearIcons.SearchIcon size="sm" className={PORTAL_BEAR_FG} />}
              onClick={() => {
                onOpenSearch();
                setMobileOpen(false);
              }}
            >
              {t.commandPalette.open}
            </Button>
            <Flex direction="row" gap={2} align="center" className={PORTAL_DRAWER_ICONS}>
              {iconGroup}
            </Flex>
          </Flex>
        </Flex>
      </Drawer>
    </header>
  );
}
