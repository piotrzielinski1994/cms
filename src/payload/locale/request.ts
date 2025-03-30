import { getRequestConfig } from 'next-intl/server';
import { adminLocale } from '.';
import { routing } from './routing';

declare global {
  type IntlMessages = typeof adminLocale.customList.en;
}

const request = getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as keyof typeof adminLocale.customList;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return { locale, messages: adminLocale.customList[locale] };
});

export default request;
