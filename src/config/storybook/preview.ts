import '@/app/(frontend)/[locale]/globals.scss';
import { fontScales } from '@/config/font-scales.config';
import { contentLocales, defaultContentLocale } from '@/config/locales.config';
import { Theme, themes } from '@/config/themes.config';
import { Preview } from '@storybook/nextjs';
import { keys } from 'ramda';
import { withProviders } from './components';

const preview = {
  decorators: [withProviders],
  globalTypes: {
    theme: {
      defaultValue: 'light' satisfies Theme,
      toolbar: { title: 'Theme', items: keys(themes) },
    },
    fontScale: {
      defaultValue: 'base' satisfies keyof typeof fontScales,
      toolbar: { title: 'Font Scale', items: keys(fontScales) },
    },
    locale: {
      defaultValue: defaultContentLocale,
      toolbar: { title: 'Locale', items: contentLocales },
    },
  },
  parameters: {
    backgrounds: [],
    nextjs: { appDirectory: true },
    options: {
      storySort: {
        order: ['Basic', 'Advanced', 'Sections', 'Layout'],
      },
    },
  },
} satisfies Preview;

export default preview;
