import { SkipLink } from '@/components/advanced/skip-link/skip-link';
import { clientEnv } from '@/config/env.client.config';
import { themes } from '@/config/themes.config';
import { AdminBar } from '@/payload/_old/components/AdminBar';
import { CookiesBannerContainer } from '@/payload/blocks/advanced/cookies-banner/cookies-banner.container';
import { FooterContainer } from '@/payload/blocks/layout/footer.container';
import { HeaderContainer } from '@/payload/blocks/layout/header.container';
import { Providers } from '@/providers';
import { getPreferences } from '@/utils/nextjs/headers';
import { toPageMetadata } from '@/utils/nextjs/metadata';
import { LocalizedRoute } from '@/utils/nextjs/types';
import { cn } from '@/utils/tailwind';
import { GoogleTagManager } from '@next/third-parties/google';
import { draftMode } from 'next/headers';
import { ComponentProps, PropsWithChildren } from 'react';
import './globals.scss';

type LayoutProps = PropsWithChildren & LocalizedRoute;

const metadata = toPageMetadata();

const Layout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;
  const { isEnabled } = await draftMode();
  const { colorPreference, theme, fontScale, cookiesConsent } = await getPreferences();
  const themeColorPreference = theme !== 'system' ? themes[theme].colorPreference : colorPreference;
  const providersProps: Omit<ComponentProps<typeof Providers>, 'children'> = {
    locale,
    theme,
    colorPreference,
    fontScale,
    cookiesConsent,
  };

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      data-scale={fontScale}
      data-theme={theme !== 'system' ? theme : colorPreference}
      data-color-preference={themeColorPreference}
      style={{ colorScheme: themeColorPreference }}
    >
      <head>
        {clientEnv.gtmId && cookiesConsent && <GoogleTagManager gtmId={clientEnv.gtmId} />}
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn('bg-background text-foreground', 'flex flex-col', 'min-h-[100vh]')}>
        <Providers {...providersProps}>
          <SkipLink />
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <HeaderContainer locale={locale} />
          <main
            className={cn('flex-grow my-20 grid content-start gap-20', 'outline-none')}
            id="main"
            tabIndex={-1} // skip link
          >
            {children}
          </main>
          <FooterContainer locale={locale} />
          {!cookiesConsent && <CookiesBannerContainer locale={locale} />}
        </Providers>
      </body>
    </html>
  );
};

export { metadata };
export default Layout;
