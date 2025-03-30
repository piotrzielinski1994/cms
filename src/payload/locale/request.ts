import { contentLocales, customTranslations } from '@/config/locales.config';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

declare global {
  type IntlMessages = typeof customTranslations.en;
}

const request = getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as (typeof contentLocales)[number];

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return { locale, messages: customTranslations[locale] };
});

export default request;
