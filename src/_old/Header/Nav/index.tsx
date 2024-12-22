'use client';

import React from 'react';

import type { Header as HeaderType } from '@/_old/payload.types';

import { CMSLink } from '@/_old/components/Link';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />;
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  );
};
