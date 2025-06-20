import placeholderWebp from '@/placeholders/placeholder.webp';
import type { Meta, StoryObj } from '@storybook/react';
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
      src: placeholderWebp.src,
      alt: 'Light',
      width: placeholderWebp.width,
      height: placeholderWebp.height,
    },
    heading: 'Heading',
    subheading: 'Subheading',
    buttons: [
      { label: 'Button 1', href: '/path-1', variant: 'primary' },
      { label: 'Button 2', href: '/path-2', variant: 'secondary' },
    ],
  },
};

const Render = (args: Args) => {
  return (
    <div className="grid gap-4">
      <ImageBlock1Component {...args} />
      <ImageBlock1Component {...args} isReversed />
    </div>
  );
};

const ImageBlock1: StoryObj<typeof ImageBlock1Component> = { render: Render };

export { ImageBlock1 };
export default meta;
