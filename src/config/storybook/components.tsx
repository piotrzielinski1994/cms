import { ThemeProvider } from '@/providers/theme.provider';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { ComponentType } from 'react';
import { translations } from '../locales.config';

const withProviders = (Story: ComponentType, context) => {
  const locale: Locale = context.globals.locale;

  document.documentElement.setAttribute('data-locale', locale);

  return (
    <NextIntlClientProvider locale={locale} messages={translations[locale]}>
      <ThemeProvider initialTheme={context.globals.theme}>
        <Story />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export { withProviders };
