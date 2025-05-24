import { GlobalRevalidationTag } from '@/payload/utils/globals';
import { Locale } from 'next-intl';
import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';

const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context, locale } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`);
    const typedLocale = locale as Locale;
    const tag: GlobalRevalidationTag = `global__${typedLocale}__footer`;
    revalidateTag(tag);
  }

  return doc;
};

export { revalidateFooter };
