import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Header as HeaderComponent } from './header';

type Args = ComponentProps<typeof HeaderComponent> & {
  label?: string;
};

const meta: Meta<Args> = {
  component: HeaderComponent,
  title: 'Layout/Header',
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
  return <HeaderComponent {...args} />;
};

const Header: StoryObj<typeof HeaderComponent> = { render: Render };

export { Header };
export default meta;
