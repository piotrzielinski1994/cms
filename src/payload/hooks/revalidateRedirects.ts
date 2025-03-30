import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook } from 'payload';

const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`);

  revalidateTag('redirects');

  return doc;
};

export { revalidateRedirects };
