import { contentLocales, defaultContentLocale, translations } from '@/config/locales.config';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { getRequestConfig } from 'next-intl/server';
import { TypedLocale } from 'payload';

// Types ====================================

declare module 'next-intl' {
  interface AppConfig {
    Locale: TypedLocale;
    Messages: typeof translations.en;
  }
}

// Variables ====================================

const routing = defineRouting({
  locales: contentLocales,
  defaultLocale: defaultContentLocale,
  localePrefix: 'as-needed',
});

const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

const request = getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as TypedLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return { locale, messages: translations[locale] };
});

export { Link, redirect, routing, usePathname, useRouter };
export default request;
