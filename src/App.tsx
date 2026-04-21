import { CompassProvider } from '@forgedevstack/forge-compass/react';
import { AppContent } from './components/AppContent';
import { COMPASS_ROUTES } from './routes/compassRoutes';

export function App() {
  return (
    <CompassProvider routes={COMPASS_ROUTES}>
      <AppContent />
    </CompassProvider>
  );
}
