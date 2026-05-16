import type { Config } from '@/payload.types';
import configPromise from '@/payload/payload.config';
import { Locale } from 'next-intl';
import { cacheTag } from 'next/cache';
import { getPayload, GlobalSlug } from 'payload';

type GlobalRevalidationTag = `global__${Locale}__${GlobalSlug}`;

const getGlobal = async <T extends GlobalSlug>(
  slug: T,
  locale: Locale,
  depth = 1,
): Promise<Config['globals'][T]> => {
  const payload = await getPayload({ config: configPromise });
  return payload.findGlobal({ slug, depth, locale });
};

const getCachedGlobal = <T extends GlobalSlug>(slug: T, locale: Locale, depth = 1) => {
  return async () => {
    'use cache';
    cacheTag(`global__${locale}__${slug}`);
    return getGlobal<T>(slug, locale, depth);
  };
};

export { getCachedGlobal, type GlobalRevalidationTag };
