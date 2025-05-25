import { GlobalRevalidationTag } from '@/payload/utils/globals';
import { Locale } from 'next-intl';
import { revalidatePath, revalidateTag } from 'next/cache';

const rebuildTag = (tag: GlobalRevalidationTag | 'sitemap'): void => {
  return revalidateTag(tag);
};

const rebuildPath = (path: `/${Locale}${string}`): void => {
  return revalidatePath(path);
};

export { rebuildPath, rebuildTag };
