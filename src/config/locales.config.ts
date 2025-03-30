import { en as customEn } from '@/payload/locale/en';
import { pl as customPl } from '@/payload/locale/pl';
import {
  DefaultTranslationKeys,
  NestedKeysStripped,
  SupportedLanguages,
  TFunction,
} from '@payloadcms/translations';
import { en } from '@payloadcms/translations/languages/en';
import { pl } from '@payloadcms/translations/languages/pl';
import { pick } from 'ramda';

// Types ====================================

type AdminTranslations = TFunction<NestedKeysStripped<typeof customEn> | DefaultTranslationKeys>;

// Variables ====================================

const contentLocales = ['en', 'pl'] satisfies (keyof SupportedLanguages)[];
const defaultContentLocale = 'en' satisfies (typeof contentLocales)[number];

const adminLocales = pick(contentLocales, { en, pl }) satisfies SupportedLanguages;
const defaultAdminLocale = 'en' satisfies keyof typeof adminLocales;

const customTranslations = {
  en: customEn,
  pl: customPl,
} satisfies Record<(typeof contentLocales)[number], typeof customEn>;

export {
  adminLocales,
  contentLocales,
  customTranslations,
  defaultAdminLocale,
  defaultContentLocale,
  type AdminTranslations,
};
