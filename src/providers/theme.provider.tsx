'use client';

import { createThemeStore, ThemeStore } from '@/store/theme';
import { createContext, PropsWithChildren, useRef } from 'react';
import { StoreApi } from 'zustand';

type ThemeProviderProps = PropsWithChildren & {
  theme: ThemeStore['theme'];
  colorPreference: ThemeStore['colorPreference'];
};

const ThemeContext = createContext<StoreApi<ThemeStore> | undefined>(undefined);

const ThemeProvider = ({ children, theme, colorPreference }: ThemeProviderProps) => {
  const store = useRef(createThemeStore({ theme, colorPreference }));
  return <ThemeContext.Provider value={store.current}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
