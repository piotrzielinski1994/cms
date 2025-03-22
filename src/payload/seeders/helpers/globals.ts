import { contentLocale } from '@/payload/locale';
import { Config } from '@/payload/payload.types';
import { entries } from '@/utils/object';
import { SelectFromGlobalSlug } from 'node_modules/payload/dist/globals/config/types';
import { Options } from 'node_modules/payload/dist/globals/operations/local/update';
import { DataFromGlobalSlug, GlobalSlug, Payload } from 'payload';

type GlobalToCreate<T extends GlobalSlug> = Options<T, SelectFromGlobalSlug<T>>;

export const createGlobal = async <T extends GlobalSlug>(
  payload: Payload,
  mainLocaleGlobal: GlobalToCreate<T>,
  getLocalizedGlobals: (
    global: DataFromGlobalSlug<GlobalSlug>,
  ) => Partial<Record<Config['locale'], GlobalToCreate<T>>>,
) => {
  const global = await payload.updateGlobal({
    locale: contentLocale.default,
    ...mainLocaleGlobal,
  });
  const rest = entries(getLocalizedGlobals(global) as Record<Config['locale'], GlobalToCreate<T>>);
  for (const [locale, data] of rest) {
    await payload.updateGlobal({ ...data, locale });
  }

  return global;
};
