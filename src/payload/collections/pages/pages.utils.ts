import payloadConfig from '@/payload/payload.config';
import { draftMode } from 'next/headers';
import { getPayload, TypedLocale } from 'payload';
import { cache } from 'react';

export const getPages = async () => {
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

export const queryPage = cache(async ({ path, locale }: { path: string; locale: TypedLocale }) => {
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
