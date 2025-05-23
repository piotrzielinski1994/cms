import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';
import { cookiesBanner } from './cookies-banner';

const revalidateCookiesBanner: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating cookies banner`);
    revalidateTag(`global__${locale}__${cookiesBanner.slug}`);
  }

  return doc;
};

export { revalidateCookiesBanner };
