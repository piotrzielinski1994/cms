import Form from '@/components/basic/form/root/form';
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import { TextInput } from './text-input';

type Args = ComponentProps<typeof TextInput> & {
  label?: string;
};

const ControlledInput = (props: Args) => {
  const [value, setValue] = useState('');
  return <TextInput {...props} onChange={(e) => setValue(e.currentTarget.value)} value={value} />;
};

const meta: Meta<ComponentProps<typeof ControlledInput>> = {
  component: ControlledInput,
  title: 'Components/TextInput',
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
  },
  args: {
    label: 'Text Input',
  },
};

export const Default: StoryObj<typeof TextInput> = {
  render: ({ label, ...args }: Args) => (
    <>
      <Form.Group>
        <Form.Label htmlFor="input1">{label}</Form.Label>
        <ControlledInput {...args} id="input1" name="input1" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="input2">Invalid Input</Form.Label>
        <TextInput
          {...args}
          id="input2"
          name="input2"
          value="Invalid value"
          error="Error message"
        />
      </Form.Group>
    </>
  ),
};

export default meta;
