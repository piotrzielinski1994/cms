import { clientEnv } from '@/env.client';
import { FontScaleContext } from '@/providers/font-scale.provider';
import { useContext } from 'react';
import { setCookie } from 'typescript-cookie';
import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontScaleStore = {
  scale: keyof typeof clientEnv.feature.fontScales;
  setScale: (scale: FontScaleStore['scale']) => void;
};

const updateDom = (scale: FontScaleStore['scale']) => {
  document.documentElement.setAttribute('data-scale', scale);
};

export const createFontScaleStore = (initialFontScale: FontScaleStore['scale']) => {
  return createStore<FontScaleStore>()(
    persist(
      (set) => ({
        scale: initialFontScale,
        setScale: (scale) => {
          setCookie('font-scale', scale);
          updateDom(scale);
          set({ scale });
        },
      }),
      {
        name: 'FontScaleStore',
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          updateDom(state.scale);
        },
      },
    ),
  );
};

export const useFontScaleStore = <T = FontScaleStore>(selector?: (state: FontScaleStore) => T) => {
  const context = useContext(FontScaleContext);

  if (!context) {
    throw new Error('FontScaleContext is missing');
  }

  return useStore(context, selector ?? ((state) => state as T));
};
