import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import placeholderWebp from '@/placeholders/placeholder.webp';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { ImageBlock1 as ImageBlock1Component } from './image-block-1';

type Args = ComponentProps<typeof ImageBlock1Component>;

const meta: Meta<Args> = {
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
      src: placeholderWebp.src, // TODO: Fix image loader for storybook
      alt: DEFAULT_VALUE,
      width: placeholderWebp.width,
      height: placeholderWebp.height,
    },
    heading: DEFAULT_VALUE,
    subheading: DEFAULT_VALUE,
    buttons: [
      { label: DEFAULT_VALUE, href: '/path-1', variant: 'primary' },
      { label: DEFAULT_VALUE, href: '/path-2', variant: 'secondary' },
    ],
  },
};

const Render = ({ image, heading, subheading, buttons, ...args }: Args) => {
  const t = useTranslations('fields');
  const tButton = useTranslations('storybook.basic.button');
  const props = {
    ...args,
    image: { ...image, alt: getFallback(image.alt, t('image')) },
    heading: getFallback(heading, t('heading')),
    subheading: getFallback(subheading, t('subheading')),
    buttons: buttons?.map((it, index) => ({
      ...it,
      label: getFallback(it.label, `${tButton('default')} ${index + 1}`),
    })),
  };

  return (
    <div className="grid gap-16">
      <ImageBlock1Component {...props} />
      <ImageBlock1Component {...props} isReversed />
    </div>
  );
};

const ImageBlock1: StoryObj<typeof ImageBlock1Component> = { render: Render };

export { ImageBlock1 };
export default meta;
