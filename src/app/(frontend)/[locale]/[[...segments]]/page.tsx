import type { Metadata } from 'next';

import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import { LivePreviewListener } from '@/_old/components/LivePreviewListener';
import { PayloadRedirects } from '@/_old/components/PayloadRedirects';
import { clientEnv } from '@/config/env.client.config';
import { getPages, queryPage } from '@/payload/collections/pages/pages.utils';
import { Image } from '@/payload/payload.types';
import { toPageMetadata } from '@/utils/metadata';
import { optional } from '@/utils/optional';
import { toPath } from '@/utils/url';
import { draftMode } from 'next/headers';
import { TypedLocale } from 'payload';
import PageClient from './page.client';

type PageProps = {
  params: Promise<{
    segments?: string[];
    locale: TypedLocale;
  }>;
};

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.docs
    .flatMap((it) => Object.entries(it.path ?? {}).map(([locale, path]) => ({ locale, path })))
    .map(({ locale, path }) => ({ locale, segments: path.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { segments = [], locale } = await paramsPromise;
  const path = toPath(segments);
  const { page } = await queryPage({ path, locale });

  return toPageMetadata({
    url: `${clientEnv.publicUrl}${path}`,
    title: page?.seo?.title ?? page?.title,
    description: page?.seo?.description ?? '',
    imageUrl: optional(page?.seo?.image as Image, (image) => `${clientEnv.publicUrl}${image.url}`),
  });
}

export default async function Page({ params: paramsPromise }: PageProps) {
  const { isEnabled: draft } = await draftMode();
  const { segments = [], locale } = await paramsPromise;
  const path = toPath(segments);
  const { page, pathPerLocale } = await queryPage({ path, locale });

  if (!page) {
    return <PayloadRedirects url={path} />;
  }

  return (
    <>
      <PageClient currentPaths={pathPerLocale} />
      <PayloadRedirects disableNotFound url={path} />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page.sections!} />
    </>
  );
}
