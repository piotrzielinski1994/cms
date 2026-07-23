import type { ComponentProps } from 'react';
import { Link } from '@/config/next.routing.config';
import LogoSvg from '@/icons/logo.svg';
import type { Optional } from '@/utils/types';

const Logo = (props: Optional<ComponentProps<typeof Link>, 'href'>) => {
  return (
    <Link href="/" {...props}>
      <LogoSvg />
    </Link>
  );
};

export { Logo };
