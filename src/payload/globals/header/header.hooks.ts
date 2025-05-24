import { GlobalRevalidationTag } from '@/payload/utils/globals';
import { Locale } from 'next-intl';
import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';

const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context, locale } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`);
    const typedLocale = locale as Locale;
    const tag: GlobalRevalidationTag = `global__${typedLocale}__header`;
    revalidateTag(tag);
  }

  return doc;
};

export { revalidateHeader };
