import { fontScales } from '@/config/font-scales.config';
import { FontScaleContext } from '@/providers/font-scale.provider';
import cookies from '@/utils/cookies';
import { useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

// Types ====================================
type FontScaleStore = {
  scale: keyof typeof fontScales;
  setScale: (scale: FontScaleStore['scale']) => void;
};

// Variables ====================================

const FONT_SCALE_STORAGE_KEY = 'font-scale' as const;

const updateDom = (scale: FontScaleStore['scale']) => {
  document.documentElement.setAttribute('data-scale', scale);
};

const createFontScaleStore = (fontScale: FontScaleStore['scale']) => {
  return createStore<FontScaleStore>()(
    persist(
      (set) => ({
        scale: fontScale,
        setScale: (scale) => {
          updateDom(scale);
          cookies.setPermament(FONT_SCALE_STORAGE_KEY, scale);
          set({ scale });
        },
      }),
      {
        name: FONT_SCALE_STORAGE_KEY,
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          updateDom(state.scale);
          cookies.setPermament(FONT_SCALE_STORAGE_KEY, state.scale);
        },
      },
    ),
  );
};

const useFontScaleStore = <T = FontScaleStore>(selector?: (state: FontScaleStore) => T) => {
  const context = useContext(FontScaleContext);

  if (!context) {
    throw new Error('FontScaleContext is missing');
  }

  return useStore(context, selector ?? ((state) => state as T));
};

export { createFontScaleStore, FONT_SCALE_STORAGE_KEY, useFontScaleStore, type FontScaleStore };
