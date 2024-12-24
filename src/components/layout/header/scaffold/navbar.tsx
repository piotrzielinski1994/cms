'use client';

import { Link } from '@/payload/locale/routing';
import type { Header as HeaderType } from '@/payload/payload.types';
import React from 'react';

const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems ?? []).map((it) => ({
    id: it.id,
    label: it.link.label,
    path: `/${it.link.reference?.value.slug}`,
  }));
  return (
    <nav className="flex-grow flex justify-end">
      {navItems.map(({ id, label, path }) => {
        return (
          <Link key={id} className="p-2" href={path}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderNav;
