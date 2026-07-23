import type { DataFromGlobalSlug, GlobalSlug, Payload, SelectType } from 'payload';
// @ts-expect-error -- payload does not re-export this type
import type { Options } from 'payload/dist/globals/operations/local/update.js';
import { toPairs } from 'ramda';
import { defaultContentLocale } from '@/config/store/locales.config';
import type { Config } from '@/payload.types';

const createGlobal = async <T extends GlobalSlug>(
  payload: Payload,
  mainLocaleGlobal: Options<T, SelectType>,
  getLocalizedGlobals: (
    global: DataFromGlobalSlug<GlobalSlug>,
  ) => Omit<Record<Config['locale'], Options<T, SelectType>>, typeof defaultContentLocale>,
) => {
  const global = await payload.updateGlobal({
    locale: defaultContentLocale,
    ...mainLocaleGlobal,
  });

  for (const [locale, data] of toPairs(getLocalizedGlobals(global))) {
    await payload.updateGlobal({ ...data, locale });
  }

  return global;
};

export { createGlobal };
