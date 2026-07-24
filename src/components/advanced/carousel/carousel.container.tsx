import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import type { Optional } from '@/utils/types';
import { Carousel } from './carousel';

const CarouselContainer = (props: Optional<ComponentProps<typeof Carousel>, 't'>) => {
  const t = useTranslations('frontend.component.carousel');
  return (
    <Carousel
      {...props}
      t={{
        label: t('label'),
        previous: t('previous'),
        next: t('next'),
        play: t('play'),
        pause: t('pause'),
        slide: (n, total) => t('slide', { n, total }),
        ...props.t,
      }}
    />
  );
};

export { CarouselContainer };
