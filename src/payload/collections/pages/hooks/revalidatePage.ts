import type { Page } from '@/payload.types';
import { rebuildPath, rebuildTag } from '@/utils/next';
import { isLocale } from '@/utils/payload';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published' && isLocale(locale)) {
      const path: Parameters<typeof rebuildPath>[0] =
        `/${locale}${doc.breadcrumbs!.at(-1)?.url ?? '/'}`;
      payload.logger.info(`Revalidating page at path: ${path}`);

      rebuildPath(path);
      rebuildTag(`global__${locale}__header`);
      rebuildTag(`global__${locale}__footer`);
      rebuildTag('sitemap');
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/${locale}${previousDoc.breadcrumbs!.at(-1)?.url ?? '/'}`;

      payload.logger.info(`Revalidating old page at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag('pages-sitemap');
    }
  }
  return doc;
};

const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context, locale } }) => {
  if (!context.disableRevalidate && isLocale(locale)) {
    rebuildPath(`/${locale}${doc.breadcrumbs!.at(-1)?.url ?? '/'}`);
    rebuildTag('sitemap');
  }

  return doc;
};

export { revalidateDelete, revalidatePage };
