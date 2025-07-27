'use client';

import Dialog from '@/components/advanced/dialog/dialog';
import { Button, ButtonLink } from '@/components/basic/button/button';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { clientEnv } from '@/config/env.client.config';
import { useCookiesConsentStore } from '@/store/cookies-consent';
import { cn } from '@/utils/tailwind';
import { GoogleTagManager } from '@next/third-parties/google';
import { ReactNode, useEffect, useRef } from 'react';

type CookiesBannerProps = {
  content: ReactNode;
  readMore: {
    url: string;
    label: ReactNode;
  };
  accept: ReactNode;
};

const CookiesBanner = ({ content, readMore, accept }: CookiesBannerProps) => {
  const { isAllowed, allow } = useCookiesConsentStore();
  const ref = useRef<HTMLDialogElement>(null);
  console.log('@@@ isAllowed | ', isAllowed);
  // Instead of the `open` prop, to disable focus on elements behind the dialog
  useEffect(() => {
    if (!ref.current) return;
    ref.current.showModal();
  }, []);

  if (isAllowed) {
    return <>{clientEnv.gtmId && <GoogleTagManager gtmId={clientEnv.gtmId} />}</>;
  }

  return (
    <>
      <Dialog.Backdrop />
      <Section
        ref={ref}
        as="dialog"
        aria-modal={true}
        className={cn(
          'fixed top-auto bottom-0 z-dialog',
          'w-full max-w-none py-5',
          'bg-background1 shadow-sm-neg',
        )}
      >
        <Container className="flex flex-col gap-4 items-center sm:flex-row">
          <div className="flex-grow">{content}</div>
          <div className="flex gap-2">
            <ButtonLink href={readMore.url} variant="secondary">
              {readMore.label}
            </ButtonLink>
            <Button onClick={allow}>{accept}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export { CookiesBanner };
