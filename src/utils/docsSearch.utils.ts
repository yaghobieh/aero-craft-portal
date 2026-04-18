import { GROUP_ORDER } from '@forgedevstack/aerocraft';
import { ROUTES } from '../constants/routes.const';
import { flattenDocsNavForSearch } from '../constants/docsNavTree.const';
import { GUIDE_SLUGS, GUIDE_SLUG_TO_I18N } from '../constants/docsGuides.const';
import type { Messages } from '../i18n/types';
import type { SearchNavItem } from '../constants/docsNavTree.const';
import { docNavLabel } from './docLabel.utils';

export function buildDocsSearchIndex(t: Messages): SearchNavItem[] {
  const acc: SearchNavItem[] = [
    { href: ROUTES.HOME, label: t.nav.home, group: t.commandPalette.portalPages },
    { href: '/docs/getting-started', label: t.hero.ctaStart, group: t.nav.docs },
    { href: ROUTES.STUDIO, label: t.nav.studio, group: t.commandPalette.portalPages },
    { href: ROUTES.CHANGELOG, label: t.nav.changelog, group: t.commandPalette.portalPages },
    { href: ROUTES.DOCS, label: t.nav.docs, group: t.commandPalette.portalPages },
  ];

  for (const g of GROUP_ORDER) {
    acc.push({
      href: `/docs/${g}`,
      label: t.docs.groups[g as keyof typeof t.docs.groups] ?? g,
      group: t.docs.referenceLabel,
    });
  }

  for (const slug of GUIDE_SLUGS) {
    const key = GUIDE_SLUG_TO_I18N[slug];
    acc.push({
      href: `/docs/${slug}`,
      label: t.docs.guides[key].title,
      group: t.docs.guidesLabel,
    });
  }

  acc.push(...flattenDocsNavForSearch((p) => docNavLabel(t, p)));

  return acc;
}
