import { lazy } from 'react';
import { ROUTES } from '../constants/routes.const';

const Home = lazy(() => import('../pages/Home').then((m) => ({ default: m.Home })));
const DocsPage = lazy(() => import('../pages/Docs').then((m) => ({ default: m.DocsPage })));
const GetStartedRedirect = lazy(() =>
  import('../pages/GetStartedRedirect').then((m) => ({ default: m.GetStartedRedirect })),
);
const Studio = lazy(() => import('../pages/Studio').then((m) => ({ default: m.Studio })));
const PlaygroundPage = lazy(() =>
  import('../pages/Playground').then((m) => ({ default: m.PlaygroundPage })),
);
const ComponentsPage = lazy(() =>
  import('../pages/Components').then((m) => ({ default: m.ComponentsPage })),
);

export const COMPASS_ROUTES = [
  { path: ROUTES.HOME, name: 'home', component: Home },
  { path: ROUTES.GET_STARTED, name: 'get-started-redirect', component: GetStartedRedirect },
  { path: ROUTES.COMPONENTS, name: 'components', component: ComponentsPage },
  { path: ROUTES.DOCS, name: 'docs', component: DocsPage },
  { path: ROUTES.DOCS_CATCHALL, name: 'docs-catchall', component: DocsPage },
  { path: ROUTES.STUDIO, name: 'studio', component: Studio },
  { path: ROUTES.PLAYGROUND, name: 'playground', component: PlaygroundPage },
];
