import { CookiesConsentContext } from '@/providers/cookies-consent.provider';
import cookies from '@/utils/cookies';
import { useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

// Types ====================================

type CookiesConsentStore = {
  isAllowed: boolean;
  allow: () => void;
};

// Variables ====================================

const COOKIES_CONSENT_STORAGE_KEY = 'cookies-consent' as const;

const createCookiesConsentStore = (cookiesConsent: CookiesConsentStore['isAllowed']) => {
  return createStore<CookiesConsentStore>()(
    persist(
      (set) => ({
        isAllowed: cookiesConsent,
        allow: () => {
          cookies.setPermament(COOKIES_CONSENT_STORAGE_KEY, true);
          set({ isAllowed: true });
        },
      }),
      {
        name: COOKIES_CONSENT_STORAGE_KEY,
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          cookies.setPermament(COOKIES_CONSENT_STORAGE_KEY, state.isAllowed);
        },
      },
    ),
  );
};

const useCookiesConsentStore = <T = CookiesConsentStore>(
  selector?: (state: CookiesConsentStore) => T,
) => {
  const context = useContext(CookiesConsentContext);

  if (!context) {
    throw new Error('CookiesConsentContext is missing');
  }

  return useStore(context, selector ?? ((state) => state as T));
};

export {
  COOKIES_CONSENT_STORAGE_KEY,
  createCookiesConsentStore,
  useCookiesConsentStore,
  type CookiesConsentStore,
};
