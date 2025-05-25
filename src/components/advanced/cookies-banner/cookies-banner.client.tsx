'use client';

import { Button, ButtonLink } from '@/components/basic/button';
import { Container } from '@/components/basic/container';
import Dialog from '@/components/basic/dialog/dialog';
import { Section } from '@/components/basic/section';
import { clientEnv } from '@/config/env.client.config';
import { CookiesBanner as CookiesBannerType } from '@/payload/payload.types';
import { useCookiesConsentStore } from '@/store/cookies-consent';
import { cn } from '@/utils/tailwind';
import { GoogleTagManager } from '@next/third-parties/google';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { useEffect, useRef } from 'react';

type CookiesBannerClientProps = {
  data: CookiesBannerType;
};

const CookiesBannerClient = ({ data }: CookiesBannerClientProps) => {
  const { isAllowed, allow } = useCookiesConsentStore();
  const ref = useRef<HTMLDialogElement>(null);

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
          <RichText className="flex-grow" data={data.content} />
          <div className="flex gap-2">
            <ButtonLink href={data.readMore.url} variant="secondary">
              {data.readMore.label}
            </ButtonLink>
            <Button onClick={allow}>{data.accept}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

const Asd = () => {
  return <div></div>;
};

export { Asd };

export { CookiesBannerClient };
