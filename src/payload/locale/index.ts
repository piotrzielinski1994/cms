import { clientEnv, serverEnv } from '@/env';
import {
  DefaultTranslationKeys,
  NestedKeysStripped,
  SupportedLanguages,
  TFunction,
} from '@payloadcms/translations';
import { en } from '@payloadcms/translations/languages/en';
import { pl } from '@payloadcms/translations/languages/pl';
import { pick } from 'ramda';
import { en as customEn } from './en';
import { pl as customPl } from './pl';

// Types ====================================
export type AdminTranslations = TFunction<
  NestedKeysStripped<typeof customEn> | DefaultTranslationKeys
>;

// Variables ====================================
export const adminLocale = {
  list: pick(serverEnv.feature.locale.admin.list, { en, pl } as SupportedLanguages),
  customList: {
    en: customEn,
    pl: customPl,
  },
  default: serverEnv.feature.locale.admin.default,
};

export const contentLocale = {
  list: clientEnv.feature.locale.admin.list,
  default: clientEnv.feature.locale.admin.default,
};
