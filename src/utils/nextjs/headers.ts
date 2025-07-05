import { Theme, ThemeConfig } from '@/config/themes.config';
import { COOKIES_CONSENT_STORAGE_KEY, CookiesConsentStore } from '@/store/cookies-consent';
import { FONT_SCALE_STORAGE_KEY, FontScaleStore } from '@/store/font-scale';
import { THEME_STORAGE_KEY } from '@/store/theme';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies, headers } from 'next/headers';

const getPreferences = async () => {
  const [cookieStore, headersStore] = await Promise.all([cookies(), headers()]);
  return {
    colorPreference: getColorPreference(headersStore),
    theme: getTheme(cookieStore, headersStore),
    fontSize: getFontSize(cookieStore),
    cookiesConsent: getCookiesConsent(cookieStore),
  };
};

const getColorPreference = (headers: ReadonlyHeaders): ThemeConfig['colorPreference'] => {
  const prefersDark = headers.get('sec-ch-prefers-color-scheme') === 'dark';
  return prefersDark ? 'dark' : 'light';
};

const getTheme = (cookies: ReadonlyRequestCookies, headers: ReadonlyHeaders): Theme => {
  const theme = cookies.get(THEME_STORAGE_KEY)?.value as Theme | undefined;
  return theme ?? 'system';
};

const getFontSize = (cookies: ReadonlyRequestCookies): FontScaleStore['scale'] => {
  const fontSize = cookies.get(FONT_SCALE_STORAGE_KEY)?.value as
    | FontScaleStore['scale']
    | undefined;
  return fontSize ?? 'base';
};

const getCookiesConsent = (cookies: ReadonlyRequestCookies): CookiesConsentStore['isAllowed'] => {
  const cookiesConsent = cookies.get(COOKIES_CONSENT_STORAGE_KEY)?.value;
  return cookiesConsent === 'true';
};

export { getPreferences };
