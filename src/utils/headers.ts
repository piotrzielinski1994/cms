import { Theme } from '@/config/themes.config';
import { FONT_SCALE_STORAGE_KEY, FontScaleStore } from '@/store/font-scale';
import { THEME_STORAGE_KEY } from '@/store/theme';
import { cookies, headers } from 'next/headers';

const getPreferences = async () => {
  const cookieStore = await cookies();
  let theme = cookieStore.get(THEME_STORAGE_KEY)?.value as Theme | undefined;

  if (!theme) {
    const headerStore = await headers();
    const prefersDark = headerStore.get('sec-ch-prefers-color-scheme') === 'dark';
    theme = prefersDark ? 'dark' : 'light';
  }

  const fontSize = (cookieStore.get(FONT_SCALE_STORAGE_KEY)?.value ??
    'base') as FontScaleStore['scale'];

  return {
    theme,
    fontSize,
  };
};

export { getPreferences };
