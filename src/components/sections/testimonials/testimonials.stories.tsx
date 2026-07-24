import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { getThemeConfig } from '@/config/store/themes.config';
import type { StoryContext } from '@/config/storybook/components';
import {
  DEFAULT_VALUE,
  getFallback,
  imagesPerColorPref,
  THUMBNAIL_ID,
} from '@/config/storybook/utils';
import { Testimonials as TestimonialsComponent } from './testimonials';

type Args = ComponentProps<typeof TestimonialsComponent>;

const meta: Meta<Args> = {
  component: TestimonialsComponent,
  title: 'Sections/Testimonials',
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    items: { table: { disable: true } },
  },
  args: {
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
    items: [
      {
        image: DEFAULT_VALUE,
        quote: DEFAULT_VALUE,
        name: DEFAULT_VALUE,
        annotation: DEFAULT_VALUE,
      },
      {
        image: DEFAULT_VALUE,
        quote: DEFAULT_VALUE,
        name: DEFAULT_VALUE,
        annotation: DEFAULT_VALUE,
      },
      {
        image: DEFAULT_VALUE,
        quote: DEFAULT_VALUE,
        name: DEFAULT_VALUE,
        annotation: DEFAULT_VALUE,
      },
    ],
  },
};

const Render = ({ heading, subheading, items = [] }: Args, context) => {
  const t = useTranslations('fields');
  const tTestimonial = useTranslations('storybook.advanced.testimonial');
  const { theme } = context.globals as StoryContext['globals'];
  const colorPref = getThemeConfig(theme).colorPreference;
  const themedImage = imagesPerColorPref[colorPref === 'dark' ? 'light' : 'dark'];

  return (
    <TestimonialsComponent
      id={THUMBNAIL_ID}
      heading={getFallback(heading, t('heading'))}
      subheading={getFallback(subheading, t('subheading'))}
      items={items.map((item) => ({
        image: getFallback(item.image, themedImage.src),
        quote: getFallback(item.quote, tTestimonial('quote')),
        name: getFallback(item.name, tTestimonial('name')),
        annotation: getFallback(item.annotation, tTestimonial('annotation')),
      }))}
    />
  );
};

const Testimonials: StoryObj<typeof TestimonialsComponent> = { render: Render };

export { Testimonials };
export default meta;
