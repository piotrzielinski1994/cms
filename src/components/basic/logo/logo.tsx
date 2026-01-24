import { Link } from '@/config/next.routing.config';
import LogoSvg from '@/icons/logo.svg';
import { Optional } from '@/utils/types';
import { ComponentProps } from 'react';

const Logo = (props: Optional<ComponentProps<typeof Link>, 'href'>) => {
  return (
    <Link href="/" {...props}>
      <LogoSvg />
    </Link>
  );
};

export { Logo };
