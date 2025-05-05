import { Link } from '@/config/next.routing.config';
import LogoSvg from '@/icons/logo.svg';
import { useTranslations } from 'next-intl';

type LogoProps = {
  className?: string;
};

const Logo = (props: LogoProps) => {
  const t = useTranslations('frontend');
  return (
    <Link href="/" aria-label={t('logo')} {...props}>
      <LogoSvg />
    </Link>
  );
};

export { Logo };
