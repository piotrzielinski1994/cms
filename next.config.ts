import bundleAnalyzer from '@next/bundle-analyzer';
import { withPayload } from '@payloadcms/next/withPayload';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { pipe } from 'ramda';
import { z } from 'zod';
import { clientEnv } from '@/config/env.client.config';
import { serverEnv } from '@/config/env.server.config';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
const withNextIntl = createNextIntlPlugin('./src/config/next.routing.config.ts');
const withSentry = (config: NextConfig) => {
  return withSentryConfig(config, {
    org: serverEnv.sentry.org,
    project: serverEnv.sentry.project,
    widenClientFileUpload: true,
    webpack: {
      automaticVercelMonitors: true,
      reactComponentAnnotation: { enabled: true },
      treeshake: { removeDebugLogging: true },
    },
    silent: !clientEnv.sentryDsn,
    sourcemaps: { disable: true },
    telemetry: false,
  });
};

const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  // next 16's build-time type check doesn't yet support typescript@7 (crashes trying to
  // auto-install a "missing" tsc). Type safety is enforced via `tsc --noEmit` in the `ts`/`test` scripts.
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [clientEnv.publicUrl].map((item) => {
      const url = new URL(item);
      return {
        hostname: url.hostname,
        protocol: z.enum(['http', 'https']).parse(url.protocol.replace(':', '')),
      };
    }),
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [{ loader: '@svgr/webpack', options: { svgo: false } }],
        as: '*.js',
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });
    return config;
  },
} satisfies NextConfig;

export default pipe(withPayload, withNextIntl, withBundleAnalyzer, withSentry)(nextConfig);
