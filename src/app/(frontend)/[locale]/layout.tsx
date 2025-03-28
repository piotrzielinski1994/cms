import type { Metadata } from 'next';

import { cn } from '@/_old/utilities/ui';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import React from 'react';

import { AdminBar } from '@/_old/components/AdminBar';
import { Providers } from '@/_old/providers';
import { InitTheme } from '@/_old/providers/Theme/InitTheme';
import { mergeOpenGraph } from '@/_old/utilities/mergeOpenGraph';
import { Footer } from '@/components/layout/footer/footer';
import { Header } from '@/components/layout/header/header';
import { draftMode } from 'next/headers';

import { getServerSideURL } from '@/_old/utilities/getURL';
import { NextIntlClientProvider } from 'next-intl';
import { TypedLocale } from 'payload';
import './globals.css';

type Args = {
  children: React.ReactNode;
  params: Promise<{
    locale: TypedLocale;
  }>;
};

export default async function RootLayout({ children, params }: Args) {
  const { isEnabled } = await draftMode();

  const { locale } = await params;

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn('bg-background text-foreground', 'flex flex-col', 'min-h-[100vh]')}>
        <NextIntlClientProvider>
          <Providers>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header locale={locale} />
            <main className="flex-grow my-20 grid gap-20">{children}</main>
            <Footer locale={locale} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};
