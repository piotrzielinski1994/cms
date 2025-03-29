import { clientEnv } from '@/env';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontScaleStore = {
  scale: (typeof clientEnv.feature.fontScales)[number];
  setScale: (scale: (typeof clientEnv.feature.fontScales)[number]) => void;
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
