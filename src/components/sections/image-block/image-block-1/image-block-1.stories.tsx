import { DEFAULT_VALUE, getFallback, THUMBNAIL_ID } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { ImageBlock1 as ImageBlock1Component } from './image-block-1';

type Args = ComponentProps<typeof ImageBlock1Component>;

const meta = {
  component: ImageBlock1Component,
  title: 'Components/Sections/ImageBlock/ImageBlock1',
  argTypes: {
    isReversed: { control: 'boolean' },
    image: { control: 'object' },
    heading: { control: 'text' },
    subheading: { control: 'text' },
    buttons: { control: 'object' },
  },
  args: {
    isReversed: false,
    image: {
      src: '', // TODO: Fix image loader for storybook
      alt: DEFAULT_VALUE,
      width: undefined,
      height: undefined,
    },
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
    buttons: [
      { label: DEFAULT_VALUE, href: '/path-1', variant: 'primary' },
      { label: DEFAULT_VALUE, href: '/path-2', variant: 'secondary' },
    ],
  },
} satisfies Meta<Args>;

const Render = ({ image, heading, subheading, buttons, ...args }: Args) => {
  const t2 = useTranslations('fields');
  const tButton = useTranslations('storybook.basic.button');

  return (
    <ImageBlock1Component
      {...args}
      id={THUMBNAIL_ID}
      image={{ ...image, alt: getFallback(image.alt, t2('image')) }}
      heading={getFallback(heading, t2('heading'))}
      subheading={getFallback(subheading, t2('subheading'))}
      buttons={buttons?.map((it, index) => ({
        ...it,
        label: getFallback(it.label, `${tButton('default')} ${index + 1}`),
      }))}
    />
  );
};

const ImageBlock1: StoryObj<typeof ImageBlock1Component> = { render: Render };

export { ImageBlock1 };
export default meta;
