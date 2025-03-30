import { clientEnv } from '@/config/env.client.config';
import { Metadata } from 'next';
import { optional } from './optional';

const toPageMetadata = (options: {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}): Metadata => {
  const title = options.title ?? clientEnv.siteName;
  return {
    title,
    description: options.description,
    openGraph: {
      url: options.url ?? clientEnv.publicUrl,
      siteName: clientEnv.siteName,
      title,
      description: options.description,
      images: [optional(options.imageUrl, (url) => ({ url }))].filter((it) => it !== undefined),
    },
  };
};

export { toPageMetadata };
