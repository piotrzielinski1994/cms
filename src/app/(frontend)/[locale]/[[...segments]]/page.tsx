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
import { Locale } from 'next-intl';
import { draftMode } from 'next/headers';
import { toPairs } from 'ramda';
import { PageClient } from './page.client';

type PathPerLocale = Record<Locale, string>;
type PageProps = {
  params: Promise<{
    locale: Locale;
    segments?: string[];
  }>;
};

const generateStaticParams = async () => {
  const pages = await getPages();
  return pages.docs
    .flatMap((it) =>
      toPairs((it.path ?? {}) as PathPerLocale).map(([locale, path]) => ({ locale, path })),
    )
    .map(({ locale, path }) => ({ locale, segments: path.split('/').filter(Boolean) }));
};

const generateMetadata = async ({ params: paramsPromise }: PageProps): Promise<Metadata> => {
  const { segments = [], locale } = await paramsPromise;
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
