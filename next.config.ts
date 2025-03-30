import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const withNextIntl = createNextIntlPlugin('./src/payload/locale/request.ts');
const serverUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

const nextConfig = {
  images: {
    remotePatterns: [serverUrl].map((item) => {
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
