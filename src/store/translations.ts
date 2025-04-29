import { customTranslations } from '@/config/locales.config';
import { useLocaleStore } from './locale';

const useTranslationsStore = () => {
  const locale = useLocaleStore();
  return customTranslations[locale].frontend;
};

export { useTranslationsStore };
