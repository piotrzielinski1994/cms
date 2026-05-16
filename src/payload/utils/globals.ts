import type { Config } from '@/payload.types';
import configPromise from '@/payload/payload.config';
import { Locale } from 'next-intl';
import { unstable_cache } from 'next/cache';
import { getPayload, GlobalSlug } from 'payload';

type GlobalRevalidationTag = `global__${Locale}__${GlobalSlug}`;
type CacheConfig = {
  tags: GlobalRevalidationTag[];
};

const getGlobal = async <T extends GlobalSlug>(
  slug: T,
  locale: Locale,
  depth = 1,
): Promise<Config['globals'][T]> => {
  const payload = await getPayload({ config: configPromise });
  return payload.findGlobal({ slug, depth, locale });
};

const getCachedGlobal = <T extends GlobalSlug>(slug: T, locale: Locale, depth = 1) => {
  const cacheConfig: CacheConfig = { tags: [`global__${locale}__${slug}`] };
  return unstable_cache(() => getGlobal<T>(slug, locale, depth), [slug, locale], cacheConfig);
};

export { getCachedGlobal, type GlobalRevalidationTag };
