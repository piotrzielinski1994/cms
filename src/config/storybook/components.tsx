import { CookiesConsentProvider } from '@/providers/cookies-consent.provider';
import { FontScaleProvider } from '@/providers/font-scale.provider';
import { ThemeProvider } from '@/providers/theme.provider';
import { ReactRenderer } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { useEffect } from 'react';
import { DecoratorFunction } from 'storybook/internal/csf';
import { translations } from '../locales.config';
import { getThemeConfig } from '../themes.config';
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
        <ThemeProvider theme={theme} colorPreference={getThemeConfig(theme).colorPreference}>
          <FontScaleProvider fontScale={fontScale}>
            <CookiesConsentProvider cookiesConsent={false}>
              <Story />
            </CookiesConsentProvider>
          </FontScaleProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
};

const DataAttributesSetter = ({ locale, theme, fontScale }: StoryContext['globals']) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-locale', locale);
    document.documentElement.setAttribute('data-scale', fontScale);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.dataset.colorPreference = getThemeConfig(theme).colorPreference;
    document.documentElement.style.colorScheme = getThemeConfig(theme)?.colorPreference;
  }, [locale, theme, fontScale]);
  return <></>;
};

export { withProviders, type StoryContext };
