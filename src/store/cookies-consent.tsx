'use client';

import { CookiesConsentConstants } from '@/config/cookies-consent.config';
import cookies from '@/utils/cookies';
import { createStore } from '@/utils/store';
import { PropsWithChildren, useEffect } from 'react';
import { create } from 'zustand';

type CookiesConsentStore = {
  isAllowed: boolean;
  allow: () => void;
};

type CookiesConsentProviderProps = PropsWithChildren & Pick<CookiesConsentStore, 'isAllowed'>;

const [Provider, useCookiesConsentStore] = createStore(
  (initial: Pick<CookiesConsentStore, 'isAllowed'>) => {
    return create<CookiesConsentStore>((set) => {
      return {
        isAllowed: initial.isAllowed,
        allow: () => {
          set({ isAllowed: true });
        },
      };
    });
  },
);

const CookiesConsentProvider = ({ children, ...rest }: CookiesConsentProviderProps) => {
  return (
    <Provider initialState={rest}>
      <CookiesConsentListener />
      {children}
    </Provider>
  );
};

const CookiesConsentListener = () => {
  const isAllowed = useCookiesConsentStore((state) => state.isAllowed);

  useEffect(() => {
    cookies.setPermament(CookiesConsentConstants.STORAGE_KEY, isAllowed);
  }, [isAllowed]);

  return <></>;
};

export { CookiesConsentProvider, useCookiesConsentStore };
