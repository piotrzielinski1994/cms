'use client';

import { getThemeConfig, Theme, ThemeConfig, ThemeConstants } from '@/config/store/themes.config';
import { cookies } from '@/utils/cookies';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type ThemeStore = {
  theme: Theme;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = PropsWithChildren & {
  theme: Theme;
  colorPreference: ThemeConfig['colorPreference'];
};

const ThemeContext = createContext<ThemeStore | undefined>(undefined);

const ThemeProvider = ({ children, ...initial }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initial.theme);
  const [themeConfig, setThemeConfig] = useState(() =>
    getThemeConfig(initial.theme, initial.colorPreference),
  );

  const setThemeWithConfig = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemeConfig(getThemeConfig(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme: setThemeWithConfig }}>
      <ColorPreferenceListener />
      <ThemeListener />
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeStore = () => {
  const context = useContext(ThemeContext);
  if (context) return context;
  throw new Error('useThemeStore must be used within ThemeProvider');
};

const ColorPreferenceListener = () => {
  const store = useThemeStore();

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const syncColorPreference = (value: boolean) => {
      const colorPreference: ThemeConfig['colorPreference'] = value ? 'dark' : 'light';
      if (store.theme !== 'system') return;
      if (store.themeConfig.colorPreference === colorPreference) return;
      store.setTheme(store.theme); // Retrigger themeConfig computation
    };

    const onColorPreferenceChange = (e: MediaQueryListEvent) => syncColorPreference(e.matches);

    syncColorPreference(media.matches);
    media.addEventListener('change', onColorPreferenceChange);

    return () => media.removeEventListener('change', onColorPreferenceChange);
  }, [store]);

  return null;
};

const ThemeListener = () => {
  const store = useThemeStore();

  useEffect(() => {
    const colorPreference = store.themeConfig.colorPreference;
    const theme = store.theme !== 'system' ? store.theme : colorPreference;

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-preference', colorPreference);
    document.documentElement.style.colorScheme = colorPreference;

    cookies.setPermament(ThemeConstants.STORAGE_KEY, store.theme);
    cookies.setPermament(ThemeConstants.COLOR_PREFERENCE_STORAGE_KEY, colorPreference);
  }, [store]);

  return null;
};

export { ThemeProvider, useThemeStore };
