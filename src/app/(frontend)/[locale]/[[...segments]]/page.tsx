import type { Metadata } from 'next';

import { RenderBlocks } from '@/components/sections/block';
import { clientEnv } from '@/config/env.client.config';
import { Product } from '@/features/checkout/components/sections/product/product';
import { LivePreviewListener } from '@/payload/_old/components/LivePreviewListener';
import { PayloadRedirects } from '@/payload/_old/components/PayloadRedirects';
import { findAggregatorPage, getPages, queryPage } from '@/payload/collections/pages/pages.utils';
import { getProducts, queryProduct } from '@/payload/collections/products/products.utils';
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

const splitProductSegments = async (segments: string[], locale: Locale) => {
  if (segments.length === 0) return null;
  const aggregator = await findAggregatorPage({ aggregatorOf: 'products' });
  if (!aggregator) return null;
  const aggregatorPath = aggregator.pathPerLocale[locale];
  if (!aggregatorPath) return null;
  const expectedPrefix = aggregatorPath.split('/').filter(Boolean);
  const prefix = segments.slice(0, -1);
  const slug = segments.at(-1) ?? '';
  if (prefix.join('/') !== expectedPrefix.join('/')) return null;
  return { slug };
};

const generateStaticParams = async () => {
  const pages = await getPages();
  const pageParams = pages.docs
    .flatMap((it) =>
      toPairs((it.path ?? {}) as PathPerLocale).map(([locale, path]) => ({ locale, path })),
    )
    .map(({ locale, path }) => ({ locale, segments: path.split('/').filter(Boolean) }));

  const aggregator = await findAggregatorPage({ aggregatorOf: 'products' });
  if (!aggregator) return pageParams;

  const { docs: products } = await getProducts({ locale: 'all' });
  const productParams = products.flatMap((doc) => {
    const slug = doc.slug;
    if (typeof slug !== 'string') return [];
    return toPairs(aggregator.pathPerLocale).map(([locale, aggregatorPath]) => ({
      locale,
      segments: [...aggregatorPath.split('/').filter(Boolean), slug],
    }));
  });

  return [...pageParams, ...productParams];
};

const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { segments = [], locale } = await params;
  const path = toPath(segments);
  const { page } = await queryPage({ path, locale });

  if (page) {
    return toPageMetadata({
      url: `${clientEnv.publicUrl}${path}`,
      title: page.seo?.title ?? page.title,
      description: page.seo?.description ?? '',
      imageUrl: optional(page.seo?.image as Image, (image) => `${clientEnv.publicUrl}${image.url}`),
    });
  }

  const productSegments = await splitProductSegments(segments, locale);
  if (!productSegments) return {};
  const product = await queryProduct({ slug: productSegments.slug, locale });
  if (!product) return {};

  return toPageMetadata({
    url: `${clientEnv.publicUrl}${path}`,
    title: product.meta?.title ?? product.title,
    description: product.meta?.description ?? '',
    imageUrl: optional(product.meta?.image as Image, (image) => `${clientEnv.publicUrl}${image.url}`),
  });
};

const Page = async ({ params: paramsPromise }: PageProps) => {
  const { isEnabled: draft } = await draftMode();
  const { segments = [], locale } = await paramsPromise;
  const path = toPath(segments);
  const { page, pathPerLocale } = await queryPage({ path, locale });

  if (page) {
    return (
      <>
        <PageClient currentPaths={pathPerLocale} />
        <PayloadRedirects disableNotFound url={path} />
        {draft && <LivePreviewListener />}
        <RenderBlocks blocks={page.sections!} />
      </>
    );
  }

  const productSegments = await splitProductSegments(segments, locale);
  if (productSegments) {
    const product = await queryProduct({ slug: productSegments.slug, locale });
    if (product) {
      return (
        <>
          {draft && <LivePreviewListener />}
          <Product product={product} />
        </>
      );
    }
  }

  return <PayloadRedirects url={path} />;
};

export { generateMetadata, generateStaticParams };
export default Page;
