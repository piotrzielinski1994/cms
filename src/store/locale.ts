import { Locale } from '@/config/locales.config';
import { useLocale } from 'next-intl';

const useLocaleStore = () => {
  return useLocale() as Locale;
};

export { useLocaleStore };
