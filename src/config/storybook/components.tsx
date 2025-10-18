import { CookiesConsentProvider } from '@/store/cookies-consent';
import { FontScaleProvider } from '@/store/font-scale';
import { LocaleProvider } from '@/store/locale';
import { ThemeProvider } from '@/store/theme';
import { ReactRenderer } from '@storybook/nextjs';
import { useEffect } from 'react';
import { DecoratorFunction } from 'storybook/internal/csf';
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
      <LocaleProvider locale={locale}>
        <ThemeProvider theme={theme} colorPreference={getThemeConfig(theme).colorPreference}>
          <FontScaleProvider scale={fontScale}>
            <CookiesConsentProvider isAllowed={false}>
              <Story />
            </CookiesConsentProvider>
          </FontScaleProvider>
        </ThemeProvider>
      </LocaleProvider>
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
