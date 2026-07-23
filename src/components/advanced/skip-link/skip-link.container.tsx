import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import type { Optional } from '@/utils/types';
import { SkipLink } from './skip-link';

const SkipLinkContainer = (props: Optional<ComponentProps<typeof SkipLink>, 't'>) => {
  const t = useTranslations('frontend');
  return <SkipLink {...props} t={{ label: t('component.skipLink'), ...props.t }} />;
};

export { SkipLinkContainer };
