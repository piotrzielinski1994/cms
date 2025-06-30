import { clientEnv } from '@/config/env.client.config';
import { serverEnv } from '@/config/env.server.config';
import bundleAnalyzer from '@next/bundle-analyzer';
import { withPayload } from '@payloadcms/next/withPayload';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { z } from 'zod';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
const withNextIntl = createNextIntlPlugin('./src/config/next.routing.config.ts');
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [clientEnv.publicUrl].map((item) => {
      const url = new URL(item);
      return {
        hostname: url.hostname,
        protocol: z.enum(['http', 'https']).parse(url.protocol.replace(':', '')),
      };
    }),
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });
    return config;
  },
} satisfies NextConfig;

export default withSentryConfig(withBundleAnalyzer(withNextIntl(withPayload(nextConfig))), {
  org: serverEnv.sentry.org,
  project: serverEnv.sentry.project,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: {
    disable: true,
  },
});
