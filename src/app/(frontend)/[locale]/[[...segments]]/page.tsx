import type { Metadata } from 'next';

import { RenderBlocks } from '@/components/sections/block';
import { clientEnv } from '@/config/env.client.config';
import { LivePreviewListener } from '@/payload/_old/components/LivePreviewListener';
import { PayloadRedirects } from '@/payload/_old/components/PayloadRedirects';
import { getPages, queryPage } from '@/payload/collections/pages/pages.utils';
import { Image } from '@/payload/payload.types';
import { toPageMetadata } from '@/utils/nextjs/metadata';
import { LocalizedRoute } from '@/utils/nextjs/types';
import { optional } from '@/utils/optional';
import { toPath } from '@/utils/url';
import { Locale } from 'next-intl';
import { draftMode } from 'next/headers';
import { toPairs } from 'ramda';
import { PageClient } from './page.client';

type PathPerLocale = Record<Locale, string>;
type PageProps = LocalizedRoute<{ segments?: string[] }>;

const generateStaticParams = async () => {
  const pages = await getPages();
  return pages.docs
    .flatMap((it) =>
      toPairs((it.path ?? {}) as PathPerLocale).map(([locale, path]) => ({ locale, path })),
    )
    .map(({ locale, path }) => ({ locale, segments: path.split('/').filter(Boolean) }));
};

const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { segments = [], locale } = await params;
  const path = toPath(segments);
  const { page } = await queryPage({ path, locale });

  return toPageMetadata({
    url: `${clientEnv.publicUrl}${path}`,
    title: page?.seo?.title ?? page?.title,
    description: page?.seo?.description ?? '',
    imageUrl: optional(page?.seo?.image as Image, (image) => `${clientEnv.publicUrl}${image.url}`),
  });
};

const Page = async ({ params: paramsPromise }: PageProps) => {
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
};

export { generateMetadata, generateStaticParams };
export default Page;
