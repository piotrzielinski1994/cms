import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import type { Optional } from '@/utils/types';
import { Pagination } from './pagination';

const PaginationContainer = (props: Optional<ComponentProps<typeof Pagination>, 't'>) => {
  const t = useTranslations('frontend.component.pagination');
  return (
    <Pagination
      {...props}
      t={{
        label: t('label'),
        previous: t('previous'),
        next: t('next'),
        morePages: t('morePages'),
        ...props.t,
      }}
    />
  );
};

export { PaginationContainer };
