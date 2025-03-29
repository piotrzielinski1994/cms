import { FontScaleStore } from '@/store/font-scale';
import { cookies, headers } from 'next/headers';

export const getPreferences = async () => {
  const cookieStore = await cookies();
  let theme = cookieStore.get('theme')?.value;

  if (!theme) {
    const headerStore = await headers();
    const prefersDark = headerStore.get('sec-ch-prefers-color-scheme') === 'dark';
    theme = prefersDark ? 'dark' : 'light';
  }

  const fontSize = (cookieStore.get('font-scale')?.value ?? 'base') as FontScaleStore['scale'];

  return {
    theme,
    fontSize,
  };
};
