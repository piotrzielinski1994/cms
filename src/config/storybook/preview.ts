import '@/app/(frontend)/[locale]/globals.scss';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { fromPairs, keys } from 'ramda';
import { ComponentType, createElement } from 'react';
import { fontScales } from '../font-scales.config';
import { contentLocales, defaultContentLocale } from '../locales.config';
import { Theme, themes } from '../themes.config'; // TODO: Add support for path aliases in storybook
import { withProviders } from './components';

const defaultTheme: Theme = 'light';
const defaultFontScale: keyof typeof fontScales = 'base';

const decorators = [
  withThemeByDataAttribute({
    themes: fromPairs(keys(themes).map((theme) => [theme, theme])),
    defaultTheme,
    attributeName: 'data-theme',
  }),
  (Story: ComponentType, context) => {
    const scale: keyof typeof fontScales = context.globals.fontScale;
    document.documentElement.setAttribute('data-scale', scale);
    return createElement(Story);
  },
  withProviders,
];

const globalTypes = {
  theme: {
    defaultValue: defaultTheme,
    toolbar: { title: 'Theme', items: keys(themes) },
  },
  fontScale: {
    defaultValue: defaultFontScale,
    toolbar: { title: 'Font Scale', items: keys(fontScales) },
  },
  locale: {
    defaultValue: defaultContentLocale,
    toolbar: { title: 'Locale', items: contentLocales },
  },
};

export { decorators, globalTypes };
