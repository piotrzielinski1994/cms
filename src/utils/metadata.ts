import { Metadata } from 'next';
import { optional } from './optional';

const toPageMetadata = (options: {
  title: string;
  description?: string;
  imageUrl?: string;
}): Metadata => {
  return {
    title: options.title,
    description: options.description,
    openGraph: {
      title: options.title,
      description: options.description,
      images: [optional(options.imageUrl, (url) => ({ url }))].filter((it) => it !== undefined),
    },
  };
};

export { toPageMetadata };
