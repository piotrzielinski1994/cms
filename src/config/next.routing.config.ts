import { contentLocales, customTranslations, defaultContentLocale } from '@/config/locales.config';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { getRequestConfig } from 'next-intl/server';

// Types ====================================

declare global {
  type IntlMessages = typeof customTranslations.en;
}

// Variables ====================================

const routing = defineRouting({
  locales: contentLocales,
  defaultLocale: defaultContentLocale,
  localePrefix: 'as-needed',
});

const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

const request = getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as (typeof contentLocales)[number];

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return { locale, messages: customTranslations[locale] };
});

export { Link, redirect, routing, usePathname, useRouter };
export default request;
