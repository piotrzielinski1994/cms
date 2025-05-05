import { clientEnv } from '@/config/env.client.config';
import bundleAnalyzer from '@next/bundle-analyzer';
import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const withNextIntl = createNextIntlPlugin('./src/config/next.routing.config.ts');
const nextConfig = {
  images: {
    remotePatterns: [clientEnv.publicUrl, 'https://placehold.co/**'].map((item) => {
      const url = new URL(item);
      return {
        hostname: url.hostname,
        protocol: url.protocol.replace(':', ''),
      } as RemotePattern;
    }),
    dangerouslyAllowSVG: true, // TODO: Remove this line and the "placehold.co" from `remotePatterns`
  },
  reactStrictMode: true,
  redirects: async () => {
    const internetExplorerRedirect = {
      destination: '/ie-incompatible.html',
      has: [{ type: 'header', key: 'user-agent', value: '(.*Trident.*)' /* all ie browsers */ }],
      permanent: false,
      source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
    };

    return [internetExplorerRedirect];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });
    return config;
  },
} satisfies NextConfig;

export default withBundleAnalyzer(withNextIntl(withPayload(nextConfig)));
