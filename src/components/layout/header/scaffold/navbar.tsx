'use client';

import { Link } from '@/config/next.routing.config';
import type { Header as HeaderType, Page } from '@/payload.types';
import React from 'react';

const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems ?? []).map((it) => ({
    id: it.id,
    label: it.link.label,
    path: String((it.link.reference?.value as Page).path),
  }));

  return (
    <nav className="flex-grow flex justify-end -mr-2">
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

export { HeaderNav };
