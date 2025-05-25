import { Locale } from 'next-intl';
import { revalidatePath, revalidateTag } from 'next/cache';
import { GlobalSlug } from 'payload';

const rebuildTag = (tag: `global__${Locale}__${GlobalSlug}` | 'sitemap'): void => {
  return revalidateTag(tag);
};

const rebuildPath = (path: `/${Locale}${string}`): void => {
  return revalidatePath(path);
};

export { rebuildPath, rebuildTag };
