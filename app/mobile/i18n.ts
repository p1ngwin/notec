// (root)/src/lib/i18n.ts
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import sl from '../public/locales/sl/common.json';
import en from '../public/locales/en/common.json';

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? 'sl';

export const i18n = new I18n({
  sl: sl,
  en: en,
});

i18n.locale = 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
