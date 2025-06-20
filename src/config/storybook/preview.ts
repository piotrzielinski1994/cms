import '@/app/(frontend)/[locale]/globals.scss';
import { fontScales } from '@/config/font-scales.config';
import { contentLocales, defaultContentLocale } from '@/config/locales.config';
import { Theme, themes } from '@/config/themes.config';
import { keys } from 'ramda';
import { withProviders } from './components';

const defaultTheme: Theme = 'light';
const defaultFontScale: keyof typeof fontScales = 'base';

const decorators = [withProviders];
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
