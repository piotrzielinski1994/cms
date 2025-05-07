import { Theme, themes } from '@/config/themes.config';
import { ThemeContext } from '@/providers/theme.provider';
import { useContext } from 'react';
import { setCookie } from 'typescript-cookie';
import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

// Types ====================================

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Variables ====================================

const THEME_STORAGE_KEY = 'theme' as const;

const updateDom = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

const updateColorScheme = (theme: Theme) => {
  document.documentElement.style.colorScheme = themes[theme]._type;
};

const createThemeStore = (initialTheme: Theme) => {
  return createStore<ThemeStore>()(
    persist(
      (set) => ({
        theme: initialTheme,
        setTheme: (theme) => {
          set({ theme });
          updateDom(theme);
          updateColorScheme(theme);
          setCookie(THEME_STORAGE_KEY, theme);
        },
      }),
      {
        name: THEME_STORAGE_KEY,
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          updateDom(state.theme);
          updateColorScheme(state.theme);
          setCookie(THEME_STORAGE_KEY, state.theme);
        },
      },
    ),
  );
};

const useThemeStore = <T = ThemeStore>(selector?: (state: ThemeStore) => T) => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('ThemeContext is missing');
  return useStore(context, selector ?? ((state) => state as T));
};

export { createThemeStore, THEME_STORAGE_KEY, useThemeStore, type ThemeStore };
