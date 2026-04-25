import { ROUTES } from '@const/routes.const';
import { PORTAL_NAV_LINK_ACTIVE, PORTAL_NAV_LINK_BASE } from '@const/portalShell.classes';

export function topNavLinkClassName(pathname: string, to: string): string {
  const onComponentPresets = pathname === ROUTES.DOCS_COMPONENT_PRESETS;
  const onDocs =
    pathname === ROUTES.DOCS ||
    (pathname.startsWith(`${ROUTES.DOCS}/`) && !onComponentPresets);

  if (to === ROUTES.HOME) {
    return pathname === ROUTES.HOME ? PORTAL_NAV_LINK_ACTIVE : PORTAL_NAV_LINK_BASE;
  }
  if (to === ROUTES.DOCS) {
    return onDocs ? PORTAL_NAV_LINK_ACTIVE : PORTAL_NAV_LINK_BASE;
  }
  if (to === ROUTES.COMPONENTS) {
    return pathname === ROUTES.COMPONENTS || pathname.startsWith(`${ROUTES.COMPONENTS}/`)
      ? PORTAL_NAV_LINK_ACTIVE
      : PORTAL_NAV_LINK_BASE;
  }
  if (to === ROUTES.STUDIO) {
    return pathname === ROUTES.STUDIO || pathname.startsWith(`${ROUTES.STUDIO}/`)
      ? PORTAL_NAV_LINK_ACTIVE
      : PORTAL_NAV_LINK_BASE;
  }
  if (to === ROUTES.PLAYGROUND) {
    return pathname === ROUTES.PLAYGROUND || pathname.startsWith(`${ROUTES.PLAYGROUND}/`)
      ? PORTAL_NAV_LINK_ACTIVE
      : PORTAL_NAV_LINK_BASE;
  }
  return PORTAL_NAV_LINK_BASE;
}
