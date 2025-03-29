import { setCookie } from 'typescript-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeStore = {
  theme: 'light' | 'dark' | string;
  setTheme: (theme: ThemeStore['theme']) => void;
};

const updateDom = (theme: ThemeStore['theme']) => {
  document.documentElement.setAttribute('data-theme', theme);
};

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
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

export default useThemeStore;
