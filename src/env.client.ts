import { fullTailwindConfig } from '@/tailwind-config';
import { AcceptedLanguages, SupportedLanguages } from '@payloadcms/translations';
import { z } from 'zod';
import { Config } from './payload/payload.types';

const isLocale = (locale: string): locale is Config['locale'] => /^[a-z]{2}$/.test(locale);

const envSchema = z.object({
  // Default
  NEXT_PUBLIC_SERVER_URL: z.string().url(),

  // Features
  NEXT_PUBLIC_FEATURE_ADMIN_LOCALES: z
    .string()
    .transform((val) => val.split(','))
    .refine((arr): arr is Config['locale'][] => arr.every(isLocale)),
  NEXT_PUBLIC_FEATURE_DEFAULT_ADMIN_LOCALE: z.string().refine(isLocale),
  NEXT_PUBLIC_FEATURE_CONTENT_LOCALES: z
    .string()
    .transform((val) => val.split(','))
    .refine((arr): arr is Config['locale'][] => arr.every(isLocale)),
  NEXT_PUBLIC_FEATURE_DEFAULT_CONTENT_LOCALE: z.string().refine(isLocale),
  NEXT_PUBLIC_THEMES: z
    .string()
    .transform((val) => val.split(','))
    .refine((arr) => arr.every((t) => t.trim().length > 0)),
  NEXT_PUBLIC_FONT_SCALES: z
    .string()
    .transform((val) => JSON.parse(val))
    .refine(
      (obj) =>
        typeof obj === 'object' &&
        obj !== null &&
        Object.entries(obj).every(
          ([key, value]) => typeof key === 'string' && typeof value === 'number',
        ),
    ),
});

// https://stackoverflow.com/questions/69715833/why-is-the-process-env-object-empty-but-i-can-access-its-properties
const env = envSchema.parse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_FEATURE_ADMIN_LOCALES: process.env.NEXT_PUBLIC_FEATURE_ADMIN_LOCALES,
  NEXT_PUBLIC_FEATURE_DEFAULT_ADMIN_LOCALE: process.env.NEXT_PUBLIC_FEATURE_DEFAULT_ADMIN_LOCALE,
  NEXT_PUBLIC_FEATURE_CONTENT_LOCALES: process.env.NEXT_PUBLIC_FEATURE_CONTENT_LOCALES,
  NEXT_PUBLIC_FEATURE_DEFAULT_CONTENT_LOCALE:
    process.env.NEXT_PUBLIC_FEATURE_DEFAULT_CONTENT_LOCALE,
  NEXT_PUBLIC_THEMES: process.env.NEXT_PUBLIC_THEMES,
  NEXT_PUBLIC_FONT_SCALES: process.env.NEXT_PUBLIC_FONT_SCALES,
});

export const clientEnv = {
  publicUrl: env.NEXT_PUBLIC_SERVER_URL,
  feature: {
    locale: {
      admin: {
        list: env.NEXT_PUBLIC_FEATURE_ADMIN_LOCALES as (keyof SupportedLanguages)[],
        default: env.NEXT_PUBLIC_FEATURE_DEFAULT_ADMIN_LOCALE as AcceptedLanguages,
      },
      content: {
        list: env.NEXT_PUBLIC_FEATURE_CONTENT_LOCALES as Config['locale'][],
        default: env.NEXT_PUBLIC_FEATURE_DEFAULT_CONTENT_LOCALE as Config['locale'],
      },
    },
    fontScales: env.NEXT_PUBLIC_FONT_SCALES as Record<
      keyof typeof fullTailwindConfig.theme.fontSize,
      number
    >,
  },
};
