import { useLocale } from 'next-intl';
import { TypedLocale } from 'payload';

const useLocaleStore = () => {
  return useLocale() as TypedLocale;
};

export { useLocaleStore };
