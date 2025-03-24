import { CollectionSlug, PayloadRequest } from 'payload';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  path?: string;
  req: PayloadRequest;
};

export const generatePreviewPath = ({ collection, slug, path }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: path ?? `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  });

  const url = `/next/preview?${encodedParams.toString()}`;

  return url;
};
