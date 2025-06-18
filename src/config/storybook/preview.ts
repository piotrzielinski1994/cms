import '@/app/(frontend)/[locale]/globals.scss';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { fromPairs, keys } from 'ramda';
import React from 'react';
import { fontScales } from '../font-scales.config';
import { Theme, themes } from '../themes.config'; // TODO: Add support for path aliases in storybook

const defaultTheme: Theme = 'light';
const defaultFontScale: keyof typeof fontScales = 'base';

const decorators = [
  withThemeByDataAttribute({
    themes: fromPairs(keys(themes).map((theme) => [theme, theme])),
    defaultTheme,
    attributeName: 'data-theme',
  }),
  (Story: React.ComponentType, context) => {
    const scale = context.globals.fontScale as keyof typeof fontScales;
    document.documentElement.setAttribute('data-scale', scale);
    return React.createElement(Story);
  },
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
};

export { decorators, globalTypes };
