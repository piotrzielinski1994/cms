import { FontScaleConstants } from '@/config/store/font-scales.config';
import { LocalesConstants } from '@/config/store/locales.config';
import { getThemeConfig, ThemeConstants } from '@/config/store/themes.config';
import { Providers } from '@/providers';
import { ReactRenderer } from '@storybook/nextjs';
import { ComponentProps, useEffect } from 'react';
import { DecoratorFunction } from 'storybook/internal/csf';
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
  const providersProps: Omit<ComponentProps<typeof Providers>, 'children'> = {
    locale,
    scale,
    theme,
    colorPreference: getThemeConfig(theme).colorPreference,
    isAllowed: false,
  };

  return (
    <>
      <DataAttributesSetter {...globals} />
      <Providers {...providersProps}>
        <Story />
      </Providers>
    </>
  );
};

const DataAttributesSetter = ({ locale, theme, scale }: StoryContext['globals']) => {
  useEffect(() => {
    const themeConfig = getThemeConfig(theme);
    document.documentElement.setAttribute(LocalesConstants.DOM_KEY, locale);
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
