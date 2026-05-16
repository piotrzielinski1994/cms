import type { Product } from '@/payload.types';
import { rebuildPath, rebuildTag } from '@/utils/nextjs/rebuild';
import { isCollectionLocale } from '@/utils/payload';
import type { BasePayload, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

const findAggregatorPathForLocale = async (
  payload: BasePayload,
  locale: string,
): Promise<string | null> => {
  const { docs } = await payload.find({
    collection: 'pages',
    locale: 'all',
    overrideAccess: false,
    pagination: false,
    select: { path: true, aggregatorOf: true },
    where: { aggregatorOf: { equals: 'products' } },
  });
  if (docs.length === 0) return null;
  const path = (docs[0].path ?? {}) as Record<string, string>;
  return path[locale] ?? null;
};

const revalidateProductPath = async (payload: BasePayload, locale: string, slug: string) => {
  const aggregatorPath = await findAggregatorPathForLocale(payload, locale);
  if (!aggregatorPath) return;
  rebuildPath(`/${locale}${aggregatorPath}/${slug}` as Parameters<typeof rebuildPath>[0]);
  rebuildPath(`/${locale}${aggregatorPath}` as Parameters<typeof rebuildPath>[0]);
};

const revalidateProduct: CollectionAfterChangeHook<Product> = async ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate && isCollectionLocale(locale)) {
    const slug = typeof doc.slug === 'string' ? doc.slug : '';
    if (doc._status === 'published' && slug) {
      payload.logger.info(`Revalidating product "${slug}" for locale ${locale}`);
      await revalidateProductPath(payload, locale, slug);
      rebuildTag('sitemap');
    }

    const previousSlug = typeof previousDoc?.slug === 'string' ? previousDoc.slug : '';
    if (previousDoc?._status === 'published' && doc._status !== 'published' && previousSlug) {
      await revalidateProductPath(payload, locale, previousSlug);
      rebuildTag('sitemap');
    }
  }
  return doc;
};

const revalidateProductDelete: CollectionAfterDeleteHook<Product> = async ({
  doc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate && isCollectionLocale(locale)) {
    const slug = typeof doc.slug === 'string' ? doc.slug : '';
    if (slug) await revalidateProductPath(payload, locale, slug);
    rebuildTag('sitemap');
  }

  return doc;
};

export { revalidateProduct, revalidateProductDelete };
