'use client';

import { FontScaleConstants, fontScales } from '@/config/store/font-scales.config';
import cookies from '@/utils/cookies';
import { createStore } from '@/utils/store';
import { PropsWithChildren, useEffect } from 'react';
import { create } from 'zustand';

type FontScaleStore = {
  scale: keyof typeof fontScales;
  setScale: (scale: FontScaleStore['scale']) => void;
};

type FontScaleProviderProps = PropsWithChildren & Pick<FontScaleStore, 'scale'>;

const [Provider, useFontScaleStore] = createStore((initial: Pick<FontScaleStore, 'scale'>) => {
  return create<FontScaleStore>((set) => {
    return {
      scale: initial.scale,
      setScale: (scale) => {
        set({ scale });
      },
    };
  });
});

const FontScaleProvider = ({ children, ...rest }: FontScaleProviderProps) => {
  return (
    <Provider initialState={rest}>
      <FontScaleListener />
      {children}
    </Provider>
  );
};

const FontScaleListener = () => {
  const scale = useFontScaleStore((state) => state.scale);

  useEffect(() => {
    document.documentElement.setAttribute(FontScaleConstants.DOM_KEY, scale);
    cookies.setPermament(FontScaleConstants.STORAGE_KEY, scale);
  }, [scale]);

  return <></>;
};

export { FontScaleProvider, useFontScaleStore };
