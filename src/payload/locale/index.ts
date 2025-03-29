import { clientEnv } from '@/env.client';
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
  list: pick(clientEnv.feature.locale.admin.list, { en, pl } as SupportedLanguages),
  customList: {
    en: customEn,
    pl: customPl,
  },
  default: clientEnv.feature.locale.admin.default,
};

export const contentLocale = {
  list: clientEnv.feature.locale.content.list,
  default: clientEnv.feature.locale.content.default,
};
