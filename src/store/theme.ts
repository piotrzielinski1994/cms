import { getThemeConfig, Theme, ThemeConfig, themes } from '@/config/themes.config';
import { ThemeContext } from '@/providers/theme.provider';
import { useContext } from 'react';
import { setCookie } from 'typescript-cookie';
import { createStore, useStore } from 'zustand';
import { computed } from 'zustand-middleware-computed-state';

// Types ====================================

type ThemeStore = {
  theme: Theme;
  colorPreference: ThemeConfig['colorPreference'];
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
};

// Variables ====================================

const THEME_STORAGE_KEY = 'theme' as const;
const COLOR_PREFERENCE_STORAGE_KEY = 'color-preference' as const;

const createThemeStore = (params: Pick<ThemeStore, 'theme' | 'colorPreference'>) => {
  const { theme, colorPreference } = params;
  return createStore<ThemeStore>()(
    computed<Omit<ThemeStore, 'themeConfig'>, Pick<ThemeStore, 'themeConfig'>>(
      (set, get) => {
        const themeConfig = theme === 'system' ? themes[colorPreference] : themes[theme];

        if (typeof window !== 'undefined') {
          setCookie(THEME_STORAGE_KEY, theme);
        }

        return {
          theme,
          colorPreference,
          themeConfig,
          setTheme: (theme) => {
            const colorPreference: ThemeConfig['colorPreference'] = get().colorPreference;
            set({ theme });
            const themeToSet: Theme = theme !== 'system' ? theme : colorPreference;
            updateDom(themeToSet);
            updateColorScheme(theme);
            setCookie(THEME_STORAGE_KEY, theme);
            setCookie(COLOR_PREFERENCE_STORAGE_KEY, colorPreference);
          },
        };
      },
      ({ theme, colorPreference }) => {
        const themeConfig = theme === 'system' ? themes[colorPreference] : themes[theme];
        return { themeConfig };
      },
    ),
  );
};

const useThemeStore = <T = ThemeStore>(selector?: (state: ThemeStore) => T) => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('ThemeContext is missing');
  return useStore(context, selector ?? ((state) => state as T));
};

const updateDom = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute(
    'data-color-preference',
    getThemeConfig(theme).colorPreference,
  );
};

const updateColorScheme = (theme: Theme) => {
  document.documentElement.style.colorScheme = getThemeConfig(theme).colorPreference;
};

const updateColorPreferenceCookie = (colorPreference: ThemeConfig['colorPreference']) => {
  setCookie(COLOR_PREFERENCE_STORAGE_KEY, colorPreference);
};

export {
  COLOR_PREFERENCE_STORAGE_KEY,
  createThemeStore,
  THEME_STORAGE_KEY,
  updateColorPreferenceCookie,
  updateColorScheme,
  updateDom,
  useThemeStore,
  type ThemeStore,
};
