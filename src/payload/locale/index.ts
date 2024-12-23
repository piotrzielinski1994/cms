import {
  AcceptedLanguages,
  DefaultTranslationKeys,
  NestedKeysStripped,
  SupportedLanguages,
  TFunction,
} from '@payloadcms/translations';
import { en } from '@payloadcms/translations/languages/en';
import { pl } from '@payloadcms/translations/languages/pl';
import { customTranslations as customEn } from './en';
import { customTranslations as customPl } from './pl';

// Types ====================================

type CustomTranslations = typeof customEn;
type CustomTranslationsKeys = NestedKeysStripped<CustomTranslations>;
export type AdminTranslations = TFunction<CustomTranslationsKeys | DefaultTranslationKeys>;

// Variables ====================================

export const adminLocale: { list: SupportedLanguages; default: AcceptedLanguages } = {
  list: { en, pl },
  default: 'en',
};

export const contentLocale: { list: AcceptedLanguages[]; default: AcceptedLanguages } = {
  list: ['en', 'pl'],
  default: 'en',
};

export const customTranslations = {
  en: customEn,
  pl: customPl,
};
