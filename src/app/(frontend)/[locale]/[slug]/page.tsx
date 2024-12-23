import type { Metadata } from 'next';

import { PayloadRedirects } from '@/_old/components/PayloadRedirects';
import { homeStatic } from '@/_old/seed/home-static';
import configPromise from '@/payload/payload.config';
import { draftMode } from 'next/headers';
import { getPayload, TypedLocale } from 'payload';
import { cache } from 'react';

import type { Page as PageType } from '@/payload/payload.types';

import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import { LivePreviewListener } from '@/_old/components/LivePreviewListener';
import { RenderHero } from '@/_old/heros/RenderHero';
import { generateMeta } from '@/_old/utilities/generateMeta';
import PageClient from './page.client';

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    locale: 'all',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      localizedSlugs: true,
    },
  });
  const params = pages.docs
    ?.flatMap(({ localizedSlugs }) => Object.values(localizedSlugs ?? {}).map((slug) => ({ slug })))
    .filter((param) => param.slug !== 'home');

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
    locale: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home', locale = 'en' } = await paramsPromise;
  const url = '/' + slug;

  let page: PageType | null;

  page = await queryPage({
    slug,
    locale,
  });

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic;
  }

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  const { hero, layout } = page;

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  );
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home', locale = 'en' } = await paramsPromise;
  const page = await queryPage({
    slug,
    locale,
  });

  return generateMeta({ doc: page });
}

const queryPage = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

// const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
//   const { isEnabled: draft } = await draftMode();

//   const payload = await getPayload({ config: configPromise });

//   const locales =
//     payload.config.localization === false
//       ? []
//       : payload.config.localization.locales.map((locale) => locale.code);
//   const result = await payload.find({
//     collection: 'pages',
//     draft,
//     limit: 1,
//     pagination: false,
//     overrideAccess: draft,
//     where: {
//       or: [
//         { slug: { equals: slug } },
//         ...locales.map((locale) => ({ [`slug.${locale}`]: { equals: slug } })),
//       ],
//     },
//   });

//   return result.docs?.[0] || null;
// });
