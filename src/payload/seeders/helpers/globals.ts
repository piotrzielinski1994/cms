import { defaultContentLocale } from '@/config/locales.config';
import { Config } from '@/payload.types';
import { SelectFromGlobalSlug } from 'node_modules/payload/dist/globals/config/types';
import { Options } from 'node_modules/payload/dist/globals/operations/local/update';
import { DataFromGlobalSlug, GlobalSlug, Payload } from 'payload';
import { toPairs } from 'ramda';

/* @ts-expect-error TODO: Fix */
type GlobalToCreate<T extends GlobalSlug> = Options<T, SelectFromGlobalSlug<T>>;

const createGlobal = async <T extends GlobalSlug>(
  payload: Payload,
  mainLocaleGlobal: GlobalToCreate<T>,
  getLocalizedGlobals: (
    global: DataFromGlobalSlug<GlobalSlug>,
  ) => Omit<Record<Config['locale'], GlobalToCreate<T>>, typeof defaultContentLocale>,
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
