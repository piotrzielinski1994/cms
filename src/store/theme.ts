import { ThemeContext } from '@/providers/theme-provider';
import { useContext } from 'react';
import { setCookie } from 'typescript-cookie';
import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeStore = {
  theme: 'light' | 'dark' | string;
  setTheme: (theme: ThemeStore['theme']) => void;
};

const updateDom = (theme: ThemeStore['theme']) => {
  document.documentElement.setAttribute('data-theme', theme);
};

export const useThemeStore = <T>(selector: (state: ThemeStore) => T) => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeContext is missing');
  }

  return useStore(context, selector);
};

export const createThemeStore = (initialTheme: ThemeStore['theme']) => {
  return createStore<ThemeStore>()(
    persist(
      (set) => ({
        theme: initialTheme,
        setTheme: (theme) => {
          console.log('@@@ theme | ', theme);
          updateDom(theme);
          setCookie('theme', theme);
          set({ theme });
        },
      }),
      {
        name: 'ThemeStore',
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          updateDom(state.theme);
        },
      },
    ),
  );
};

export default useThemeStore;
