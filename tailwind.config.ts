import { fromPairs, toPairs } from 'ramda';
import type { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import { CSSRuleObject } from 'tailwindcss/types/config';
import { fontScales } from './src/config/font-scales.config';
import { themes } from './src/config/themes.config';

const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tw-colors').createThemes(themes),
    require('tailwindcss/plugin')(({ addBase }) => {
      const entries = toPairs(fontScales)
        .sort(([key]) => (key === 'base' ? -1 : 1))
        .map(([key, value]) => {
          const selector = key === 'base' ? ':root' : `[data-scale="${key}"]`;
          return [selector, { 'font-size': `${value}px` }] as [typeof selector, CSSRuleObject];
        });
      addBase(fromPairs(entries));
    }),
  ],
  theme: {
    extend: {
      zIndex: {
        header: '100',
        popover: '200',
      },
      colors: {
        themes: fromPairs(
          toPairs(themes).map(([key, value]) => [
            key,
            { background: value.background, foreground: value.foreground },
          ]),
        ),
      },
    },
  },
} satisfies Config;

const fullTailwindConfig = resolveConfig(tailwindConfig);

export { fullTailwindConfig };
export default tailwindConfig;
