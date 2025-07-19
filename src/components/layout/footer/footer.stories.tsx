import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Footer as FooterComponent } from './footer';

type Args = ComponentProps<typeof FooterComponent> & {
  label?: string;
};

const meta: Meta<Args> = {
  component: FooterComponent,
  title: 'Layout/Footer',
  argTypes: {
    items: { control: 'object' },
  },
  args: {
    items: [
      { id: 'nav-item-1', label: 'Link 1', href: '/' },
      { id: 'nav-item-2', label: 'Link 2', href: '/' },
      { id: 'nav-item-3', label: 'Link 3', href: '/' },
    ],
  },
};

const Render = (args: Args) => {
  return <FooterComponent {...args} />;
};

const Footer: StoryObj<typeof FooterComponent> = { render: Render };

export { Footer };
export default meta;
