import { cn } from '@/_old/utilities/cn';
import { Link } from '@/payload/locale/routing';
import { ComponentPropsWithoutRef } from 'react';

interface HeaderNavItemProps extends ComponentPropsWithoutRef<'a'> {
  label: string;
  href: string;
}

const HeaderNavItem = ({ label, href, className, children: _, ...rest }: HeaderNavItemProps) => {
  return (
    <Link {...rest} className={cn('p-2', 'cms-header__nav__item', className)} href={href}>
      {label}
    </Link>
  );
};

export default HeaderNavItem;
