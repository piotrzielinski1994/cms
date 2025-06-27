import { rebuildTag } from '@/utils/nextjs/rebuild';
import type { CollectionAfterChangeHook } from 'payload';

const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`);
  rebuildTag('redirects');
  return doc;
};

export { revalidateRedirects };
