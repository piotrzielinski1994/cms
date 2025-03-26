import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tw-colors').createThemes({
      light: {
        background: 'pink',
      },
      dark: {
        background: 'green',
      },
      custom: {
        background: 'blue',
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
