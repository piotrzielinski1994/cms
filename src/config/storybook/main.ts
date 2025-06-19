import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../../../src/**/*.stories.tsx'],
  framework: '@storybook/nextjs',
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules?.filter(
      (rule) =>
        !(
          rule &&
          typeof rule === 'object' &&
          'test' in rule &&
          rule.test instanceof RegExp &&
          rule.test.test('.svg')
        ),
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    return config;
  },
};

export default config;
