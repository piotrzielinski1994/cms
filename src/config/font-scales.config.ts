import { fullTailwindConfig } from '@/tailwind-config';

const fontScales = {
  xs: 12,
  base: 16,
  xl: 20,
} satisfies Partial<Record<keyof typeof fullTailwindConfig.theme.fontSize, number>>;

export { fontScales };
