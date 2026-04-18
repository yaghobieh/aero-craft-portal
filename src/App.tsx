import { Suspense, lazy } from 'react';
import { CompassProvider, Routes, useRoute } from '@forgedevstack/forge-compass/react';
import { Flex, Spinner } from '@forgedevstack/bear';
import { AppShell } from './components/AppShell';
import { Layout } from './components/Layout';
import { ROUTES, AEROCRAFT_VERSION } from './constants/routes.const';
import { MAX_CONTENT_WIDTH_PX } from './constants/numbers.const';
import { useI18n } from './i18n/index';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const DocsPage = lazy(() => import('./pages/Docs').then((m) => ({ default: m.DocsPage })));
const GetStartedRedirect = lazy(() =>
  import('./pages/GetStartedRedirect').then((m) => ({ default: m.GetStartedRedirect })),
);
const Changelog = lazy(() => import('./pages/Changelog').then((m) => ({ default: m.Changelog })));
const Studio = lazy(() => import('./pages/Studio').then((m) => ({ default: m.Studio })));

const routes = [
  { path: ROUTES.HOME, name: 'home', component: Home },
  { path: ROUTES.GET_STARTED, name: 'get-started-redirect', component: GetStartedRedirect },
  { path: ROUTES.DOCS, name: 'docs', component: DocsPage },
  { path: ROUTES.DOCS_CATCHALL, name: 'docs-catchall', component: DocsPage },
  { path: ROUTES.CHANGELOG, name: 'changelog', component: Changelog },
  { path: ROUTES.STUDIO, name: 'studio', component: Studio },
];

function PageLoader() {
  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: 320 }}>
      <Spinner size="lg" />
    </Flex>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <Flex
      direction="row"
      align="center"
      justify="between"
      style={{
        padding: '16px 24px',
        borderTop: '1px solid var(--bear-border-default)',
        backgroundColor: 'var(--bear-bg-secondary)',
        width: '100%',
      }}
    >
      <span style={{ fontSize: 12, color: 'var(--bear-text-muted)' }}>{t.footer.partOf}</span>
      <span style={{ fontSize: 12, color: 'var(--bear-text-muted)' }}>MIT · AeroCraft v{AEROCRAFT_VERSION}</span>
    </Flex>
  );
}

function AppContent() {
  const route = useRoute();
  const pathname = route?.path ?? '';
  const fullBleed =
    pathname === ROUTES.STUDIO
    || pathname === ROUTES.DOCS
    || pathname === ROUTES.DOCS_CATCHALL
    || pathname.startsWith('/docs/');

  return (
    <Layout>
      <AppShell>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', minHeight: 0 }}>
          <div
            style={{
              flex: 1,
              width: '100%',
              maxWidth: fullBleed ? '100%' : MAX_CONTENT_WIDTH_PX,
              margin: '0 auto',
              padding: fullBleed ? '16px 24px 24px' : '24px 24px 40px',
              boxSizing: 'border-box',
            }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes />
            </Suspense>
          </div>
          <Footer />
        </div>
      </AppShell>
    </Layout>
  );
}

export function App() {
  return (
    <CompassProvider routes={routes}>
      <AppContent />
    </CompassProvider>
  );
}
