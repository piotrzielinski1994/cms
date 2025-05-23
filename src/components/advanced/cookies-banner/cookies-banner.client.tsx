'use client';

import { Button, ButtonLink } from '@/components/basic/button';
import { Container } from '@/components/basic/container';
import Dialog from '@/components/basic/dialog/dialog';
import { Section } from '@/components/basic/section';
import { useCookiesConsentStore } from '@/store/cookies-consent';
import { cn } from '@/utils/tailwind';

type CookiesBannerClientProps = {
  cookiesBanner: any;
};

const COOKIES_BANNER_TEXT_ID = 'cookies-banner' as const;

const CookiesBannerClient = ({ cookiesBanner }: CookiesBannerClientProps) => {
  const { isAllowed, allow } = useCookiesConsentStore();

  if (isAllowed) return null;

  return (
    <>
      <Dialog.Backdrop />
      <Section
        as="dialog"
        open
        aria-modal={true}
        aria-labelledby={COOKIES_BANNER_TEXT_ID}
        className={cn('fixed bottom-0 z-dialog', 'w-full py-5', 'bg-background1 shadow-sm-neg')}
      >
        <Container className="flex flex-col gap-4 items-center sm:flex-row">
          <p id={COOKIES_BANNER_TEXT_ID}>
            asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd
            asdasdasdasd asdasdasdasd asdasdasdasd
          </p>
          <div className="flex gap-2">
            <ButtonLink href="" variant="secondary">
              Read More
            </ButtonLink>
            <Button onClick={allow}>Agree</Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export { CookiesBannerClient };
