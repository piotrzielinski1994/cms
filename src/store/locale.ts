import { contentLocales, defaultContentLocale } from '@/config/locales.config';
import { Locale, useLocale } from 'next-intl';

const useLocaleStore = (): Locale => {
  const locale = useLocale();
  return contentLocales.includes(locale) ? locale : defaultContentLocale;
};

export { useLocaleStore };
