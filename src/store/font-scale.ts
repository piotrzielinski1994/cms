import { clientEnv } from '@/env.client';
import { setCookie } from 'typescript-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontScaleStore = {
  scale: keyof typeof clientEnv.feature.fontScales;
  setScale: (scale: FontScaleStore['scale']) => void;
};

const updateDom = (scale: FontScaleStore['scale']) => {
  document.documentElement.setAttribute('data-scale', scale);
};

const useFontScale = create<FontScaleStore>()(
  persist(
    (set) => ({
      scale: 'base',
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

export default useFontScale;
