import type { Metadata } from 'next';

import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import { LivePreviewListener } from '@/_old/components/LivePreviewListener';
import { PayloadRedirects } from '@/_old/components/PayloadRedirects';
import { env } from '@/config/env.config';
import { getPages, queryPage } from '@/payload/collections/pages/pages.utils';
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
  const { page } = await queryPage({ path: toPath(segments), locale });

  if (!page) throw new Error('Page not found');

  return {
    title: page.seo?.title ?? page.title,
    description: page.seo?.description,
    openGraph: optional(page.seo, (seo) => ({
      title: seo.title ?? page.title,
      description: seo.description ?? '',
      images: [{ url: optional(seo.image, (it) => `${env.publicUrl}${it}`) ?? '' }],
    })),
  };
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
