import { env } from '@/config/env.config';
import { Metadata } from 'next';
import { optional } from './optional';

const toPageMetadata = (options: {
  title?: string;
  description?: string;
  imageUrl?: string;
}): Metadata => {
  const title = options.title ?? env.pageTitle;
  return {
    title,
    description: options.description,
    openGraph: {
      title,
      description: options.description,
      images: [optional(options.imageUrl, (url) => ({ url }))].filter((it) => it !== undefined),
    },
  };
};

export { toPageMetadata };
