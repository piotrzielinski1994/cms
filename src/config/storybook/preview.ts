import '@/app/(frontend)/[locale]/globals.scss';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { fromPairs, keys } from 'ramda';
import { Theme, themes } from '../themes.config'; // TODO: Add support for path aliases in storybook

const defaultTheme: Theme = 'light';

const decorators = [
  withThemeByDataAttribute({
    themes: fromPairs(keys(themes).map((theme) => [theme, theme])),
    defaultTheme,
    attributeName: 'data-theme',
  }),
];

const globalTypes = {
  theme: {
    defaultValue: defaultTheme,
    toolbar: { title: 'Theme', items: keys(themes) },
  },
};

export { decorators, globalTypes };
