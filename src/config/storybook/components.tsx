import { FontScaleProvider } from '@/providers/font-scale.provider';
import { ThemeProvider } from '@/providers/theme.provider';
import { FontScaleStore } from '@/store/font-scale';
import { ThemeStore } from '@/store/theme';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { ComponentType, useEffect } from 'react';
import { translations } from '../locales.config';

type StoryContext = {
  globals: {
    locale: Locale;
    theme: ThemeStore['theme'];
    fontScale: FontScaleStore['scale'];
  };
};

const withProviders = (Story: ComponentType, context: StoryContext) => {
  const { locale, theme, fontScale } = context.globals;

  return (
    <>
      <DataAttributesSetter {...context.globals} />
      <NextIntlClientProvider locale={locale} messages={translations[locale]}>
        <ThemeProvider initialTheme={theme}>
          <FontScaleProvider initialFontScale={fontScale}>
            <Story />
          </FontScaleProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
};

const DataAttributesSetter = ({ locale, theme, fontScale }: StoryContext['globals']) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-locale', locale);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-scale', fontScale);
  }, [locale, theme, fontScale]);
  return <></>;
};

export { withProviders };
