import { createContext, PropsWithChildren, useContext } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';

const createStore = <T, U extends UseBoundStore<StoreApi<unknown>>>(
  getStore: (initial: T) => U,
) => {
  const Context = createContext<U | null>(null);
  const storeRef: { current: U | null } = { current: null };

  const getStoreRef = () => {
    if (!storeRef.current) throw new Error('Store not initialized');
    return storeRef.current;
  };

  const Provider = (props: PropsWithChildren & { initialState: T }) => {
    if (!storeRef.current) storeRef.current = getStore(props.initialState);
    return <Context.Provider value={storeRef.current}>{props.children}</Context.Provider>;
  };

  const useStore = ((selector: Parameters<U>[0]) => {
    const store = useContext(Context);
    if (!store) throw new Error('Store not initialized');
    return store(selector);
  }) as U;

  Object.assign(useStore, {
    getInitialState: () => getStoreRef().getInitialState(),
    getState: () => getStoreRef().getState(),
    setState: (partial: Parameters<U['setState']>[0], replace?: false) => {
      return getStoreRef().setState(partial, replace);
    },
    subscribe: (listener: Parameters<U['subscribe']>[0]) => {
      return getStoreRef().subscribe(listener);
    },
  });

  return [Provider, useStore] as const;
};

export { createStore };
