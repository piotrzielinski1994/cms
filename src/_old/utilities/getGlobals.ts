import type { Config } from '@/payload/payload.types';

import configPromise from '@/payload/payload.config';
import { unstable_cache } from 'next/cache';
import { getPayload, TypedLocale } from 'payload';

type Global = keyof Config['globals'];

async function getGlobal(slug: Global, locale: TypedLocale = 'en', depth = 0) {
  const payload = await getPayload({ config: configPromise });
  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
  });

  return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, locale: TypedLocale, depth = 0) => {
  return unstable_cache(async () => getGlobal(slug, locale, depth), [slug, locale], {
    tags: [`global_${locale}_${slug}`],
  });
};
