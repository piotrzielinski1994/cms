'use client';

import { createThemeStore, ThemeStore } from '@/store/theme';
import React, { createContext, useState } from 'react';
import { StoreApi } from 'zustand';

type ThemeProviderProps = {
  children: React.ReactNode;
  initialTheme: ThemeStore['theme'];
  initialColorPreference: ThemeStore['colorPreference'];
};

const ThemeContext = createContext<StoreApi<ThemeStore> | undefined>(undefined);

const ThemeProvider = ({ children, initialTheme, initialColorPreference }: ThemeProviderProps) => {
  const [store] = useState(() => createThemeStore({ initialTheme, initialColorPreference }));
  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
