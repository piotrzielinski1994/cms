import { contentLocales } from '@/config/store/locales.config';
import { Locale } from 'next-intl';

const isCollectionLocale = (locale: Locale | 'all' | undefined): locale is Locale => {
  return contentLocales.includes(locale as Locale);
};

export { isCollectionLocale };
