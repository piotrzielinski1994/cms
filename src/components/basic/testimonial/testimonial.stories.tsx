import { StoryContext } from '@/config/storybook/components';
import { DEFAULT_VALUE, getFallback, imagesPerColorPref } from '@/config/storybook/utils';
import { getThemeConfig } from '@/config/themes.config';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Testimonial as TestimonialComponent } from './testimonial';

type Args = ComponentProps<typeof TestimonialComponent>;

const meta = {
  component: TestimonialComponent,
  title: 'Components/Basic/Testimonial',
  argTypes: {
    image: { control: 'text' },
    quote: { control: 'text' },
    name: { control: 'text' },
    annotation: { control: 'text' },
  },
  args: {
    image: DEFAULT_VALUE,
    quote: DEFAULT_VALUE,
    name: DEFAULT_VALUE,
    annotation: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = ({ image, quote, name, annotation }: Args, context) => {
  const t = useTranslations('storybook.basic.testimonial');
  const { theme } = context.globals as StoryContext['globals'];
  const colorPref = getThemeConfig(theme).colorPreference;
  const themedImage = imagesPerColorPref[colorPref === 'dark' ? 'light' : 'dark'];
  const props = {
    image: getFallback(image, themedImage.src),
    quote: getFallback(quote, t('quote')),
    name: getFallback(name, t('name')),
    annotation: getFallback(annotation, t('annotation')),
  } satisfies Args;

  return <TestimonialComponent {...props} />;
};

const Testimonial: StoryObj<typeof TestimonialComponent> = { render: Render };

export { Testimonial };
export default meta;
