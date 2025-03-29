'use client';

import { createFontScaleStore, FontScaleStore } from '@/store/font-scale';
import React, { createContext, useState } from 'react';
import { StoreApi } from 'zustand';

type FontScaleProviderProps = {
  children: React.ReactNode;
  initialFontScale: FontScaleStore['scale'];
};

export const FontScaleContext = createContext<StoreApi<FontScaleStore> | undefined>(undefined);

const FontScaleProvider = ({ children, initialFontScale }: FontScaleProviderProps) => {
  const [store] = useState(() => createFontScaleStore(initialFontScale));
  return <FontScaleContext.Provider value={store}>{children}</FontScaleContext.Provider>;
};

export default FontScaleProvider;
