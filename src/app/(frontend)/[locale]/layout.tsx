import type { Metadata } from 'next';

import { AdminBar } from '@/_old/components/AdminBar';
import { getServerSideURL } from '@/_old/utilities/getURL';
import { mergeOpenGraph } from '@/_old/utilities/mergeOpenGraph';
import { Footer } from '@/components/layout/footer/footer';
import { Header } from '@/components/layout/header/header';
import { Providers } from '@/providers';
import { getPreferences } from '@/utils/headers';
import { cn } from '@/utils/tailwind';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { draftMode } from 'next/headers';
import { TypedLocale } from 'payload';
import React from 'react';
import './globals.css';

type Args = {
  children: React.ReactNode;
  params: Promise<{
    locale: TypedLocale;
  }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};

export default async function RootLayout({ children, params }: Args) {
  const { isEnabled } = await draftMode();
  const { locale } = await params;
  const { theme, fontSize } = await getPreferences();

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      data-theme={theme}
      data-scale={fontSize}
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn('bg-background text-foreground', 'flex flex-col', 'min-h-[100vh]')}>
        <Providers initialTheme={theme} initialFontScale={fontSize}>
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <Header locale={locale} />
          <main className="flex-grow my-20 grid gap-20">{children}</main>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
