import type { Locale } from 'next-intl';
import { contentLocales } from '@/config/store/locales.config';

const isCollectionLocale = (locale: Locale | 'all' | undefined): locale is Locale => {
  return contentLocales.includes(locale as Locale);
};

export { isCollectionLocale };
