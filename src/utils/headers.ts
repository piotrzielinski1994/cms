import { cookies, headers } from 'next/headers';

export const getPreferences = async () => {
  const cookieStore = await cookies();
  let theme = cookieStore.get('theme')?.value;

  if (!theme) {
    const headerStore = await headers();
    const prefersDark = headerStore.get('sec-ch-prefers-color-scheme') === 'dark';
    theme = prefersDark ? 'dark' : 'light';
  }

  const fontSize = cookieStore.get('font-size')?.value ?? 'base';

  return {
    theme,
    fontSize,
  };
};
