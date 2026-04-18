import { createContext, useContext, useState, useCallback } from 'react';
import type { Locale, Messages } from './types';
import { en } from './en';
import { es } from './es';

const MESSAGES: Record<Locale, Messages> = { en, es };
const STORAGE_KEY = 'ac-locale';

interface I18nContextValue {
  locale: Locale;
  t: Messages;
  setLocale: (l: Locale) => void;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: en,
  setLocale: () => {},
});

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}

export function useI18nState(initial: Locale = 'en'): I18nContextValue {
  const stored =
    typeof localStorage !== 'undefined'
      ? (localStorage.getItem(STORAGE_KEY) as Locale | null)
      : null;

  const resolved: Locale = stored === 'en' || stored === 'es' ? stored : initial;
  const [locale, setLocaleState] = useState<Locale>(resolved);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
    }
  }, []);

  return { locale, t: MESSAGES[locale], setLocale };
}

export type { Locale, Messages };
