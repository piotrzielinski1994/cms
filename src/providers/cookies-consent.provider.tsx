'use client';

import { CookiesConsentStore, createCookiesConsentStore } from '@/store/cookies-consent';
import { createContext, PropsWithChildren, useState } from 'react';
import { StoreApi } from 'zustand';

// Types ====================================

type CookiesConsentProviderProps = PropsWithChildren & {
  initialCookiesConsent: CookiesConsentStore['isAllowed'];
};

// Variables ====================================

const CookiesConsentContext = createContext<StoreApi<CookiesConsentStore> | undefined>(undefined);

const CookiesConsentProvider = ({
  children,
  initialCookiesConsent,
}: CookiesConsentProviderProps) => {
  const [store] = useState(() => createCookiesConsentStore(initialCookiesConsent));
  return <CookiesConsentContext.Provider value={store}>{children}</CookiesConsentContext.Provider>;
};

export { CookiesConsentContext, CookiesConsentProvider };
