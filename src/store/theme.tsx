'use client';

import { getThemeConfig, Theme, ThemeConfig, ThemeConstants } from '@/config/store/themes.config';
import cookies from '@/utils/cookies';
import { createStore } from '@/utils/store';
import { PropsWithChildren, useEffect } from 'react';
import { create } from 'zustand';

type ThemeStore = {
  theme: Theme;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = PropsWithChildren & {
  theme: Theme;
  colorPreference: ThemeConfig['colorPreference'];
};

const [Provider, useThemeStore] = createStore((initial: Omit<ThemeProviderProps, 'children'>) => {
  return create<ThemeStore>((set) => {
    return {
      theme: initial.theme,
      themeConfig: getThemeConfig(initial.theme, initial.colorPreference),
      setTheme: (theme) => {
        set({ theme, themeConfig: getThemeConfig(theme) });
      },
    };
  });
});

const ThemeProvider = ({ children, ...rest }: ThemeProviderProps) => {
  return (
    <Provider initialState={rest}>
      <ColorPreferenceListener />
      <ThemeListener />
      {children}
    </Provider>
  );
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

  return <></>;
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

  return <></>;
};

export { ThemeProvider, useThemeStore };
