import { fullTailwindConfig } from '@/tailwind-config';

type FontScale = keyof typeof fontScales;

const FontScaleConstants = {
  STORAGE_KEY: 'font-scale',
  DOM_KEY: 'data-scale',
} as const;

const fontScales = {
  xs: 12,
  base: 16,
  xl: 20,
} satisfies Partial<Record<keyof typeof fullTailwindConfig.theme.fontSize, number>>;

export { FontScaleConstants, fontScales, type FontScale };
