import { fromPairs, toPairs } from 'ramda';
import type { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import { CSSRuleObject } from 'tailwindcss/types/config';
import { fontScales } from './src/config/font-scales.config';
import { themes } from './src/config/themes.config';

const normalizedThemes = fromPairs(
  toPairs(themes).map(([key, { colorPreference: _, ...value }]) => [key, value]),
);

const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-color-preference="dark"]'],
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tw-colors').createThemes(normalizedThemes),
    ({ addBase }) => {
      const entries = toPairs(fontScales)
        .sort(([key]) => (key === 'base' ? -1 : 1))
        .map(([key, value]) => {
          const selector = key === 'base' ? ':root' : `[data-scale="${key}"]`;
          return [selector, { 'font-size': `${value}px` }] as [typeof selector, CSSRuleObject];
        });
      addBase(fromPairs(entries));
    },
    ({ addComponents, addVariant }) => {
      addVariant('tw-has-focus', ['&:has(input:focus-visible)']);
      addComponents({
        '.tw-cms-outline': {
          outline: 'none',
          boxShadow: [
            '0 0 0 2px hsl(var(--twc-background))',
            '0 0 0 4px hsl(var(--twc-foreground))',
            '0 0 1.5px 4px hsl(var(--twc-background))',
          ].join(', '),
          zIndex: 999_999,
        },
        '.tw-cms-dialog-outline': {
          outline: 'none',
          boxShadow: [
            '0 0 0 4px hsl(var(--twc-background) / 0.5)',
            '0 0 0 7px hsl(var(--twc-foreground))',
            '0 0 1.5px 7px hsl(var(--twc-background) / 0.5)',
          ].join(', '),
        },
        '[data-color-preference="dark"] .tw-cms-dialog-outline': {
          outline: 'none',
          boxShadow: [
            '0 0 0 4px hsl(var(--twc-background) / 0.9)',
            '0 0 0 7px hsl(var(--twc-foreground))',
            '0 0 1.5px 7px hsl(var(--twc-background) / 0.9)',
          ].join(', '),
        },
      });
    },
  ],
  theme: {
    extend: {
      zIndex: {
        header: '100',
        popover: '200',
        skipLink: '300',
        backdrop: '1000',
        dialog: '1100',
      },
      colors: {
        themes: normalizedThemes,
      },
      boxShadow: {
        'sm-neg': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        skeleton: 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        skeleton: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
} satisfies Config;

const fullTailwindConfig = resolveConfig(tailwindConfig);

export { fullTailwindConfig };
export default tailwindConfig;
