import config from '@/payload/payload.config';
import { LocalizedRoute } from '@/utils/nextjs/types';
import { Locale } from 'next-intl';
import { getServerSideSitemap } from 'next-sitemap';
import { cacheTag } from 'next/cache';
import { getPayload } from 'payload';

const getSitemap = async (locale: Locale) => {
  'use cache';
  cacheTag('sitemap');
  const payload = await getPayload({ config });
  const results = await payload.find({
    collection: 'pages',
    locale,
    overrideAccess: false,
    draft: false,
    limit: 1000,
    pagination: false,
    where: { _status: { equals: 'published' } },
    select: {
      path: true,
      breadcrumbs: true,
      updatedAt: true,
    },
  });

  return results.docs.map((page) => ({
    loc: `/${locale}${page.path}`,
    lastmod: page.updatedAt,
  }));
};

export async function GET(_: Request, { params }: LocalizedRoute) {
  const { locale } = await params;
  const sitemap = await getSitemap(locale);
  return getServerSideSitemap(sitemap);
}
