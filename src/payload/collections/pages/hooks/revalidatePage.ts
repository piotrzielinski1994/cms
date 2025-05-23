import type { Page } from '@/payload.types';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      // const path = doc.path ?? (doc.slug === '' ? '/' : `/${doc.slug}`);
      const path = `/${locale}${doc.breadcrumbs!.at(-1)?.url ?? '/'}`;
      payload.logger.info(`Revalidating page at path: ${path}`);

      revalidatePath(path);
      revalidateTag('pages-sitemap');
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      // const oldPath = previousDoc.slug === '' ? '/' : `/${previousDoc.slug}`;
      const oldPath = `/${locale}${previousDoc.breadcrumbs!.at(-1)?.url ?? '/'}`;

      payload.logger.info(`Revalidating old page at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag('pages-sitemap');
    }
  }
  return doc;
};

const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context, locale } }) => {
  if (!context.disableRevalidate) {
    // const path = doc?.slug === '' ? '/' : `/${doc?.slug}`;
    const path = `/${locale}${doc.breadcrumbs!.at(-1)?.url ?? '/'}`;
    revalidatePath(path);
    revalidateTag('pages-sitemap');
  }

  return doc;
};

export { revalidateDelete, revalidatePage };
