import type { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';

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
    require('tailwindcss/plugin')(({ addBase }) =>
      addBase({
        ':root': {
          'font-size': '16px',
        },
        '[data-scale="xs"]': {
          'font-size': '12px',
        },
        '[data-scale="xl"]': {
          'font-size': '20px',
        },
      }),
    ),
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
