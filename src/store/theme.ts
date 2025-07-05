'use client';

import { getThemeConfig, Theme, ThemeConfig, themes } from '@/config/themes.config';
import { ThemeContext } from '@/providers/theme.provider';
import { useContext, useEffect } from 'react';
import { setCookie } from 'typescript-cookie';
import { createStore, useStore } from 'zustand';
import { computed } from 'zustand-middleware-computed-state';
import { persist } from 'zustand/middleware';

// Types ====================================

type ThemeStore = {
  theme: Theme;
  colorPreference: ThemeConfig['colorPreference'];
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
};

// Variables ====================================

const THEME_STORAGE_KEY = 'theme' as const;

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

const createThemeStore = ({
  initialTheme,
  initialColorPreference,
}: {
  initialTheme: Theme;
  initialColorPreference: ThemeConfig['colorPreference'];
}) => {
  return createStore()(
    persist(
      computed<Omit<ThemeStore, 'themeConfig'>, { themeConfig: ThemeConfig }>(
        (set, get) => {
          return {
            theme: initialTheme,
            colorPreference: initialColorPreference,
            setTheme: (theme) => {
              set({ theme });
              const themeToSet = theme !== 'system' ? theme : get().colorPreference;
              updateDom(themeToSet);
              updateColorScheme(theme);
              setCookie(THEME_STORAGE_KEY, theme);
            },
          };
        },
        ({ theme, colorPreference }) => {
          return {
            themeConfig: theme === 'system' ? themes[colorPreference] : themes[theme],
          };
        },
      ),
      {
        name: THEME_STORAGE_KEY,
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          const themeToSet = state.theme !== 'system' ? state.theme : state.colorPreference;
          updateDom(themeToSet);
          updateColorScheme(state.colorPreference);
          setCookie(THEME_STORAGE_KEY, state.theme);
        },
      },
    ),
  );
};

const useThemeStore = <T = ThemeStore>(selector?: (state: ThemeStore) => T) => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('ThemeContext is missing');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const colorPreference = e.matches ? 'dark' : 'light';
      context.setState((state) => {
        if (state.theme !== 'system') return { colorPreference };
        updateColorScheme(colorPreference);
        updateDom(colorPreference);
        return { colorPreference };
      });
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [context]);

  return useStore(context, selector ?? ((state) => state as T));
};

export { createThemeStore, THEME_STORAGE_KEY, useThemeStore, type ThemeStore };
