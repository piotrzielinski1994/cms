'use client';

import { FontScaleConstants, fontScales } from '@/config/store/font-scales.config';
import cookies from '@/utils/cookies';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type FontScaleStore = {
  scale: keyof typeof fontScales;
  setScale: (scale: keyof typeof fontScales) => void;
};

type FontScaleProviderProps = PropsWithChildren & {
  scale: keyof typeof fontScales;
};

const FontScaleContext = createContext<FontScaleStore | undefined>(undefined);

const FontScaleProvider = ({ children, scale: initialScale }: FontScaleProviderProps) => {
  const [scale, setScale] = useState(initialScale);

  return (
    <FontScaleContext.Provider value={{ scale, setScale }}>
      <FontScaleListener />
      {children}
    </FontScaleContext.Provider>
  );
};

const useFontScaleStore = () => {
  const context = useContext(FontScaleContext);
  if (!context) throw new Error('useFontScaleStore must be used within FontScaleProvider');
  return context;
};

const FontScaleListener = () => {
  const { scale } = useFontScaleStore();

  useEffect(() => {
    document.documentElement.setAttribute(FontScaleConstants.DOM_KEY, scale);
    cookies.setPermament(FontScaleConstants.STORAGE_KEY, scale);
  }, [scale]);

  return null;
};

export { FontScaleProvider, useFontScaleStore };
