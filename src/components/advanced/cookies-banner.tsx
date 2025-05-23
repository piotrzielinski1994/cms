'use client';

import { Button } from '@/components/basic/button';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { useCookiesConsentStore } from '@/store/cookies-consent';
import { cn } from '@/utils/tailwind';

const CookiesBanner = () => {
  const { isAllowed, allow } = useCookiesConsentStore();

  if (isAllowed) return null;

  return (
    <Section
      as="div"
      className={cn('fixed bottom-0', 'w-full py-5', 'bg-background1 shadow-sm-neg')}
    >
      <Container className="flex gap-4 items-center">
        <p>sdasdasd</p>
        <div className="flex gap-2">
          <Button variant="secondary">Read More</Button>
          <Button onClick={allow}>Agree</Button>
        </div>
      </Container>
    </Section>
  );
};

export { CookiesBanner };
