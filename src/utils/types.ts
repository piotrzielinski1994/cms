import { Locale } from 'next-intl';

type LocalizedRoute<T = void> = {
  params: Promise<T & { locale: Locale }>;
};

export type { LocalizedRoute };
