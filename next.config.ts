import { clientEnv } from '@/config/env.client.config';
import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const withNextIntl = createNextIntlPlugin('./src/config/next.routing.config.ts');
const nextConfig = {
  images: {
    remotePatterns: [clientEnv.publicUrl].map((item) => {
      const url = new URL(item);
      return {
        hostname: url.hostname,
        protocol: url.protocol.replace(':', ''),
      } as RemotePattern;
    }),
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

export default withNextIntl(withPayload(nextConfig));
