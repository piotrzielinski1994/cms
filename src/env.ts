import { AcceptedLanguages, SupportedLanguages } from '@payloadcms/translations';

if (!process.env.PAYLOAD_SECRET) throw Error;
if (!process.env.DATABASE_URI) throw Error;

const defaultLang: keyof SupportedLanguages = 'en';

export const serverEnv = {
  payloadSecret: process.env.PAYLOAD_SECRET,
  dbUri: process.env.DATABASE_URI,
  publicUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  feature: {
    locale: {
      admin: {
        list: (process.env.NEXT_PUBLIC_FEATURE_ADMIN_LOCALES?.split(',') ?? [
          defaultLang,
        ]) as (keyof SupportedLanguages)[],
        default: (process.env.NEXT_PUBLIC_FEATURE_DEFAULT_ADMIN_LOCALE ??
          defaultLang) as AcceptedLanguages,
      },
      content: {
        list: (process.env.NEXT_PUBLIC_FEATURE_CONTENT_LOCALES?.split(',') ?? [
          defaultLang,
        ]) as AcceptedLanguages[],
        default: (process.env.NEXT_PUBLIC_FEATURE_DEFAULT_CONTENT_LOCALE ??
          defaultLang) as AcceptedLanguages,
      },
    },
  },
};

export const clientEnv = {
  publicUrl: serverEnv.publicUrl,
  feature: {
    locale: serverEnv.feature.locale,
  },
};
