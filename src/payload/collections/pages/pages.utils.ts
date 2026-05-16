import payloadConfig from '@/payload/payload.config';
import { Locale } from 'next-intl';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import { cache } from 'react';

type AggregatorOf = 'products' | 'checkout';

const getPages = async () => {
  const payload = await getPayload({ config: payloadConfig });
  return payload.find({
    collection: 'pages',
    locale: 'all',
    draft: false,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      breadcrumbs: true,
      path: true,
    },
  });
};

const queryPage = cache(async ({ path, locale }: { path: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode();
  const slug = path.split('/').at(-1) ?? '';

  const payload = await getPayload({ config: payloadConfig });
  const page = await payload
    .find({
      collection: 'pages',
      draft,
      limit: 1,
      locale,
      overrideAccess: draft,
      where: {
        'breadcrumbs.url': { equals: path },
        slug: { equals: slug },
      },
    })
    .then((it) => it.docs?.[0]);

  if (!page) {
    return { page: null, pathPerLocale: {} };
  }

  const pathPerLocale = await payload
    .find({
      collection: 'pages',
      draft,
      limit: 1,
      locale: 'all',
      overrideAccess: draft,
      select: {
        breadcrumbs: true,
        path: true,
      },
      where: {
        id: { equals: page.id },
      },
    })
    .then((it) => it.docs?.[0].path ?? {});

  return { page, pathPerLocale };
});

const findAggregatorPage = cache(async ({ aggregatorOf }: { aggregatorOf: AggregatorOf }) => {
  const payload = await getPayload({ config: payloadConfig });
  const { docs } = await payload.find({
    collection: 'pages',
    locale: 'all',
    draft: false,
    overrideAccess: false,
    pagination: false,
    select: {
      path: true,
      aggregatorOf: true,
    },
    where: {
      aggregatorOf: { equals: aggregatorOf },
    },
  });

  if (docs.length === 0) return null;
  if (docs.length > 1) {
    throw new Error(`Multiple aggregator pages for "${aggregatorOf}" — expected at most one`);
  }
  return { pathPerLocale: (docs[0].path ?? {}) as Record<Locale, string> };
});

export { findAggregatorPage, getPages, queryPage };
