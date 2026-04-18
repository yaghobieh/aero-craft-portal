import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BearProvider } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';
import { App } from './App';
import { I18nContext, useI18nState } from './i18n/index';
import { AEROCRAFT_THEME } from './constants/theme.const';
import './styles/index.css';

function Root() {
  const i18n = useI18nState('en');
  return (
    <I18nContext.Provider value={i18n}>
      <BearProvider defaultMode="dark" theme={AEROCRAFT_THEME} persistPreference storageKey="ac-theme">
        <App />
      </BearProvider>
    </I18nContext.Provider>
  );
}

const el = document.getElementById('root');
if (!el) throw new Error('Root element not found');
createRoot(el).render(<StrictMode><Root /></StrictMode>);
