import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import { Dialog } from './dialog';

const DialogContainer = (props: ComponentProps<typeof Dialog>) => {
  const t = useTranslations('frontend');
  return <Dialog t={{ close: t('close') }} {...props} />;
};

export { DialogContainer };
