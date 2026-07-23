import { revalidatePath, revalidateTag } from 'next/cache';
import type { Locale } from 'next-intl';
import type { GlobalRevalidationTag } from '@/payload/utils/globals';

const rebuildTag = (tag: GlobalRevalidationTag | 'sitemap' | 'redirects'): void => {
  return revalidateTag(tag, 'max');
};

const rebuildPath = (path: `/${Locale}${string}`): void => {
  return revalidatePath(path);
};

export { rebuildPath, rebuildTag };
