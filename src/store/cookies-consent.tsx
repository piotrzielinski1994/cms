'use client';

import { CookiesConsentConstants } from '@/config/store/cookies-consent.config';
import { cookies } from '@/utils/cookies';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type CookiesConsentStore = {
  isAllowed: boolean;
  allow: () => void;
};

type CookiesConsentProviderProps = PropsWithChildren & {
  isAllowed: boolean;
};

const CookiesConsentContext = createContext<CookiesConsentStore | undefined>(undefined);

const CookiesConsentProvider = ({
  children,
  isAllowed: initialIsAllowed,
}: CookiesConsentProviderProps) => {
  const [isAllowed, setIsAllowed] = useState(initialIsAllowed);

  const allow = () => setIsAllowed(true);

  return (
    <CookiesConsentContext.Provider value={{ isAllowed, allow }}>
      <CookiesConsentListener />
      {children}
    </CookiesConsentContext.Provider>
  );
};

const useCookiesConsentStore = () => {
  const context = useContext(CookiesConsentContext);
  if (!context)
    throw new Error('useCookiesConsentStore must be used within CookiesConsentProvider');
  return context;
};

const CookiesConsentListener = () => {
  const { isAllowed } = useCookiesConsentStore();

  useEffect(() => {
    cookies.setPermament(CookiesConsentConstants.STORAGE_KEY, isAllowed);
  }, [isAllowed]);

  return null;
};

export { CookiesConsentProvider, useCookiesConsentStore };
