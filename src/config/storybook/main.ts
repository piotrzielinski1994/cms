import type { StorybookConfig } from '@storybook/nextjs';
import sharp from 'responsive-loader/sharp.js';

const config: StorybookConfig = {
  stories: ['../../**/*.stories.tsx'],
  framework: '@storybook/nextjs',
  webpackFinal: async (config) => {
    config.module!.rules = config.module!.rules?.filter(
      (rule) =>
        !(
          rule &&
          typeof rule === 'object' &&
          'test' in rule &&
          rule.test instanceof RegExp &&
          rule.test.test('.svg')
        ),
    );

    config.module!.rules!.push(
      {
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
      },
      {
        test: /\.webp$/,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: sharp,
              format: 'webp',
            },
          },
        ],
      },
    );

    return config;
  },
};

export default config;
