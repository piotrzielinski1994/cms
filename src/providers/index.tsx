import { customTranslations } from '@/config/locales.config';
import { Theme } from '@/config/themes.config';
import { NextIntlClientProvider } from 'next-intl';
import { TypedLocale } from 'payload';
import { ComponentProps, ReactNode } from 'react';
import { FontScaleProvider } from './font-scale.provider';
import { ThemeProvider } from './theme.provider';

type ProvidersProps = {
  children: ReactNode;
  locale: TypedLocale;
  initialTheme: Theme;
  initialFontScale: ComponentProps<typeof FontScaleProvider>['initialFontScale'];
};

const Providers = ({ children, locale, initialTheme, initialFontScale }: ProvidersProps) => {
  return (
    <NextIntlClientProvider locale={locale} messages={customTranslations[locale]}>
      <ThemeProvider initialTheme={initialTheme}>
        <FontScaleProvider initialFontScale={initialFontScale}>{children}</FontScaleProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export { Providers };
