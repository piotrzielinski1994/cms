import { AdminBar } from '@/_old/components/AdminBar';
import { SkipLink } from '@/components/basic/skip-link';
import { Footer } from '@/components/layout/footer/footer';
import { Header } from '@/components/layout/header/header';
import { clientEnv } from '@/config/env.client.config';
import { themes } from '@/config/themes.config';
import { Providers } from '@/providers';
import { getPreferences } from '@/utils/headers';
import { toPageMetadata } from '@/utils/metadata';
import { cn } from '@/utils/tailwind';
import { GoogleTagManager } from '@next/third-parties/google';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Locale } from 'next-intl';
import { draftMode } from 'next/headers';
import { PropsWithChildren } from 'react';
import './globals.css';

type LayoutProps = PropsWithChildren & {
  params: Promise<{ locale: Locale }>;
};

const metadata = toPageMetadata();

const Layout = async ({ children, params }: LayoutProps) => {
  const { isEnabled } = await draftMode();
  const { locale } = await params;
  const { theme, fontSize } = await getPreferences();

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      data-theme={theme}
      data-scale={fontSize}
      style={{ colorScheme: themes[theme]?._type }}
      className={cn(GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {clientEnv.gtmId && <GoogleTagManager gtmId={clientEnv.gtmId} />}
      </head>
      <body className={cn('bg-background text-foreground', 'flex flex-col', 'min-h-[100vh]')}>
        <Providers locale={locale} initialTheme={theme} initialFontScale={fontSize}>
          <SkipLink />
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <Header locale={locale} />
          <main className="flex-grow my-20 grid gap-20" id="main">
            {children}
          </main>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
};

export { metadata };
export default Layout;
