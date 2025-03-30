'use client';

import { cn } from '@/_old/utilities/ui';
import { Container } from '@/components/layout/container/container';
import { Section } from '@/components/layout/section/section';
import LogoSvg from '@/icons/logo.svg';
import { Link } from '@/payload/locale/routing';
import { DataFromGlobalSlug } from 'payload';
import React from 'react';
import FontScaler from './scaffold/font-scaler';
import LocaleSwitcher from './scaffold/locale-switcher';
import HeaderNav from './scaffold/navbar';
import ThemeSwitcher from './scaffold/theme-switcher';

type HeaderClientProps = {
  data: DataFromGlobalSlug<'header'>;
};

const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <Section as="header" className="py-5 bg-background1 sticky top-0 z-header">
      <Container className={cn('flex items-center')}>
        <Link href="/">
          <LogoSvg />
        </Link>
        <HeaderNav data={data} />
        <FontScaler />
        <ThemeSwitcher />
        <LocaleSwitcher />
      </Container>
    </Section>
  );
};

export { HeaderClient };
