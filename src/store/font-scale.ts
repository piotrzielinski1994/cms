import { clientEnv } from '@/env.client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontScaleStore = {
  scale: keyof typeof clientEnv.feature.fontScales;
  setScale: (scale: FontScaleStore['scale']) => void;
};

const useFontScale = create<FontScaleStore>()(
  persist(
    (set) => ({
      scale: 'base',
      setScale: (scale) => {
        document.documentElement.setAttribute('data-scale', scale);
        set({ scale });
      },
    }),
    {
      name: 'FontScaleStore',
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        document.documentElement.setAttribute('data-scale', state.scale);
      },
    },
  ),
);

export default useFontScale;
