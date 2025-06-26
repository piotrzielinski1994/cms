import { FontScaleProvider } from '@/providers/font-scale.provider';
import { ThemeProvider } from '@/providers/theme.provider';
import { ReactRenderer } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { useEffect } from 'react';
import { DecoratorFunction } from 'storybook/internal/csf';
import { translations } from '../locales.config';
import preview from './preview';

type GlobalTypes = typeof preview.globalTypes;
type StoryContext = {
  globals: {
    [K in keyof GlobalTypes]: GlobalTypes[K]['toolbar']['items'][number];
  };
};

const withProviders: DecoratorFunction<ReactRenderer> = (Story, context) => {
  const globals = context.globals as StoryContext['globals'];
  const { locale, theme, fontScale } = globals;
  return (
    <>
      <DataAttributesSetter {...globals} />
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

export { withProviders, type StoryContext };
