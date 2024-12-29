'use client';

import { Link } from '@/payload/locale/routing';
import type { Header as HeaderType } from '@/payload/payload.types';
import React from 'react';

const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems ?? []).map((it) => ({
    id: it.id,
    label: it.link.label,
    // @ts-expect-error
    path: it.link.reference?.value.path,
  }));

  return (
    <nav className="flex-grow flex justify-end">
      <ul className="contents">
        {navItems.map(({ id, label, path }) => {
          return (
            <li key={id} className="contents">
              <Link className="p-2" href={path}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HeaderNav;
