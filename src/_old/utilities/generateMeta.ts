import { clientEnv } from '@/config/env.client.config';
import type { Config, Image, Page, Post } from '@/payload.types';
import type { Metadata } from 'next';
import { mergeOpenGraph } from './mergeOpenGraph';

const getImageURL = (image?: Image | Config['db']['defaultIDType'] | null) => {
  const imagePath = (image as Image)?.url ?? '';
  return `${clientEnv.publicUrl}${imagePath}`;
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
