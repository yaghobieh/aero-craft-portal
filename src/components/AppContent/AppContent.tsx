import { Suspense } from 'react';
import { Routes, useRoute } from '@forgedevstack/forge-compass/react';
import { AppShell } from '../AppShell';
import { Layout } from '../Layout';
import { isAppMainFullBleed } from '@const/appLayout.const';
import { PageLoader } from '../PageLoader';
import { AppFooter } from '../AppFooter';

export function AppContent() {
  const route = useRoute();
  const pathname = route?.path ?? '';
  const fullBleed = isAppMainFullBleed(pathname);

  return (
    <Layout>
      <AppShell>
        <div className="ac-app-root-column">
          <div className={fullBleed ? 'ac-app-main ac-app-main--bleed' : 'ac-app-main ac-app-main--constrained'}>
            <Suspense fallback={<PageLoader />}>
              <Routes />
            </Suspense>
          </div>
          <AppFooter />
        </div>
      </AppShell>
    </Layout>
  );
}
