import type { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import { clientEnv } from './src/env.client';
import { toEntries } from './src/utils/object';

const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tw-colors').createThemes({
      light: {
        background: '#fff',
        background1: '#f3f4f6',
        foreground: '#000',
      },
      dark: {
        background: '#090b10',
        background1: '#0f111a',
        foreground: '#7b83a3',
      },
      custom: {
        background: '#ff0',
        background1: '#ff0',
        foreground: '#000',
      },
    }),
    require('tailwindcss/plugin')(({ addBase }) => {
      const entries = toEntries(clientEnv.feature.fontScales)
        .sort(([key]) => (key === 'base' ? -1 : 1))
        .map(([key, value]) => {
          const selector = key === 'base' ? ':root' : `[data-scale="${key}"]`;
          return [selector, { 'font-size': `${value}px` }];
        });
      addBase(Object.fromEntries(entries));
    }),
  ],
  theme: {
    extend: {
      zIndex: {
        header: '100',
        popover: '200',
      },
      colors: {
        themes: {
          light: {
            background: '#fff',
            foreground: '#000',
          },
          dark: {
            background: '#090b10',
            foreground: '#7b83a3',
          },
          custom: {
            background: '#ff0',
            foreground: '#000',
          },
        },
      },
    },
  },
} satisfies Config;

export const fullTailwindConfig = resolveConfig(tailwindConfig);

export default tailwindConfig;
