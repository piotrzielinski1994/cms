import type { Config } from '@/payload.types';
import configPromise from '@/payload/payload.config';
import { Locale } from 'next-intl';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

const getGlobal = async (slug: keyof Config['globals'], locale: Locale = 'en', depth = 1) => {
  const payload = await getPayload({ config: configPromise });
  return payload.findGlobal({ slug, depth, locale });
};

const getCachedGlobal = (slug: keyof Config['globals'], locale: Locale, depth = 1) => {
  const cacheConfig = { tags: [`global__${locale}_${slug}`] };
  return unstable_cache(() => getGlobal(slug, locale, depth), [slug, locale], cacheConfig);
};

export { getCachedGlobal };
