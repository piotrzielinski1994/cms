import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';
import { footer } from './footer';

const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context, locale } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`);
    revalidateTag(`global__${locale}__${footer.slug}`);
  }

  return doc;
};

export { revalidateFooter };
