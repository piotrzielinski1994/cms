import { fromPairs, toPairs } from 'ramda';
import type { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import { CSSRuleObject } from 'tailwindcss/types/config';
import { fontScales } from './src/config/font-scales.config';
import { themes } from './src/config/themes.config';

const normalizedThemes = fromPairs(
  toPairs(themes).map(([key, { _type, ...value }]) => [key, value]),
);

const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
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
    ({ addComponents }) => {
      addComponents({
        '.tw-cms-outline': {
          outline: 'none',
          boxShadow: [
            '0 0 0 4px hsl(var(--twc-background))',
            '0 0 0 6px hsl(var(--twc-foreground))',
            '-0.75px -0.75px 2px 6px hsl(var(--twc-background))',
          ].join(', '),
          zIndex: 999_999,
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
      },
      colors: {
        themes: normalizedThemes,
      },
    },
  },
} satisfies Config;

const fullTailwindConfig = resolveConfig(tailwindConfig);

export { fullTailwindConfig };
export default tailwindConfig;
