'use client';

import { ButtonLink } from '@/components/basic/button/button';
import { cn } from '@/utils/tailwind';
import { Optional } from '@/utils/types';
import { ComponentProps, forwardRef, ReactNode } from 'react';

type SkipLinkProps = Optional<ComponentProps<typeof ButtonLink>, 'href'> & {
  t: {
    label: ReactNode;
  };
};

const styles = {
  root: cn(
    'fixed left-4 z-skipLink',
    '-translate-y-full focus:translate-y-4 transition-transform',
    'w-fit',
  ),
};

const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>((props, ref) => {
  const { t, href = '#main', className, ...rest } = props;
  return (
    <ButtonLink
      ref={ref}
      {...rest}
      href={href}
      className={cn(styles.root, className)}
      onFocus={(e) => {
        e.currentTarget.setAttribute('aria-hidden', 'false');
        rest.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.setAttribute('aria-hidden', 'true');
        rest.onBlur?.(e);
      }}
    >
      {t.label}
    </ButtonLink>
  );
});

export { SkipLink, styles };
