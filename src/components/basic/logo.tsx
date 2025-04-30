import { Link } from '@/config/next.routing.config';
import LogoSvg from '@/icons/logo.svg';
import { useTranslationsStore } from '@/store/translations';

const Logo = () => {
  const t = useTranslationsStore();
  return (
    <Link href="/" aria-label={t.logo}>
      <LogoSvg />
    </Link>
  );
};

export { Logo };
