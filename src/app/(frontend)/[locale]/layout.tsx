import { AdminBar } from '@/_old/components/AdminBar';
import { CookiesBanner } from '@/components/advanced/cookies-banner/cookies-banner';
import { SkipLink } from '@/components/advanced/skip-link/skip-link';
import { clientEnv } from '@/config/env.client.config';
import { themes } from '@/config/themes.config';
import { FooterContainer } from '@/payload/blocks/layout/footer.container';
import { HeaderContainer } from '@/payload/blocks/layout/header.container';
import { Providers } from '@/providers';
import { getPreferences } from '@/utils/nextjs/headers';
import { toPageMetadata } from '@/utils/nextjs/metadata';
import { LocalizedRoute } from '@/utils/nextjs/types';
import { cn } from '@/utils/tailwind';
import { GoogleTagManager } from '@next/third-parties/google';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { draftMode } from 'next/headers';
import { ComponentProps, PropsWithChildren } from 'react';
import './globals.scss';

type LayoutProps = PropsWithChildren & LocalizedRoute;

const metadata = toPageMetadata();

const Layout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;
  const { isEnabled } = await draftMode();
  const { theme, fontSize, cookiesConsent } = await getPreferences();
  const providersProps: Omit<ComponentProps<typeof Providers>, 'children'> = {
    locale,
    initialTheme: theme,
    initialFontScale: fontSize,
    initialCookiesConsent: cookiesConsent,
  };

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      data-scale={fontSize}
      data-theme={theme}
      data-color-preference={themes[theme]._type}
      style={{ colorScheme: themes[theme]?._type }}
      className={cn(GeistSans.variable, GeistMono.variable)}
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
          <main className="flex-grow my-20 grid content-start gap-20" id="main">
            {children}
          </main>
          <FooterContainer locale={locale} />
          {!cookiesConsent && <CookiesBanner locale={locale} />}
        </Providers>
      </body>
    </html>
  );
};

export { metadata };
export default Layout;
