import type { Config } from '@/payload/payload.types';

import configPromise from '@/payload/payload.config';
import { unstable_cache } from 'next/cache';
import { getPayload, TypedLocale } from 'payload';

type Global = keyof Config['globals'];

async function getGlobal(slug: Global, locale: TypedLocale = 'en', depth = 1) {
  const payload = await getPayload({ config: configPromise });
  return payload.findGlobal({ slug, depth, locale });
}

export const getCachedGlobal = (slug: Global, locale: TypedLocale, depth = 1) => {
  const cacheConfig = { tags: [`global__${locale}_${slug}`] };
  return unstable_cache(() => getGlobal(slug, locale, depth), [slug, locale], cacheConfig);
};
