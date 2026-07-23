import '@/app/(frontend)/[locale]/globals.scss';
import type { Preview } from '@storybook/nextjs';
import { keys } from 'ramda';
import { type FontScale, fontScales } from '@/config/store/font-scales.config';
import { contentLocales, defaultContentLocale } from '@/config/store/locales.config';
import { type Theme, themes } from '@/config/store/themes.config';
import { withProviders } from './components';

const preview = {
  decorators: [withProviders],
  globalTypes: {
    theme: {
      defaultValue: 'light' satisfies Theme,
      toolbar: { title: 'Theme', items: keys(themes) },
    },
    scale: {
      defaultValue: 'base' satisfies FontScale,
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
