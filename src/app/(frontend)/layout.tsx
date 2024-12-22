import type { Metadata } from 'next';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import React from 'react';
import { cn } from 'src/utilities/cn';

import { AdminBar } from '@/_old/components/AdminBar';
import { Footer } from '@/_old/Footer/Component';
import { Header } from '@/_old/Header/Component';
import { InitTheme } from '@/_old/providers/Theme/InitTheme';
import { mergeOpenGraph } from '@/_old/utilities/mergeOpenGraph';
import { Providers } from '@/providers';
import { draftMode } from 'next/headers';

import { getServerSideURL } from '@/_old/utilities/getURL';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
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
