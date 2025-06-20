import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Hero1 as Hero1Component } from './hero-1';

type Args = ComponentProps<typeof Hero1Component>;

const meta: Meta<Args> = {
  component: Hero1Component,
  title: 'Components/Sections/Hero1',
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    buttons: { control: 'object' },
  },
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    buttons: [
      { label: 'Button 1', href: '/path-1', variant: 'primary' },
      { label: 'Button 2', href: '/path-2', variant: 'secondary' },
    ],
  },
};

const Render = (args: Args) => {
  return <Hero1Component {...args} />;
};

const Hero1: StoryObj<typeof Hero1Component> = { render: Render };

export { Hero1 };
export default meta;
