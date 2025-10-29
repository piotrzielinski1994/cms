import { Locale } from 'next-intl';

type LocalizedRoute<P = {}> = {
  params: Promise<P & { locale: Locale }>;
};

export type { LocalizedRoute };
