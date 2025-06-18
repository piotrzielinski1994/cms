import { Locale, NextIntlClientProvider } from 'next-intl';
import { ComponentType } from 'react';
import { translations } from '../locales.config';

const withLocalization = (Story: ComponentType, context) => {
  const locale: Locale = context.globals.locale;
  return (
    <NextIntlClientProvider locale={locale} messages={translations[locale]}>
      <Story />
    </NextIntlClientProvider>
  );
};

export { withLocalization };
