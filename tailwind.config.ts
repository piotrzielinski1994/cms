import type { Config } from 'tailwindcss';

export default {
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
  ],
  theme: {
    extend: {
      colors: {
        themes: {
          light: {
            background: 'hsl(0 0% 100%)',
            foreground: 'hsl(222.2 84% 4.9%)',
          },
          dark: {
            background: 'hsl(0 0% 0%)',
            foreground: 'hsl(210 40% 98%)',
          },
          custom: {
            background: 'hsl(0 0% 0%)',
            foreground: 'hsl(210 40% 98%)',
          },
        },
      },
    },
  },
} satisfies Config;
