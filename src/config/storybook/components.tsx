import { CookiesConsentProvider } from '@/store/cookies-consent';
import { FontScaleProvider } from '@/store/font-scale';
import { LocaleProvider } from '@/store/locale';
import { ThemeProvider } from '@/store/theme';
import { ReactRenderer } from '@storybook/nextjs';
import { useEffect } from 'react';
import { DecoratorFunction } from 'storybook/internal/csf';
import { FontScaleConstants } from '../font-scales.config';
import { getThemeConfig, ThemeConstants } from '../themes.config';
import preview from './preview';

type GlobalTypes = typeof preview.globalTypes;
type StoryContext = {
  globals: {
    [K in keyof GlobalTypes]: GlobalTypes[K]['toolbar']['items'][number];
  };
};

const withProviders: DecoratorFunction<ReactRenderer> = (Story, context) => {
  const globals = context.globals as StoryContext['globals'];
  const { locale, theme, scale } = globals;
  return (
    <>
      <DataAttributesSetter {...globals} />
      <LocaleProvider locale={locale}>
        <ThemeProvider theme={theme} colorPreference={getThemeConfig(theme).colorPreference}>
          <FontScaleProvider scale={scale}>
            <CookiesConsentProvider isAllowed={false}>
              <Story />
            </CookiesConsentProvider>
          </FontScaleProvider>
        </ThemeProvider>
      </LocaleProvider>
    </>
  );
};

const DataAttributesSetter = ({ locale, theme, scale }: StoryContext['globals']) => {
  useEffect(() => {
    const themeConfig = getThemeConfig(theme);
    document.documentElement.setAttribute('data-locale', locale);
    document.documentElement.setAttribute(FontScaleConstants.DOM_KEY, scale);
    document.documentElement.setAttribute(ThemeConstants.DOM_KEY, theme);
    document.documentElement.setAttribute(
      ThemeConstants.COLOR_PREFERENCE_DOM_KEY,
      themeConfig.colorPreference,
    );
    document.documentElement.dataset.colorPreference = themeConfig.colorPreference;
    document.documentElement.style.colorScheme = themeConfig.colorPreference;
  }, [locale, theme, scale]);

  return <></>;
};

export { withProviders, type StoryContext };
