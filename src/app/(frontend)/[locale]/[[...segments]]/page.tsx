import type { Metadata } from 'next';

import { PayloadRedirects } from '@/_old/components/PayloadRedirects';
import configPromise from '@/payload/payload.config';
import { draftMode } from 'next/headers';
import { getPayload, TypedLocale } from 'payload';
import { cache } from 'react';

import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import { LivePreviewListener } from '@/_old/components/LivePreviewListener';
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
    .filter((param) => param.slug !== '');

  return params;
}

type Args = {
  params: Promise<{
    segments?: string[];
    locale: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { segments, locale = 'en' } = await paramsPromise;
  const slug = segments?.at(-1) ?? '';
  const url = '/' + slug;

  const page = await queryPage({
    slug,
    locale,
  });

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  const { sections } = page;

  return (
    <main>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={sections} />
    </main>
  );
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = '', locale = 'en' } = await paramsPromise;
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
