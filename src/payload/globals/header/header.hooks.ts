import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';
import { header } from './header';

const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context, locale } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`);
    revalidateTag(`global__${locale}__${header.slug}`);
  }

  return doc;
};

export { revalidateHeader };
