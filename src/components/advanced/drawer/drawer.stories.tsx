import { Button } from '@/components/basic/button/button';
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import { Drawer as DrawerComponent } from './drawer';

type Args = ComponentProps<typeof DrawerComponent>;

const meta = {
  component: DrawerComponent,
  title: 'Advanced/Drawer',
  argTypes: {},
  args: {},
} satisfies Meta<Args>;

const Render = ({ ...args }: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-1">
      <Button onClick={() => setIsOpen((prev) => !prev)}>Open</Button>
      <DrawerComponent {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        @@@
      </DrawerComponent>
    </div>
  );
};

const Drawer: StoryObj<typeof DrawerComponent> = { render: Render };

export { Drawer };
export default meta;
