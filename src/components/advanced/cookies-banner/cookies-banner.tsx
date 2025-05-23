import { getCachedGlobal } from '@/payload/utils/globals';
import { Locale } from 'next-intl';
import { CookiesBannerClient } from './cookies-banner.client';

type CookiesBannerProps = {
  locale: Locale;
};

const CookiesBanner = async ({ locale }: CookiesBannerProps) => {
  const cookiesBanner = await getCachedGlobal('cookies-banner', locale)();
  return <CookiesBannerClient data={cookiesBanner} />;
};

export { CookiesBanner };
