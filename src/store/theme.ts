import { ThemeContext } from '@/providers/theme.provider';
import { useContext } from 'react';
import { setCookie } from 'typescript-cookie';
import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

// Types ====================================

type ThemeStore = {
  theme: 'light' | 'dark' | string;
  setTheme: (theme: ThemeStore['theme']) => void;
};

// Variables ====================================

const THEME_STORAGE_KEY = 'theme' as const;

const updateDom = (theme: ThemeStore['theme']) => {
  document.documentElement.setAttribute('data-theme', theme);
};

const createThemeStore = (initialTheme: ThemeStore['theme']) => {
  return createStore<ThemeStore>()(
    persist(
      (set) => ({
        theme: initialTheme,
        setTheme: (theme) => {
          updateDom(theme);
          setCookie(THEME_STORAGE_KEY, theme);
          set({ theme });
        },
      }),
      {
        name: THEME_STORAGE_KEY,
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          updateDom(state.theme);
          setCookie(THEME_STORAGE_KEY, state.theme);
        },
      },
    ),
  );
};

const useThemeStore = <T = ThemeStore>(selector?: (state: ThemeStore) => T) => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeContext is missing');
  }

  return useStore(context, selector ?? ((state) => state as T));
};

export { createThemeStore, THEME_STORAGE_KEY, useThemeStore, type ThemeStore };
