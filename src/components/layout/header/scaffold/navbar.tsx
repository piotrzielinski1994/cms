'use client';

// import { CMSLink } from '@/_old/components/Link';
import type { Header as HeaderType } from '@/payload/payload.types';
import React from 'react';
import HeaderNavItem from './nav-item';

const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems ?? []).map((it) => ({
    id: it.id,
    label: it.link.label,
    path: `/${it.link.reference?.value.slug}`,
  }));
  return (
    <nav className="flex-grow flex justify-end">
      {navItems.map(({ id, label, path }) => {
        return <HeaderNavItem key={id} label={label} href={path} />;
      })}
    </nav>
  );
};

export default HeaderNav;
