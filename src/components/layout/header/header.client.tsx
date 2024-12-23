'use client';

import { Logo } from '@/_old/components/Logo/Logo';
import { useHeaderTheme } from '@/_old/providers/HeaderTheme';
import { cn } from '@/_old/utilities/cn';
import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { Link, usePathname } from '@/payload/locale/routing';
import React, { useEffect, useState } from 'react';
import { HeaderClientProps } from './header.types';
import LocaleSwitcher from './scaffold/locale-switcher';
import HeaderNav from './scaffold/navbar';

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => setHeaderTheme(null), [pathname, setHeaderTheme]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <Section as="header">
      <Container className={cn('flex items-center')}>
        <Link href="/">
          <Logo />
        </Link>
        <HeaderNav data={data} />
        <LocaleSwitcher />
      </Container>
    </Section>
  );
};
