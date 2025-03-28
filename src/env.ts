import { fullTailwindConfig } from '@/tailwind-config';
import { AcceptedLanguages, SupportedLanguages } from '@payloadcms/translations';
import { Config } from './payload/payload.types';

if (typeof window === 'undefined') {
  if (!process.env.PAYLOAD_SECRET) throw Error;
  if (!process.env.DATABASE_URI) throw Error;
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw Error;
}
const defaultLang = 'en' satisfies keyof SupportedLanguages;

export const serverEnv = {
  payloadSecret: process.env.PAYLOAD_SECRET as string,
  dbUri: process.env.DATABASE_URI as string,
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
        ]) as Config['locale'][],
        default: (process.env.NEXT_PUBLIC_FEATURE_DEFAULT_CONTENT_LOCALE ??
          defaultLang) as Config['locale'],
      },
    },
  },
  vercel: {
    blobStorageToken: process.env.BLOB_READ_WRITE_TOKEN ?? '',
  },
};

export const clientEnv = {
  publicUrl: serverEnv.publicUrl,
  feature: {
    locale: serverEnv.feature.locale,
    fontScales: (process.env.NEXT_PUBLIC_FONT_SCALES?.split(',') ??
      []) as unknown as (keyof typeof fullTailwindConfig.theme.fontSize)[],
  },
};
