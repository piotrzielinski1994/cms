import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import DialogComponent from './dialog';

const paragraphs = Array.from({ length: 5 }, (_, i) => i).map((i) => {
  return (
    <p key={i}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum dapibus ultricies.
      Donec eget ligula consequat, vulputate justo vel, vestibulum ligula. Fusce nec erat ac turpis
      vulputate mollis. Nulla auctor volutpat velit. Integer id lacus at nisl volutpat varius id ac
      massa.
    </p>
  );
});

type Args = ComponentProps<typeof DialogComponent.Root> & {
  label?: string;
};

const meta: Meta<Args> = {
  component: DialogComponent.Root,
  title: 'Components/Basic/Dialog',
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Dialog',
  },
};

const Render = ({ label, ...args }: Args) => {
  return (
    <>
      {paragraphs}
      <DialogComponent.Root {...args}>{label}</DialogComponent.Root>
    </>
  );
};

const Dialog: StoryObj<typeof DialogComponent.Root> = { render: Render };

export { Dialog };
export default meta;
