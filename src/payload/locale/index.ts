import {
  AcceptedLanguages,
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
type CustomTranslations = typeof customEn;

export type AdminTranslations = TFunction<
  NestedKeysStripped<CustomTranslations> | DefaultTranslationKeys
>;
export type ContentLocale = (typeof contentLocale.list)[number];

// Variables ====================================
export const adminLocale = {
  list: pick(
    (process.env.NEXT_PUBLIC_FEATURE_ADMIN_LOCALES.split(',') || [
      'en',
    ]) as (keyof SupportedLanguages)[],
    { en, pl } as SupportedLanguages,
  ),
  default: process.env.NEXT_PUBLIC_FEATURE_DEFAULT_ADMIN_LOCALE as AcceptedLanguages,
};

export const contentLocale = {
  list: (process.env.NEXT_PUBLIC_FEATURE_CONTENT_LOCALES.split(',') || [
    'en',
  ]) as AcceptedLanguages[],
  default: process.env.NEXT_PUBLIC_FEATURE_DEFAULT_CONTENT_LOCALE as AcceptedLanguages,
};

export const customTranslations = {
  en: customEn,
  pl: customPl,
};
