import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import { Alert } from './alert';

const AlertContainer = (props: ComponentProps<typeof Alert>) => {
  const t = useTranslations('frontend');
  return <Alert t={{ close: t('close') }} {...props} />;
};

export { AlertContainer };
