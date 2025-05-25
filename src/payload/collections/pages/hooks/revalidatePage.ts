import type { Page } from '@/payload.types';
import { rebuildPath, rebuildTag } from '@/utils/next';
import { isLocale } from '@/utils/payload';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate && isLocale(locale)) {
    if (doc._status === 'published') {
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
      const oldPath: Parameters<typeof rebuildPath>[0] =
        `/${locale}${previousDoc.breadcrumbs!.at(-1)?.url ?? '/'}`;

      payload.logger.info(`Revalidating old page at path: ${oldPath}`);

      rebuildPath(oldPath);
      rebuildTag('sitemap');
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
