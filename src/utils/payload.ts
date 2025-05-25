import { contentLocales } from '@/config/locales.config';
import { Locale } from 'next-intl';

const isLocale = (locale: Locale | 'all' | undefined): locale is Locale => {
  return contentLocales.includes(locale as Locale);
};

export { isLocale };
