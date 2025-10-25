'use client';

import { clientEnv } from '@/config/env.client.config';
import { useCookiesConsentStore } from '@/store/cookies-consent';
import { GoogleTagManager } from '@next/third-parties/google';
import { ComponentProps, useEffect, useRef } from 'react';
import { CookiesBanner } from './cookies-banner';

const CookiesBannerContainer = (props: Omit<ComponentProps<typeof CookiesBanner>, 'onAccept'>) => {
  const { isAllowed, allow } = useCookiesConsentStore();
  const ref = useRef<HTMLDialogElement>(null);

  // Instead of the `open` prop, to disable focus on elements behind the dialog
  useEffect(() => {
    if (!ref.current) return;
    ref.current.showModal();
  }, []);

  if (clientEnv.gtmId === undefined) return;
  if (isAllowed) return <GoogleTagManager gtmId={clientEnv.gtmId} />;
  return <CookiesBanner {...props} onAccept={allow} />;
};

export { CookiesBannerContainer };
