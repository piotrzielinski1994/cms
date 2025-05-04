import { Link } from '@/config/next.routing.config';
import LogoSvg from '@/icons/logo.svg';
import { useTranslationsStore } from '@/store/translations';

type LogoProps = {
  className?: string;
};

const Logo = (props: LogoProps) => {
  const t = useTranslationsStore();
  return (
    <Link href="/" aria-label={t.logo} {...props}>
      <LogoSvg />
    </Link>
  );
};

export { Logo };
