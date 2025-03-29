import { create } from 'zustand';

const useFontScale = create((set) => ({
  scale: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
