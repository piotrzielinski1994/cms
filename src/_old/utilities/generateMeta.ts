import type { Metadata } from 'next';

import type { Config, Image as Media, Page, Post } from '@/payload/payload.types';

import { getServerSideURL } from './getURL';
import { mergeOpenGraph } from './mergeOpenGraph';

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL();

  const url = serverUrl + '/website-template-OG.webp';

  // TODO: Replaced Media with Image type
  // if (image && typeof image === 'object' && 'url' in image) {
  //   const ogUrl = image.sizes?.og?.url;

  //   url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  // }

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(doc?.seo?.image);

  const title = doc?.seo?.title
    ? doc?.seo?.title + ' | Payload Website Template'
    : 'Payload Website Template';

  return {
    description: doc?.seo?.description,
    openGraph: mergeOpenGraph({
      description: doc?.seo?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  };
};
