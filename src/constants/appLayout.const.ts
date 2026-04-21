import { ROUTES } from './routes.const';

export function isAppMainFullBleed(pathname: string): boolean {
  return (
    pathname === ROUTES.STUDIO
    || pathname === ROUTES.PLAYGROUND
    || pathname === ROUTES.DOCS
    || pathname === ROUTES.DOCS_CATCHALL
    || pathname.startsWith('/docs/')
  );
}
