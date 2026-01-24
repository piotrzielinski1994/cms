import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import { Logo } from './logo';

const LogoContainer = (props: ComponentProps<typeof Logo>) => {
  const t = useTranslations('frontend');
  return <Logo aria-label={t('logo')} {...props} />;
};

export { LogoContainer };
