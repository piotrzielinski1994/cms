import { getCachedGlobal } from '@/payload/utils/globals';
import { Locale } from 'next-intl';
import { CookiesBannerClient } from './cookies-banner.client';

type CookiesBannerProps = {
  locale: Locale;
};

const CookiesBanner = async ({ locale }: CookiesBannerProps) => {
  const cookiesBanner = await getCachedGlobal('header', locale)();
  return <CookiesBannerClient cookiesBanner={cookiesBanner} />;
};

export { CookiesBanner };
