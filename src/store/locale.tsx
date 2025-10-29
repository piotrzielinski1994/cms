'use client';

import { contentLocales, defaultContentLocale, translations } from '@/config/store/locales.config';
import { Locale, NextIntlClientProvider, useLocale } from 'next-intl';
import { PropsWithChildren, useEffect } from 'react';
import z from 'zod';

const useLocaleStore = (): Locale => {
  const locale = useLocale();
  return contentLocales.includes(locale) ? locale : defaultContentLocale;
};

const LocaleProvider = ({ children, locale }: PropsWithChildren & { locale: Locale }) => {
  useEffect(() => {
    z.config(z.locales[locale]());
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={translations[locale]}>
      {children}
    </NextIntlClientProvider>
  );
};

export { LocaleProvider, useLocaleStore };
