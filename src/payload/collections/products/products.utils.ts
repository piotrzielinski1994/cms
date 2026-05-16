import payloadConfig from '@/payload/payload.config';
import { Locale } from 'next-intl';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import { cache } from 'react';

const getProducts = cache(async ({ locale }: { locale: Locale | 'all' } = { locale: 'all' }) => {
  const payload = await getPayload({ config: payloadConfig });
  return payload.find({
    collection: 'products',
    locale,
    draft: false,
    overrideAccess: false,
    pagination: false,
    where: {
      _status: { equals: 'published' },
    },
  });
});

const queryProduct = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config: payloadConfig });
  return payload
    .find({
      collection: 'products',
      draft,
      limit: 1,
      locale,
      overrideAccess: draft,
      where: {
        slug: { equals: slug },
      },
    })
    .then((it) => it.docs?.[0] ?? null);
});

export { getProducts, queryProduct };
