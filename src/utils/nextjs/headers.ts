import { CookiesConsentConstants } from '@/config/store/cookies-consent.config';
import { FontScale, FontScaleConstants } from '@/config/store/font-scales.config';
import { Theme, ThemeConfig, ThemeConstants } from '@/config/store/themes.config';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies, headers } from 'next/headers';

const getPreferences = async () => {
  const [cookieStore, headersStore] = await Promise.all([cookies(), headers()]);
  return {
    colorPreference: getColorPreference(headersStore, cookieStore),
    theme: getTheme(cookieStore),
    scale: getFontScale(cookieStore),
    cookiesConsent: getCookiesConsent(cookieStore),
  };
};

const getColorPreference = (
  headers: ReadonlyHeaders,
  cookies: ReadonlyRequestCookies,
): ThemeConfig['colorPreference'] => {
  const valueFromHeaders = headers.get('sec-ch-prefers-color-scheme');
  const valueFromCookies = cookies.get(ThemeConstants.COLOR_PREFERENCE_STORAGE_KEY)?.value;
  const prefersDark = (valueFromHeaders ?? valueFromCookies) === 'dark';
  return prefersDark ? 'dark' : 'light';
};

const getTheme = (cookies: ReadonlyRequestCookies): Theme => {
  const theme = cookies.get(ThemeConstants.STORAGE_KEY)?.value as Theme | undefined;
  return theme ?? 'system';
};

const getFontScale = (cookies: ReadonlyRequestCookies): FontScale => {
  const fontScale = cookies.get(FontScaleConstants.STORAGE_KEY)?.value as FontScale | undefined;
  return fontScale ?? 'base';
};

const getCookiesConsent = (cookies: ReadonlyRequestCookies): boolean => {
  const cookiesConsent = cookies.get(CookiesConsentConstants.STORAGE_KEY)?.value;
  return cookiesConsent === 'true';
};

export { getPreferences };
