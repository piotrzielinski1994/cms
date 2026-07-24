import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { Carousel as CarouselComponent } from './carousel';

type Args = {
  autoPlay: boolean;
  autoPlayInterval: number;
  slideCount: number;
};

const meta = {
  title: 'Advanced/Carousel',
  argTypes: {
    autoPlay: { control: 'boolean' },
    autoPlayInterval: { control: 'number' },
    slideCount: { control: { type: 'number', min: 1, max: 8 } },
  },
  args: {
    autoPlay: true,
    autoPlayInterval: 5000,
    slideCount: 4,
  },
} satisfies Meta<Args>;

const Render = ({ autoPlay = true, autoPlayInterval = 5000, slideCount = 4 }: Partial<Args>) => {
  const t = useTranslations('frontend.component.carousel');
  const labels = useTranslations('storybook.advanced.carousel');

  const slides = Array.from({ length: slideCount }, (_, index) => (
    <div key={index} className="grid min-h-40 place-items-center bg-background1 p-8">
      <span className="text-lg">{labels('heading', { index: index + 1 })}</span>
      <p>{labels('body', { index: index + 1 })}</p>
    </div>
  ));

  return (
    <div className="max-w-xl">
      <CarouselComponent
        slides={slides}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        t={{
          label: t('label'),
          previous: t('previous'),
          next: t('next'),
          play: t('play'),
          pause: t('pause'),
          slide: (n, total) => t('slide', { n, total }),
        }}
      />
    </div>
  );
};

const Carousel: StoryObj<Args> = { render: Render };

export { Carousel };
export default meta;
