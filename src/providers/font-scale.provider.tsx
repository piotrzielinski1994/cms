'use client';

import { createFontScaleStore, FontScaleStore } from '@/store/font-scale';
import React, { createContext, useState } from 'react';
import { StoreApi } from 'zustand';

// Types ====================================

type FontScaleProviderProps = {
  children: React.ReactNode;
  fontScale: FontScaleStore['scale'];
};

// Variables ====================================

const FontScaleContext = createContext<StoreApi<FontScaleStore> | undefined>(undefined);

const FontScaleProvider = ({ children, fontScale }: FontScaleProviderProps) => {
  const [store] = useState(() => createFontScaleStore(fontScale));
  return <FontScaleContext.Provider value={store}>{children}</FontScaleContext.Provider>;
};

export { FontScaleContext, FontScaleProvider };
