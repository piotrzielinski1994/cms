import type { Metadata } from 'next';

import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import { LivePreviewListener } from '@/_old/components/LivePreviewListener';
import { PayloadRedirects } from '@/_old/components/PayloadRedirects';
import { generateMeta } from '@/_old/utilities/generateMeta';
import configPromise from '@/payload/payload.config';
import { draftMode } from 'next/headers';
import { getPayload, TypedLocale } from 'payload';
import { cache } from 'react';
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
      breadcrumbs: true,
      path: true,
    },
  });

  return pages.docs
    .flatMap((it) => Object.entries(it.path ?? {}).map(([locale, path]) => ({ locale, path })))
    .map(({ locale, path }) => ({ locale, segments: path.split('/').filter(Boolean) }));
}

type Args = {
  params: Promise<{
    segments?: string[];
    locale: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { segments = [], locale } = await paramsPromise;
  const url = `/${segments.join('/')}`;
  const page = await queryPage({ url, locale });

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  return (
    <>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={page.sections} />
    </>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { segments = [], locale } = await paramsPromise;
  const page = await queryPage({ url: `/${segments.join('/')}`, locale });

  return generateMeta({ doc: page });
}

const queryPage = cache(async ({ url, locale }: { url: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode();
  const slug = url.split('/').at(-1) ?? '';

  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    where: {
      'breadcrumbs.url': { equals: url },
      slug: { equals: slug },
    },
  });

  return result.docs?.[0] || null;
});
