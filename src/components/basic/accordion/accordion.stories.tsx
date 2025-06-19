import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Accordion as AccordionComponent } from './accordion';

type Args = ComponentProps<typeof AccordionComponent>;

const meta: Meta<Args> = {
  component: AccordionComponent,
  title: 'Components/Basic/Accordion',
  argTypes: {
    items: { control: 'object' },
    activeItemIndex: { control: 'number' },
  },
  args: {
    items: [
      { heading: 'Heading 1', content: 'Content 1' },
      { heading: 'Heading 2', content: 'Content 2' },
      { heading: 'Heading 3', content: 'Content 3' },
    ],
    activeItemIndex: 0,
  },
};

const Render = (args: Args) => {
  return <AccordionComponent {...args} />;
};

const Accordion: StoryObj<typeof AccordionComponent> = { render: Render };

export { Accordion };
export default meta;
