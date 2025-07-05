'use client';

import { CookiesConsentStore, createCookiesConsentStore } from '@/store/cookies-consent';
import { createContext, PropsWithChildren, useState } from 'react';
import { StoreApi } from 'zustand';

// Types ====================================

type CookiesConsentProviderProps = PropsWithChildren & {
  cookiesConsent: CookiesConsentStore['isAllowed'];
};

// Variables ====================================

const CookiesConsentContext = createContext<StoreApi<CookiesConsentStore> | undefined>(undefined);

const CookiesConsentProvider = ({ children, cookiesConsent }: CookiesConsentProviderProps) => {
  const [store] = useState(() => createCookiesConsentStore(cookiesConsent));
  return <CookiesConsentContext.Provider value={store}>{children}</CookiesConsentContext.Provider>;
};

export { CookiesConsentContext, CookiesConsentProvider };
