import type { CollectionAfterChangeHook } from 'payload';
import { rebuildTag } from '@/utils/nextjs/rebuild';

const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`);
  rebuildTag('redirects');
  return doc;
};

export { revalidateRedirects };
