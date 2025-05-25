import { Locale } from 'next-intl';

type LocalizedRoute<P = void> = {
  params: Promise<P & { locale: Locale }>;
};

export type { LocalizedRoute };
