'use client';

import { ButtonLink } from '@/components/basic/button/button';
import { cn } from '@/utils/tailwind';
import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';

const SkipLink = forwardRef<HTMLAnchorElement>((_, ref) => {
  const t = useTranslations('frontend');
  return (
    <ButtonLink
      ref={ref}
      href="#main"
      onFocus={(e) => e.currentTarget.setAttribute('aria-hidden', 'false')}
      onBlur={(e) => e.currentTarget.setAttribute('aria-hidden', 'true')}
      className={cn(
        'fixed left-4 z-skipLink',
        '-translate-y-full focus:translate-y-4 transition-transform',
        'w-fit',
      )}
    >
      {t('component.skipLink')}
    </ButtonLink>
  );
});

SkipLink.displayName = 'SkipLink';

export { SkipLink };
