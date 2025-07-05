'use client';

import { ThemeConfig } from '@/config/themes.config';
import { createThemeStore, ThemeStore, updateColorScheme, updateDom } from '@/store/theme';
import { createContext, PropsWithChildren, useEffect, useRef } from 'react';
import { StoreApi } from 'zustand';

type ThemeProviderProps = PropsWithChildren & {
  theme: ThemeStore['theme'];
  colorPreference: ThemeStore['colorPreference'];
};

const ThemeContext = createContext<StoreApi<ThemeStore> | undefined>(undefined);

const ThemeProvider = ({ children, theme, colorPreference }: ThemeProviderProps) => {
  const store = useRef(createThemeStore({ theme, colorPreference }));

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncColorPreference = (value: boolean) => {
      const colorPreference: ThemeConfig['colorPreference'] = value ? 'dark' : 'light';
      store.current.setState((state) => {
        if (state.theme !== 'system') return { colorPreference };
        updateColorScheme(colorPreference);
        updateDom(colorPreference);
        return { colorPreference };
      });
    };
    const onColorPreferenceChange = (e: MediaQueryListEvent) => syncColorPreference(e.matches);

    syncColorPreference(media.matches);
    media.addEventListener('change', onColorPreferenceChange);
    return () => media.removeEventListener('change', onColorPreferenceChange);
  }, [store]);

  return <ThemeContext.Provider value={store.current}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
