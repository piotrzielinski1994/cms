'use client';

import { Link } from '@/config/next.routing.config';

type HeaderNavProps = {
  items: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};

const HeaderNav = ({ items }: HeaderNavProps) => {
  return (
    <nav className="flex-grow flex justify-end -mr-2">
      <ul className="contents">
        {items.map(({ id, label, href }) => {
          return (
            <li key={id} className="contents">
              <Link className="p-2" href={href}>
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
