import { CookiesBannerContainer as CookiesBanner } from '@/components/advanced/cookies-banner/cookies-banner.container';
import { getCachedGlobal } from '@/payload/utils/globals';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Locale } from 'next-intl';

type CookiesBannerContainerProps = {
  locale: Locale;
};

const CookiesBannerContainer = async ({ locale }: CookiesBannerContainerProps) => {
  const cookiesBanner = await getCachedGlobal('cookies-banner', locale)();
  return (
    <CookiesBanner
      content={<RichText data={cookiesBanner.content} />}
      readMore={cookiesBanner.readMore}
      accept={cookiesBanner.accept}
    />
  );
};

export { CookiesBannerContainer };
